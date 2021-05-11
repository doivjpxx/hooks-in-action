import { bookables, sessions, days } from '../../static.json';
import React, { Ref, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FaArrowRight } from "react-icons/all";
import reducer from "./reducer";
import getData from "../../utils/api";
import Spinner from "../../ui/Spinner";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
}

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef(null);
  const nextButtonref = useRef();
  const { group, bookableIndex, bookables, hasDetails, error, isLoading } = state;

  const groups = [...new Set(bookables.map((b: any) => b.group)) as any];
  const bookablesInGroup = bookables.filter((b: any) => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];

  useEffect(() => {
    dispatch({ type: 'FETCH_BOOKABLES_REQUEST'});
    getData("http://localhost:3001/bookables").then(bookables => dispatch({
      type: 'FETCH_BOOKABLES_SUCCESS',
      payload: bookables
    })).catch(err => dispatch({
      type: 'FETCH_BOOKABLES_FAIL',
      payload: err
    }));
  }, []);

  // useEffect(() => {
  //   // @ts-ignore
  //   timerRef.current = setInterval(() => dispatch({
  //     type: "NEXT_BOOK"
  //   }), 3000);
  //
  //   return stopPresentation;
  // });

  function stopPresentation() {
    // @ts-ignore
    clearInterval(timerRef.current);
  }

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

  function toggleDetails() {
    dispatch({ type: 'TOGGLE_HAS_DETAILS' });
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

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>
                {bookable.title}
              </h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
                <button className="btn" onClick={stopPresentation}>Stop</button>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days
                      .sort()
                      .map((d: any) => <li key={d}>{days[d]}</li>)
                    }
                  </ul>
                  <ul>
                    {bookable.sessions
                      .map((s: any) => <li key={s}>{sessions[s]}</li>)
                    }
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
