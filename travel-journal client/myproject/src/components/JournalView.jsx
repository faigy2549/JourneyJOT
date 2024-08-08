import React, { useEffect, useRef, useState } from 'react';
import { createJournalEntry, fetchJournalEntrysByTripId, updateJournalEntry, uploadPhoto } from '../Services/JournalEntryService';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import '../style sheets/TripsView.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTripById } from '../Services/TripService';
import moment from 'moment';
import { convertDateToDMY, convertDateToenUS, getCardClassName } from '../utils';
import EditJournal from './EditJournal';
import ViewJournal from './ViewJournal';


const JournalView = () => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [visible, setVisible] = useState(true);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const { tripId } = useParams();
    const navigate=useNavigate()
    let index = 1;


    useEffect(() => {
        fetchJournalEntrysByTripId(tripId)
            .then((data) => {
                const sortedEntries = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setJournalEntries(sortedEntries);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
        fetchTripById(tripId)
            .then((data) => {
                setTrip(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [tripId]);



    const onEntrySelect = (entry) => {
        setSelectedEntry(entry);
        setText(entry.text);
        setRating(entry.rating);
        setUploadedPhotos(entry.photos.map(photo => ({
            id: photo.id,
            url: `${photo.url}`,
            name: photo.url
        })));
        setVisible(false);
    };



    const addEntry = () => {
        const date = new Date();
        const formattedDate = moment(date).utc().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        let entry = {
            text: "string",
            date: formattedDate,
            location: "string",
            tripId: trip.id,
            photos: []
        };
        var response = createJournalEntry(JSON.stringify(entry));
        setResponse(response);
        // set selected entry here so that it opens for editing
    };


    const entryTemplate = (entry) => {
        return (
            <div>
                <div className="col-12 sm:col-6 lg:col-12  p-2 " key={entry.id} style={{ backgroundColor: "#ADD8E6" }}>
                    <div className="p-4 border-1 surface-border surface-card border-round" style={{ maxWidth: '100rem', maxHeight: '25rem' }}>
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-calendar"></i>
                                <span className="font-semibold">{convertDateToenUS(entry.date)}</span>
                            </div>
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <div className="text-2xl font-bold">Day {index++}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center">
                            <Button
                                icon="pi pi-pencil "
                                className="p-button-rounded"
                                onClick={() => onEntrySelect(entry)}
                            >
                            </Button>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        );
    };


  // const responsiveOptions = [
  //     {
  //         breakpoint: '991px',
  //         numVisible: 4
  //     },
  //     {
  //         breakpoint: '767px',
  //         numVisible: 3
  //     },
  //     {
  //         breakpoint: '575px',
  //         numVisible: 1
  //     }
  // ];


    return (
        <>
            <Button icon="pi pi-angle-right" onClick={() => setVisible(true)} />
            <Button icon="pi pi-arrow-left" onClick={() => navigate('/tripsView')}>Back To Trips</Button>
            <div className="card flex justify-content-center">
                <Sidebar visible={visible} onHide={() => setVisible(false)} className='sideBar'>
                    <h2>{trip?.title}</h2>
                    <h3>{convertDateToDMY(trip?.startDate)} - {convertDateToDMY(trip?.endDate)}</h3>
                    <h5>{trip?.description}</h5>
                   {getCardClassName(trip?.startDate,trip?.endDate)==="happening now" &&<Button text raised size="small" onClick={addEntry} >Add Entry</Button>}
                    <br></br>
                    <br></br>
                    <DataView
                        value={journalEntries}
                        itemTemplate={entryTemplate}
                        layout={'grid'}
                        cols={1}
                        className="dataView"
                    />
                </Sidebar>
                {selectedEntry && getCardClassName(trip.startDate,trip.endDate)==="happening now"?(
                  <EditJournal 
                  selectedEntry={selectedEntry}
                  trip={trip}
                  text={text}
                  setText={setText}
                  rating={rating}
                  setRating={setRating}
                  uploadedPhotos={uploadedPhotos}
                  setUploadedPhotos={setUploadedPhotos}>
                  </EditJournal>)
                  : selectedEntry && getCardClassName(trip.startDate,trip.endDate)==="past-trip"?(
                    <ViewJournal 
                  selectedEntry={selectedEntry}
                  trip={trip}
                  text={text}
                  rating={rating}
                  uploadedPhotos={uploadedPhotos}
                  />
                  ):(
                    <h1>404</h1>
                  )}
            </div>
        </>
    );
};

export default JournalView;
