import React, { useEffect, useState } from 'react';
import { createJournalEntry, fetchJournalEntrysByTripId, updateJournalEntry, uploadPhoto } from '../Services/JournalEntryService';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
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
    const navigate = useNavigate();

    useEffect(() => {
        fetchJournalEntrysByTripId(tripId)
            .then((data) => {
                const sortedEntries = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setJournalEntries(sortedEntries);
                if (sortedEntries.length > 0) {
                    const latestEntry = sortedEntries[sortedEntries.length - 1];
                    onEntrySelect(latestEntry);
                }
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
        setText(entry?.text || '');
        setRating(entry?.rating || 0);
        setUploadedPhotos(entry?.photos?.map(photo => ({
            id: photo.id,
            url: `${photo.url}`,
            name: photo.url
        })) || []);
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
    };

    const entryTemplate = (entry) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12  p-2 " key={entry.id} style={{ backgroundColor: "#ADD8E6" }}>
                <div className="p-4 border-1 surface-border surface-card border-round" style={{ maxWidth: '100rem', maxHeight: '25rem' }}>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-calendar"></i>
                            <span className="font-semibold">{convertDateToenUS(entry.date)}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">Day {}</div>
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
        );
    };

    return (
        <>
            <div className="content flex">
                <div className="carousel-container" style={{ flex: '25%' }}>
                     <Button icon="pi pi-arrow-left" onClick={() => navigate('/tripsView')}>Back To Trips</Button>
                {getCardClassName(trip?.startDate, trip?.endDate) === "happening now" && (
                        <Button text raised size="small" onClick={addEntry}>Add Entry</Button>
                    )}
                    <Carousel 
                        value={journalEntries}
                        itemTemplate={entryTemplate}
                        numVisible={3}
                        numScroll={1}
                        orientation="vertical" 
                        verticalViewPortHeight="100%"
                        className="custom-carousel"
                    />
                </div>
                <div className="card-container" style={{ flex: '75%' }}>
                    {selectedEntry && getCardClassName(trip?.startDate, trip?.endDate) === "happening now" ? (
                        <EditJournal 
                            selectedEntry={selectedEntry}
                            trip={trip}
                            text={text}
                            setText={setText}
                            rating={rating}
                            setRating={setRating}
                            uploadedPhotos={uploadedPhotos}
                            setUploadedPhotos={setUploadedPhotos}
                        />
                    ) : selectedEntry && getCardClassName(trip?.startDate, trip?.endDate) === "past-trip" ? (
                        <ViewJournal 
                            selectedEntry={selectedEntry}
                            trip={trip}
                            text={text}
                            rating={rating}
                            uploadedPhotos={uploadedPhotos}
                        />
                    ) : (
                        <h1>No Entry Selected</h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default JournalView;
