export function getDateArray(timestamp) {
    const date = new Date(timestamp);
    // console.log(date);
    const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return [weekday, day, month, year];
  }