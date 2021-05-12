import { Fragment, useEffect, useMemo, useState } from "react";
import { getGrid, transformBookings } from "./grid-builder";
import { getBookings } from "../../utils/api";
import Spinner from "../../ui/Spinner";

export default function BookingsGrid(props: any) {
  const { week, bookable, booking, setBooking } = props;
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(false);

  // @ts-ignore
  const { grid, sessions, dates } = useMemo(() => bookable ? getGrid(bookable, week.start) : {}, [bookable, week.start]);

  // @ts-ignore
  useEffect(() => {
    if (bookable) {
      let doUpdate = true;

      setBookings(null);
      setError(false);
      setBooking(null);

      getBookings(bookable.id, week.start, week.end).then(res => {
        if (doUpdate) {
          setBookings(transformBookings(res));
        }
      }).catch(setError);
      return () => doUpdate = false;
    }
  }, [week, bookable, setBooking]);

  function cell (session: string, date: string) {
    const cellData = bookings?.[session]?.[date]
      || grid[session][date];

    const isSelected = booking?.session === session
      && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : ''}
        onClick={bookings ? () => setBooking(cellData) : () => {}}
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table
        className={bookings ? "bookingsGrid active" : "bookingsGrid"}
      >
        <thead>
        <tr>
          <th>
            <span className="status">
              <Spinner/>
            </span>
          </th>
          {dates.map((d: string) => (
            <th key={d}>
              {(new Date(d)).toDateString()}
            </th>
          ))}
        </tr>
        </thead>

        <tbody>
        {sessions.map((session: any) => (
          <tr key={session}>
            <th>{session}</th>
            {dates.map((date: any) => cell(session, date))}
          </tr>
        ))}
        </tbody>
      </table>
    </Fragment>
  )
}
