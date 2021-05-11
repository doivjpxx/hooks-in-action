import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";

export default function UserPicker() {

  const [users, setUsers] = useState([]);

  useEffect(()=> {
    (async () => {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    })();
  }, [])

  if (users === null) {
    return <Spinner/>;
  }

  return <select>
    {users.map((u: any, index: number) => <option key={u.id}>{u.name}</option>)}
  </select>
}
