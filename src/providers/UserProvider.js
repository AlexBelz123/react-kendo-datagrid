import { useEffect, useState } from 'react';
import { orderBy } from '@progress/kendo-data-query';
import { fetchUsers, addUser } from '../services';
import UserContext from './UserContext';

// i did not add imidiate local update - it waits for server response with some UI indicator
// we can imidiatly update data, and in case, if smth went wrong - we can just undo it and show some notification
// but I just add some UI indicators like (loading, submitting)
const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState([]);

  const sortUsers = (sort) => {
    return orderBy(users, sort);
  };

  const sortChange = (event) => {
    setUsers(sortUsers(event.sort));
    setSort(event.sort);
  };

  const getUsers = async () => {
    try {
      const users = await fetchUsers();
      setUsers(users);
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const createUser = async (user) => {
    try {
      const newUser = await addUser(user);
      setUsers((prev) => [...prev, newUser]);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, loading, sort, sortChange, createUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
