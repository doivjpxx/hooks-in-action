import { shortISO } from "./date-wrangler";

export default function getData(url: string) {

  return fetch(url)
    .then(resp => {

      if (!resp.ok) {
        throw Error("There was a problem fetching data.");
      }

      return resp.json();
    });
}

export function getBookings(bookableId: number, startDate: Date, endDate: Date) {

  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const query = `bookableId=${bookableId}` +
    `&date_gte=${start}&date_lte=${end}`;

  return getData(`${urlRoot}?${query}`);
}
