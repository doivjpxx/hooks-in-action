import { Fragment, useCallback, useReducer, useState } from "react";

import reducer from "./reducer";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  isLoading: true,
  error: false,
}

export default function BookablesView () {
  const [bookable, setBookable] = useState();

  const updateBookable = useCallback((selected: any) => {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  }, [])

  return <Fragment>
    <BookablesList bookable={bookable} setBookable={updateBookable} />
    <BookableDetails bookable={bookable} />
  </Fragment>
}
