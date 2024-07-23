
import React, { useEffect, useState } from 'react';
import { createJournalEntry, fetchJournalEntrysByTripId, updateJournalEntry } from '../Services/JournalEntryService';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Editor } from "primereact/editor";
import {Card} from 'primereact/card'
import { FileUpload } from 'primereact/fileupload';
import {Rating} from 'primereact/rating'
import './style sheets/TripsView.css'
import { useNavigate,useParams } from 'react-router-dom';
import { fetchTripById } from '../Services/TripService';
import moment from 'moment';

const JournalView = () => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [visible, setVisible] = useState(true);
    const [text, setText] = useState(selectedEntry?.text);
    const [rating, setRating] = useState(selectedEntry?.rating);
    const navigate=useNavigate()
    const { tripId } = useParams();
    let index=1;

    useEffect(() => {
        fetchJournalEntrysByTripId(tripId)
        .then((data) => {
          const sortedEntries = data.sort((a, b) => new Date(a.date));
          setJournalEntries(sortedEntries);
        })
        .catch((error) => {
          console.error('Error fetching entries:', error);
          setError(error);
          setLoading(false);
        });
        fetchTripById(tripId)
        .then((data) => {
          setTrip(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching entries:', error);
          setError(error);
          setLoading(false);
        });
    }, []);

    const saveJournalEntry = () => {
      const updatedEntry = { ...selectedEntry,text };
      const journalEntryDTO = {
        id: updatedEntry.id,
        text: updatedEntry.text,
        date: updatedEntry.date,
        location: updatedEntry.location,
        tripId: updatedEntry.tripId,
        photos: updatedEntry.photos.map((photo) => ({
          Id: photo.id,
          Url: photo.url,
          JournalEntryId: photo.id,
        })),
      };
      
  updateJournalEntry(selectedEntry.id, JSON.stringify(journalEntryDTO));
    }

    const addEntry=()=>{
      const date = new Date();
      const formattedDate = moment(date).utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      let entry={
        text: "string",
        date:formattedDate,
        location: "string",
        tripId: trip.id,
        photos: [

        ]
      }
      var response=createJournalEntry(JSON.stringify(entry))
       setResponse(response)
      //setselected entry here so that it opens for editing
  }
    const entryTemplate = (entry) => {
        return (
          <div className="col-12 sm:col-6 lg:col-12  p-2 " key={entry.id} style={{ backgroundColor:"#ADD8E6"}}>
            <div className="p-4 border-1 surface-border surface-card border-round" style={{ maxWidth: '100rem',  maxHeight: '25rem' }}>
              <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <div className="flex align-items-center gap-2">
                  <i className="pi pi-calendar"></i>
                  <span className="font-semibold">{new Date(entry.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex flex-column align-items-center gap-3 py-5">
                <div className="text-2xl font-bold">Day {index++}</div>
              </div>
              <div className="flex align-items-center justify-content-center">
                  <Button
                    icon="pi pi-pencil "
                    className="p-button-rounded"
                    onClick={() =>{
                      setSelectedEntry(entry);
                      setVisible(false)
                      setText(entry.text)
                      }}
                  >
                  </Button>
              </div>
            </div>
          </div>
        );
      };
      const header = (
        <img alt="Card" style={{height:"10rem"}}src={`https://localhost:44393/${trip?.coverPhotoUrl}`} />
    );
      const footer = (
        <>
            <Button label="Save" icon="pi pi-check" onClick={saveJournalEntry}/>
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

  return (
<> 
    <div className="card flex justify-content-center">
    <Button icon="pi pi-angle-right"  onClick={() => setVisible(true)} />
    <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h2>{trip?.title}         <Button icon="pi pi-plus"  text raised size="small" onClick={addEntry}></Button></h2>
        <br></br>
        <DataView 
        value={journalEntries} 
        itemTemplate={entryTemplate} 
        layout={'grid'} 
        cols={1} 
        className="dataView"
        />
    </Sidebar>
    {selectedEntry &&    
    <div className="card flex justify-content-center">
        <Card 
        title={<div className="flex align-items-center gap-2">
                <i className="pi pi-calendar"></i>
                <span className="font-semibold">{new Date(selectedEntry.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>} 
        subTitle={trip.title} 
        footer={footer} 
        header={header}  
        style={{width:"80rem"}}>
            <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '100px' }}/>
            <p> How would you rate your day?</p>
            <Rating value={rating} cancel={false} onChange={(e) => setRating(e.value)}></Rating>
            <p><i className="pi pi-map-marker" /> Location: {selectedEntry.location}</p>
            <p><i className="pi pi-sun" /> Weather: {selectedEntry.weather}</p>
            <p><i className="pi pi-images" /> Photos:</p>
            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />

        </Card>
    </div>}
 </div>
</>
  );
};

export default JournalView;