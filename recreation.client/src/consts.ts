export const API_HOST = "http://recreation.somee.com";

export const parseDate = (date: string) => {
    var result = new Date(date);
    var day = result.getDate() < 10 ? `0${result.getDate()}` : result.getDate();
    var month = result.getMonth() + 1 < 10 ? `0${result.getMonth() + 1}` : result.getMonth();
    return `${day}.${month}.${result.getFullYear()}`
};