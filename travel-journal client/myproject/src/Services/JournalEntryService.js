
export const fetchJournalEntrysByTripId = async (tripId) => {
    try {
      const response = await fetch('https://localhost:44393/api/JournalEntry/tripId/'+tripId, {
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
  
export const updateJournalEntry = async (entryId,updatedEntry) => {
    try {
      const response = await fetch('https://localhost:44393/api/JournalEntry/'+entryId, 
        {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', 
        body:updatedEntry
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.ok;
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  };
  export const createJournalEntry = async (entry) => {
    try {
      const response = await fetch('https://localhost:44393/api/JournalEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', 
        body:entry
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.ok;
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  };
  export const uploadPhoto = async (journalEntryId, formData) => {
    try {
        const response = await fetch('https://localhost:44393/api/upload', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Network response was not ok: ${errorData.message}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(`Error uploading photo: ${error.message}`);
    }
};

