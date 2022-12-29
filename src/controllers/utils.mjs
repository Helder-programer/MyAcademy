export function formatDate(myDate) {
    let [day, month, year] = myDate.split('/');
    myDate = new Date(+year, +month - 1, +day);
    return myDate;
}