
import React, { useEffect, useState } from 'react';
import { getTripsByUser, updateTrip } from '../Services/TripService';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import {Rating} from 'primereact/rating'
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import '../style sheets/TripsView.css'
import { useNavigate } from 'react-router-dom';
import { getCardClassName } from '../utils';
import { AddTripDialog } from './AddTripDialog';
import { useSelector } from 'react-redux';

const TripsView = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');
  const [sortedEntries, setSortedEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isTripDialogVisible, setIsTripDialogVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const sortOptions = [
      { label: 'Sort By Recent Trips', value: '!startDate' },
      { label: 'Sort By Oldest Trips', value: 'startDate' },
      { label: 'Filter Starred Trips', value: 'starred' }
  ];
  const addNewTripItem = {
    id: 'add_new_trip', 
    title: 'Add New Trip',
    isAddNewTrip: true 
  };
  const navigate=useNavigate()

  useEffect(() => {
    if(selectedTrip!==null){
    const tripId = selectedTrip.id; 
    navigate(`/journalView/${tripId}`); 
    }
  }, [selectedTrip,navigate]);

  const handleDialogHide = () => {
    setIsTripDialogVisible(false);
  };
  const onSortChange = (event) => {
    const value = event.value;
    if (value === 'starred') {
        setFilteredEntries(entries.filter((entry) => entry.starred));
    } else {
    if (value.indexOf('!') === 0) {
       setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
       setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
    setSortedEntries(entries);
    setFilteredEntries(entries);
  }
};

const getSeverityByStatus =(tripStatus)=>{
  return tripStatus==='future-trip'? "success" 
  :tripStatus==='happening now'? "info" 
  :tripStatus==='past-trip'?"warning" 
  : "danger" ;
}

const updateTripStarred=(trip)=>{
  trip.starred=!trip.starred
  updateTrip(trip)
}
const createNewTrip = () =>{
setIsTripDialogVisible(true)
}

useEffect(() => {
  getTripsByUser(user.id)
    .then((data) => {
      setEntries(data);
      const sortedEntries = data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      setFilteredEntries([addNewTripItem, ...sortedEntries]);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
}, []);

useEffect(() => {
  if (searchQuery.length > 0) {
    const filteredEntries = entries.filter((entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEntries(filteredEntries);
  } else if (sortedEntries.length > 0) {
    setFilteredEntries(sortedEntries);
  } else {
    setFilteredEntries(entries);
  }
}, [searchQuery, sortedEntries]);

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
      placeholder="Filter and Sort" 
      onChange={onSortChange} 
      className="sort-dropdown"
    />
  </div>
};

const tripTemplate = (trip) => {
  if (trip.isAddNewTrip) {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={trip.id}>
      <div className="p-4 border-1 surface-border surface-card border-round" style={{ maxWidth: '30rem', maxHeight: '25rem' }}>
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="flex align-items-center gap-2">
            <i className="pi pi-calendar"></i>
            <span className="font-semibold">its up to you when to have a blast!</span>
          </div>
          <Rating value={0} stars={1} cancel={false} size="large" />
          <Tag value='new' severity="info">
          </Tag>
        </div>
        <div className="flex flex-column align-items-center gap-3 py-5">
          <img
            className="w-full h-9 shadow-2 border-round"
            src={`https://localhost:44393/assets/questionmark.png`}
            alt={trip.title}
            style={{ maxHeight: '150px', objectFit: 'cover' }}
          />
          <div className="text-2xl font-bold">{trip.title}</div>
          <Rating value={0} readOnly cancel={false} />
        </div>
        <div className="flex align-items-center justify-content-center">
            <Button
              icon="pi pi-plus"
              disabled={trip.status === 'future-trip'}
              className="p-button-rounded"
              onClick={() => {
                createNewTrip();
              }}
            >
            </Button>
        </div>
      </div>
    </div>
  );
  }

  const tripStatus = getCardClassName(trip.startDate, trip.endDate);
  return (
    <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={trip.id}>
      <div className="p-4 border-1 surface-border surface-card border-round" style={{ maxWidth: '30rem', maxHeight: '25rem' }}>
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="flex align-items-center gap-2">
            <i className="pi pi-calendar"></i>
            <span className="font-semibold">{new Date(trip.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <Rating value={trip.starred ? 1 : 0} stars={1} onChange={() => updateTripStarred(trip)} cancel={false} size="large" />
          <Tag value={trip.status} severity={getSeverityByStatus(tripStatus)}>
            {tripStatus === 'future-trip' ? "Future Trip" : tripStatus === 'happening now' ? "Trip Happening Now" : tripStatus === 'past-trip' ? "Past Trip" : ""}
          </Tag>
        </div>
        <div className="flex flex-column align-items-center gap-3 py-5">
          <img
            className="w-full h-9 shadow-2 border-round"
            src={`https://localhost:44393/photos/${trip.coverPhotoUrl}`}
            alt={trip.title}
            style={{ maxHeight: '150px', objectFit: 'cover' }}
          />
          <div className="text-2xl font-bold">{trip.title}</div>
          <Rating value={trip.rating} readOnly cancel={false} />
        </div>
        <div className="flex align-items-center justify-content-center">
          {tripStatus === 'future-trip' ? (
          <h3>Just  {Math.ceil((new Date(trip.startDate) - Date.now()) / (1000 * 60 * 60 * 24))} Days left until the FUN begins</h3>
          ):tripStatus === 'past-trip'? (
            <Button
            icon="pi pi-eye"
            value="View Journal"
            className="p-button-rounded"
            onClick={() => {
              setSelectedTrip(trip);
            } }
          >
          </Button>
          ):(
            <Button
            icon="pi pi-user-edit"
            className="p-button-rounded"
            onClick={() => {
              setSelectedTrip(trip);
            } }
          >
          </Button>
          )}
        </div>
      </div>
    </div>
  );
};


return (
  <>
  <AddTripDialog
        isTripDialogVisible={isTripDialogVisible}
        handleDialogHide={handleDialogHide}
      />
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',backgroundColor:'#ADD8E6' }}>
    {/* {filteredEntries.length > 0 && ( */}
      <DataView 
        value={filteredEntries} 
        itemTemplate={tripTemplate} 
        layout={'grid'} 
        cols={4}  
        header={header()} 
        sortField={sortField} 
        sortOrder={sortOrder}
        className="dataView"
      />
    {/* )} */}
  </div>
  </>
);
}
export default TripsView;