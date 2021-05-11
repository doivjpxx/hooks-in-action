import WeekPicker from "../components/Booking/WeekPicker";

export default function BookingsPage() {
  return (
    <main className="bookings-page">
      <p>Bookings! </p>
      <WeekPicker date={new Date(Date.now())}/>
    </main>
  );
}
