import { useReducer, useState } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import WeekPicker from "./WeekPicker";
import BookingsGrid from "./BookingsGrid";
import BookingDetails from "./BookingDetails";

export default function Bookings({ bookable }: { bookable: any }) {
  const [week, dispatch] = useReducer(reducer, new Date(), getWeek);

  const [booking, setBooking] = useState(null);

  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch}/>

        <BookingsGrid week={week} bookable={bookable} setBooking={setBooking} booking={booking}/>
      </div>
      <BookingDetails booking={booking} bookable={bookable}/>
    </div>
  )
}
