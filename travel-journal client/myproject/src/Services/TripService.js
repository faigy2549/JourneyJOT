
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