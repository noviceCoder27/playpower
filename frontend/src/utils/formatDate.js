export const formatDate = (d) => {
    const date = new Date(d);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = months[date.getMonth()+1]
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}