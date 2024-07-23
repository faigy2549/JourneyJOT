
import React, { useEffect, useState } from 'react';
import { fetchEntries } from '../Services/TripService';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import {Rating} from 'primereact/rating'
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import './style sheets/TripsView.css'
import { useNavigate } from 'react-router-dom';
import { getCardClassName } from '../utils';

const TripsView = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');
  const sortOptions = [
      { label: 'Recent Trips', value: '!startDate' },
      { label: 'Oldest Trips', value: 'startDate' }
  ];
const navigate=useNavigate()
  useEffect(() => {
    fetchEntries()
      .then((data) => {
        const sortedEntries = data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setEntries(sortedEntries);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching entries:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredEntries = entries.filter((entry) =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setEntries(filteredEntries);
    } 
  }, [searchQuery,entries]);

  useEffect(() => {
    if(selectedEntry!==null){
    const tripId = selectedEntry.id; 
    navigate(`/journalView/${tripId}`); 
    }
  }, [selectedEntry,navigate]);


  const onSortChange = (event) => {
    const value = event.value;
    if (value.indexOf('!') === 0) {
        setSortOrder(-1);
        setSortField(value.substring(1, value.length));
        setSortKey(value);
    } else {
        setSortOrder(1);
        setSortField(value);
        setSortKey(value);
    }
};

const getSeverityByStatus =(tripStatus)=>{
  return tripStatus==='future-trip'? "success" 
  :tripStatus==='happening now'? "info" 
  :tripStatus==='past-trip'?"warning" 
  : "danger" ;
}

  const header = () => {
    return <div className="header">
    <IconField iconPosition="left"className="search-input">
      <InputIcon className="pi pi-search" />
      <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Trips"  />
    </IconField>
    <Dropdown 
      options={sortOptions} 
      value={sortKey} 
      optionLabel="label" 
      placeholder="Sort By Date" 
      onChange={onSortChange} 
      className="sort-dropdown"
    />
  </div>
};

  const tripTemplate = (trip) => {
    const tripStatus = getCardClassName(trip.startDate, trip.endDate);
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 " key={trip.id} style={{ backgroundColor:"#ADD8E6"}}>
        <div className="p-4 border-1 surface-border surface-card border-round" style={{ maxWidth: '30rem',  maxHeight: '25rem' }}>
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-calendar"></i>
              <span className="font-semibold">{new Date(trip.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            {trip.starred &&<Tag severity="primary">
            <div className="flex align-items-center gap-2">
            <i className="pi pi-star text-xs"></i>
                <span className="text-base">Starred</span>
            </div>
             </Tag>}
            <Tag value={trip.status} severity={getSeverityByStatus(tripStatus)}>{tripStatus==='future-trip'? "Future Trip" :tripStatus==='happening now'? "Trip Happening Now" :tripStatus==='past-trip'?"Past Trip" : ""}</Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
          <img
          className="w-full h-9 shadow-2 border-round"
          src={`https://localhost:44393/${trip.coverPhotoUrl}`}
          alt={trip.title}
          style={{ maxHeight: '150px', objectFit: 'cover' }}
        />
            <div className="text-2xl font-bold">{trip.title}</div>
            <Rating value={trip.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="flex align-items-center justify-content-center">
            {trip.status !== 'future-trip' && (
              <Button
                icon="pi pi-eye"
                className="p-button-rounded"
                onClick={() =>{
                  setSelectedEntry(trip);
                  }}
              >
                View Journal
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {entries.length > 0 && (
        <DataView 
        value={entries} 
        itemTemplate={tripTemplate} 
        layout={'grid'} 
        cols={4}  
        header={header()} 
        sortField={sortField} sortOrder={sortOrder}
        className="dataView"
        />
      )}
    </div>
  );
};

export default TripsView;