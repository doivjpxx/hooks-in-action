import { sessions as sessionNames } from "../../static.json";
import { addDays, shortISO } from "../../utils/date-wrangler";

export function getGrid(bookable: any, startDate: any) {

  const dates = bookable.days.sort().map(
    (d: number) => shortISO(addDays(startDate, d))
  );

  const sessions = bookable.sessions.map((i: any) => sessionNames[i]);

  const grid: any = {};

  sessions.forEach((session: any) => {
    grid[session] = {};
    dates.forEach((date: string) => grid[session][date] = {
      session,
      date,
      bookableId: bookable.id,
      title: ""
    });
  });

  return {
    grid,
    dates,
    sessions
  };
}

export function transformBookings(bookingsArray: any[]) {
  return bookingsArray.reduce((bookings, booking) => {

    const { session, date } = booking;

    if (!bookings[session]) {
      bookings[session] = {};
    }

    bookings[session][date] = booking;

    return bookings;
  }, {});
}
