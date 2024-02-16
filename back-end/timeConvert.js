// Function to add a day to timezone as database is using UTC timezone.
function timeConvert(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Add one day
    return date;
}

module.exports = { timeConvert };