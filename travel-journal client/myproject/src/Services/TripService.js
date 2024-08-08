
  export const fetchEntries = async () => {
  try {
    const response = await fetch('https://localhost:44393/api/Trip', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};

export const fetchTripById = async (tripId) => {
  try {
    const response = await fetch('https://localhost:44393/api/Trip/'+tripId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};

export const getTripsByUser = async (userId) => {
  try {
    const response = await fetch('https://localhost:44393/api/Trip/userId/'+userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};

export const updateTrip = async (trip) => {
  var raw = JSON.stringify({
    "id":trip.id,
    "title": trip.title,
    "description":trip.description,
    "startDate": trip.startDate,
    "endDate": trip.endDate,
    "coverPhotoUrl": trip.coverPhotoUrl,
    "rating": trip.rating,
    "starred": trip.starred,
    "userId": trip.userId,
    "journalEntries":trip.journalEntries
  });
  try {
    const response = await fetch('https://localhost:44393/api/Trip/'+trip.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', 
      body:raw
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};

export const createTrip = async (trip) => {
  try {
    const response = await fetch('https://localhost:44393/api/Trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', 
      body:trip
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.ok;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};