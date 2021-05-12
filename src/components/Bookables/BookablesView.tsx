import { Fragment, useReducer } from "react";

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const bookablesInGroup = state.bookables.filter((b: any) => b.group === state.group);
  const bookable = bookablesInGroup[state.bookableIndex];

  return <Fragment>
    <BookablesList state={state} dispatch={dispatch} />
    <BookableDetails bookable={bookable} />
  </Fragment>
}
