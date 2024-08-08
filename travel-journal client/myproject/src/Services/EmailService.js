export const addEmail = async (email) => {
    try {
      const response = await fetch('https://localhost:44393/api/Email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', 
        body:email
      });
  
      if (!response.ok) {
    return(response.message);
      }
      return response.ok;
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  };