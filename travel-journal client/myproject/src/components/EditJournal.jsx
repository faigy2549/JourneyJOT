import React, { useState, useRef } from 'react';
import { updateJournalEntry, uploadPhoto } from '../Services/JournalEntryService';
import { Button } from 'primereact/button';
import { Editor } from "primereact/editor";
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Galleria } from 'primereact/galleria';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import '../style sheets/TripsView.css';
import { convertDateToDMY } from '../utils';

const EditJournal = ({ selectedEntry, trip, text, setText, rating, setRating, uploadedPhotos, setUploadedPhotos }) => {
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    const onUpload = async (event) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('JournalEntryId', selectedEntry.id);
        for (let file of event.files) {
            formData.append('files', file);
        }
        try {
            const photos = await uploadPhoto(selectedEntry.id, formData);
            const uploaded = photos.map((photo, index) => ({
                url: event.files[index].name,
                journalEntryId: selectedEntry.id,
            }));
            setUploadedPhotos([...uploadedPhotos, ...uploaded]);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Photos uploaded successfully!' });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error uploading photos!' });
        } finally {
            setLoading(false);
        }
    };

    const saveJournalEntry = () => {
        setLoading(true);
        const journalEntryDTO = {
            id: selectedEntry.id,
            text,
            date: selectedEntry.date,
            location: selectedEntry.location,
            tripId: selectedEntry.tripId,
            rating,
            photos: uploadedPhotos.map(photo => ({
                url: photo.url,
                journalEntryId: selectedEntry.id,
            })),
        };
        updateJournalEntry(selectedEntry.id, JSON.stringify(journalEntryDTO))
            .then(() => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Journal entry updated successfully!' });
            })
            .catch((error) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating journal entry!' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const header = (
        <img alt="Card" style={{ height: "10rem" }} src={`https://localhost:44393/${trip?.coverPhotoUrl}`} />
    );

    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" onClick={saveJournalEntry} />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    const itemTemplate = (item) => {
        return (
            <img src={`https://localhost:44393/photos/${item.url}`} alt={item.name} style={{ width: '400px', height: '300px', display: 'block' }} />
        );
    };

    return (
        <div className="card flex justify-content-center">
            <Card
                title={<div className="flex align-items-center gap-2">
                    <i className="pi pi-calendar"></i>
                    <span className="font-semibold">{convertDateToDMY(selectedEntry.date)}</span>
                </div>}
                subTitle={trip.title}
                footer={footer}
                header={header}
                style={{ width: "80rem" }}>
                {loading && <ProgressSpinner />}
                <Editor value={text} header={renderHeader} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '100px' }} />
                <p>How would you rate your day?</p>
                <Rating value={rating} cancel={false} onChange={(e) => setRating(e.value)} />
                <p><i className="pi pi-map-marker" /> Location: {selectedEntry.location}</p>
                <p><i className="pi pi-images" /> Photos:</p>
                <div className="uploaded-photos">
                    <Galleria
                        value={uploadedPhotos}
                        numVisible={5}
                        style={{ maxWidth: "80rem" }}
                        item={itemTemplate}
                        showItemNavigatorsOnHover
                        circular
                        autoPlay
                        transitionInterval={2000}
                    />
                </div>
                <FileUpload
                    name="files"
                    url=""
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    auto={false}
                    customUpload
                    uploadHandler={onUpload}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                />
            </Card>
            <Toast ref={toast} position='center'/>
        </div>
    );
};

export default EditJournal;
