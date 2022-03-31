import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUserById, editUser } from '../../services';
import { LoadingPanel } from '../../components';
import { UserForm } from '../../forms';
import { Button } from '@progress/kendo-react-buttons';

// helper method - cuz data on server and locally are different
// I would rather make data looking the same
const getInitials = (user) => {
  const fullname = user.FullName.split(' ');
  return {
    firstname: fullname[0],
    lastname: fullname[1],
    enabled: user.Enabled,
  };
};

// we can store current user inside Context, but i didnt do that
const SingleUser = () => {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const id = pathname.split('/').pop();
  const [user, setUser] = useState(state.user);

  // we have single user locally, so i didnt moved this action to UserContext
  const editCurrentUser = async (values) => {
    const { firstname, lastname, enabled } = values;
    const data = {
      FullName: firstname + ' ' + lastname,
      Enabled: enabled,
    };
    try {
      const editedUser = await editUser(id, data);
      console.log(editedUser);
      setUser(editedUser);
    } catch (err) {
      throw err;
    }
  };

  const getUser = async () => {
    try {
      const fetchedUser = await fetchUserById(id);
      setUser(fetchedUser);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return !user ? (
    <LoadingPanel />
  ) : (
    <div>
      <div> {user.Username}</div>
      <div> {user.FullName}</div>
      <div> {user.Enabled}</div>
      <UserForm
        label="edit"
        action={editCurrentUser}
        initialValues={getInitials(user)}
      />
      <Button onClick={() => navigate('/users')} themeColor={'primary'}>
        back
      </Button>
    </div>
  );
};

export default SingleUser;
