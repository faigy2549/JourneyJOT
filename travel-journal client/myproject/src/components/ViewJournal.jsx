
import React, {  } from 'react';
import { updateJournalEntry, uploadPhoto } from '../Services/JournalEntryService';
import { Button } from 'primereact/button';
import { Editor } from "primereact/editor";
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Galleria } from 'primereact/galleria';
import '../style sheets/TripsView.css';
import { convertDateToDMY } from '../utils';

const ViewJournal = ({selectedEntry,trip,text,rating,uploadedPhotos}) => {


const header = (
    <img alt="Card" style={{ height: "10rem" }} src={`https://localhost:44393/${trip?.coverPhotoUrl}`} />
);

const itemTemplate = (item) => {
  return (
      <img src={`https://localhost:44393/photos/${item.url}`} alt={item.name} style={{ width: '400px', height: '300px', display: 'block' }} />
  );
};

const thumbnailTemplate = (item) => {
  return (
      <img src={`https://localhost:44393/photos/${item.url}`} alt={item.name} style={{width: '100px', height: '100px', display: 'block' }} />
  );
};



return(
    <div className="card flex justify-content-center">
    <Card
        title={<div className="flex align-items-center gap-2">
            <i className="pi pi-calendar"></i>
            <span className="font-semibold">{convertDateToDMY(selectedEntry.date)}</span>
        </div>}
        subTitle={trip.title}
        header={header}
        style={{ width: "80rem" }}>
  <h1>{text}</h1>
        <p> How would you rate your day?</p>
        <Rating value={rating} cancel={false}></Rating>
        <p><i className="pi pi-map-marker" /> Location: {selectedEntry.location}</p>
        <p><i className="pi pi-images" /> Photos:</p>
        <div className="uploaded-photos">
            <Galleria 
                value={uploadedPhotos}
                //responsiveOptions={responsiveOptions}
                numVisible={5}
                style={{ maxWidth:"80rem" }}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
                circular 
                autoPlay 
                transitionInterval={2000}
            />
        </div>
    </Card>
</div>
)
};
export default ViewJournal;