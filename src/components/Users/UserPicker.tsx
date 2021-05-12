import { FormEvent, useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";

export default function UserPicker({ user, setUser }: { user: any, setUser: any }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
      setUser(data[0]);
    })();
  }, [setUser]);

  function handleSelect(e: any) {
    const selectedId = parseInt(e.target.value, 10);
    const selectedUser = users.find((u: any) => u.id === selectedId);

    setUser(selectedUser);
  }

  if (users === null) {
    return <Spinner/>;
  }

  return <select onChange={handleSelect} value={user?.id}>
    {users.map((u: any, index: number) => <option key={u.id}>{u.name}</option>)}
  </select>
}
