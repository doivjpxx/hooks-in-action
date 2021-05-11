import { useState, useEffect, Fragment } from 'react';
import Spinner from "../../ui/Spinner";

export default function UsersList() {
  const [users, setUsers] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  const user = users?.[userIndex];

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(resp => resp.json())
      .then(data => setUsers(data));
  }, []);

  if (users === null) {
    return <p><Spinner/> Loading users...</p>
  }

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {(users as any).map((u: any, i: number) => (
          <li
            key={u.id}
            className={i === userIndex ? "selected" : ''}
          >
            <button
              className="btn"
              onClick={() => setUserIndex(i)}
            >
              {u.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{(user as any).name}</h2>
          </div>
          <div className="user-details">
            <h3>{(user as any).title}</h3>
            <p>{(user as any).notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}
