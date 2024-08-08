import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar'; 
import { createTrip } from '../Services/TripService'; 
import { useSelector } from 'react-redux';

const AddTripDialog = ({ isTripDialogVisible, handleDialogHide }) => { 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [coverPhotoUrl, setCoverPhotoUrl] = useState('');
    const user = useSelector((state) => state.user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const tripData = {
            title:title,
            description:description,
            startDate:startDate,
            endDate:endDate,
            coverPhotoUrl:coverPhotoUrl,
            userId:user.id,
            rating:0,
            starred:false,
            journalEntries: []
        };
        
        try {
            await createTrip(JSON.stringify(tripData));
            handleDialogHide(); 
        } catch (error) {
        }
    };

    return (
        <Dialog header="Add Trip" visible={isTripDialogVisible} onHide={handleDialogHide} style={{ width: '50vw' }}>
            <form onSubmit={handleSubmit}>
                <div className="p-field p-grid">
                    <label htmlFor="title" className="p-col-fixed p-text-label">Title:</label>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-pen"></i>
                        </span>
                        <InputText type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                </div>
                <br />
                <div className="p-field p-grid">
                    <label htmlFor="description" className="p-col-fixed p-text-label">Description:</label>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-pencil"></i>
                        </span>
                        <InputText type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                </div>
                <br />
                <div className="p-field p-grid">
                    <label htmlFor="startDate" className="p-col-fixed p-text-label">Start Date:</label>
                    <div className="p-col">
                        <Calendar id="startDate" value={startDate} onChange={(e) => setStartDate(e.value)} required />
                    </div>
                </div>
                <br />
                <div className="p-field p-grid">
                    <label htmlFor="endDate" className="p-col-fixed p-text-label">End Date:</label>
                    <div className="p-col">
                        <Calendar id="endDate" value={endDate} onChange={(e) => setEndDate(e.value)} required />
                    </div>
                </div>
                <br />
                <div className="p-field p-grid">
                    <label htmlFor="coverPhotoUrl" className="p-col-fixed p-text-label">Cover Photo:</label>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-image"></i>
                        </span>
                        <InputText type="text" id="coverPhotoUrl" value={coverPhotoUrl} onChange={(e) => setCoverPhotoUrl(e.target.value)} required />
                    </div>
                </div>
                <br />
                <Button type="submit" label="Add Trip" className="p-col-offset-4 p-col-4" style={{ width: '250px' }} />
            </form>
         
        </Dialog>
    );
};

export { AddTripDialog };