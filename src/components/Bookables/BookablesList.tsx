import { bookables, sessions, days } from '../../static.json';
import React, { Ref, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FaArrowRight } from "react-icons/all";
import reducer from "./reducer";
import getData from "../../utils/api";
import Spinner from "../../ui/Spinner";
import BookableDetails from "./BookableDetails";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
}

export default function BookablesList({ bookable, setBookable }: {bookable: any, setBookable: any}) {
  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((b: any) => b.group === group);
  const groups = [...new Set(bookables.map((b: any) => b.group)) as any];

  const nextButtonRef = useRef();

  useEffect(() => {
    getData("http://localhost:3001/bookables")

      .then(bookables => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })

      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  function changeGroup(e: any) {
    const bookablesInSelectedGroup = bookables.filter(
      (b: any) => b.group === e.target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  }

  // @ts-ignore
  function changeBookable(selectedBookable) {
    setBookable(selectedBookable);
    // @ts-ignore
    nextButtonRef.current.focus();
  }

  function nextBookable() {
    // @ts-ignore
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  if (error) {
    return <p>{(error as any).message}</p>
  }

  if (isLoading) {
    return <p><Spinner/> Loading bookables...</p>
  }

  return (
    <React.Fragment>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map(g => <option value={g} key={g}>{g}</option>)}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b: any, i: number) => (
            <li
              className={b.id === bookable.id ? "selected" : ''}
              key={b.id}
            >
              <button
                className="btn"
                onClick={() => changeBookable(b)}
              >
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button
            className="btn"
            onClick={nextBookable}
            ref={nextButtonRef as any}
            autoFocus
          >
            <FaArrowRight/>
            <span>Next</span>
          </button>
        </p>
      </div>

    </React.Fragment>
  );
}
