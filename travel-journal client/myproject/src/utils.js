export  const convertDateToenUS = (date) => {
    return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  export  const convertDateToDMY = (date) => {
    return new Date(date).toLocaleDateString( { day: 'numeric', month: 'short', year: 'numeric' });
  };

 export const getCardClassName = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > now) {
      return 'future-trip';
    } else if (end < now) {
      return 'past-trip';
    } else {
      return 'happening now';
    }
  };
  export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };