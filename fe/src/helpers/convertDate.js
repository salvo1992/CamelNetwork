export const convertDateIntoHuman = (date) => {

    if (!date) return 'Data di pubblicazione assente'
    const newDate = new Date(date)
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Intl.DateTimeFormat('it-IT', options).format(newDate);
}
