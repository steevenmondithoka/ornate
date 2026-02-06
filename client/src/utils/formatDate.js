export const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle empty or undefined date strings

    const date = new Date(dateString); // Create a Date object from the string
    
    // Check if the date is valid (e.g., handles invalid date strings gracefully)
    if (isNaN(date.getTime())) {
        return dateString; // Return original string if it's an invalid date
    }

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Format for English, e.g., "February 28, 2026"

    // If you strictly want "28 February 2026", you might need to build it manually:
    // const day = date.getDate();
    // const month = date.toLocaleString('en-US', { month: 'long' });
    // const year = date.getFullYear();
    // return `${day} ${month} ${year}`;
};
