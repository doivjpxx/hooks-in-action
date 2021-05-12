export default function BookingsGrid(props: any) {
  const { week, bookable, booking, setBooking } = props;

  return (
    <div className="bookings-grid placeholder">
      <h3>Bookings Grid</h3>
      <p>{bookable?.grid}</p>
      <p>{week.date.toISOString()}</p>
    </div>
  )
}
