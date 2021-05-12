import { FaEdit } from 'react-icons/all';
import Booking from "./Booking";
import UserContext from "../Users/UserContext";
import { useContext } from "react";

export default function BookingDetails({ booking, bookable }: { booking: any, bookable: any }) {
  const user: any = useContext(UserContext);
  const isBooker = booking && user && (booking.bookerId === user.id);

  return (
    <div className="booking-details">
      <h2>Booking Details {isBooker &&
      <span className="controls">
            <button className="btn">
            <FaEdit/>
        </button>
      </span>}</h2>

      {booking ? (<Booking bookable={bookable} booking={booking}/>) : (<div className="booking-details-fields">
        <p>Select a booking or a booking slot.</p>
      </div>)}
    </div>
  )
}
