import WeekPicker from "../components/Booking/WeekPicker";
import { useState } from "react";
import Bookings from "../components/Booking/Bookings";
import BookablesList from "../components/Bookables/BookablesList";

export default function BookingsPage() {
  const [bookable, setBookable] = useState(null);
  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable}/>
      <Bookings bookable={bookable}/>
    </main>
  );
}
