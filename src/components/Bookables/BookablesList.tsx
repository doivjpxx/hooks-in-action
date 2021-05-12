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

export default function BookablesList({ state, dispatch}: {state: any, dispatch: any}) {
  const timerRef = useRef(null);
  const nextButtonref = useRef();
  const { group, bookableIndex, bookables, hasDetails, error, isLoading } = state;

  const groups = [...new Set(bookables.map((b: any) => b.group)) as any];
  const bookablesInGroup = bookables.filter((b: any) => b.group === group);

  useEffect(() => {
    dispatch({ type: 'FETCH_BOOKABLES_REQUEST' });
    getData("http://localhost:3001/bookables").then(bookables => dispatch({
      type: 'FETCH_BOOKABLES_SUCCESS',
      payload: bookables
    })).catch(err => dispatch({
      type: 'FETCH_BOOKABLES_FAIL',
      payload: err
    }));
  }, [dispatch]);

  function changeGroup(e: any) {
    dispatch({
      type: 'SET_GROUP',
      payload: e.target.value
    });
  }

  function changeBookable(selectedIndex: number) {
    dispatch({ type: 'SET_BOOKABLE', payload: selectedIndex });
    // @ts-ignore
    nextButtonref.current.focus();
  }

  function nextBookable() {
    dispatch({ type: 'NEXT_BOOK' });
  }

  if (error) {
    return <p>{error.message}</p>
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
              className={i === bookableIndex ? "selected" : ''}
              key={b.id}
            >
              <button
                className="btn"
                onClick={() => changeBookable(i)}
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
            ref={nextButtonref as Ref<any>}
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
