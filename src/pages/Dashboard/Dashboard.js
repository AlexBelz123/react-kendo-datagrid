import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@progress/kendo-theme-default/dist/all.css';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import UserContext from '../../providers/UserContext';
import { LoadingPanel, FieldExtension } from '../../components';
import { UserForm } from '../../forms';
import { v4 as uuidv4 } from 'uuid';

const initialFilter = {
  logic: 'and',
  filters: [],
};

const Dashboard = () => {
  const { users, loading, sort, sortChange, createUser } =
    useContext(UserContext);
  const [filter, setFilter] = useState(initialFilter);
  const navigate = useNavigate();

  const handleClick = (props) => {
    const { dataItem } = props;

    navigate(`/users/${dataItem.id}`, { state: { user: dataItem } });
  };

  const addUser = async (data) => {
    try {
      const { username, firstname, lastname, enable } = data;
      const FullName = firstname + ' ' + lastname;
      await createUser({
        id: uuidv4(),
        LastLogin: Date.now(),
        Username: username,
        Enable: enable,
        FullName,
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPanel />
      ) : (
        <>
          <UserForm label={'Add user'} action={addUser} />
          <Grid
            data={filterBy(users, filter)}
            filterable={true}
            filter={filter}
            sortable={{
              allowUnsort: true,
              mode: 'multiple',
            }}
            sort={sort}
            onSortChange={sortChange}
            onFilterChange={(e) => setFilter(e.filter)}
            onRowClick={handleClick}
            style={{
              height: '420px',
            }}
          >
            <Column field="Username" title="username" width="240px" />
            <Column field="FullName" title="Fullname" width="240px" />
            <Column
              field="LastLogin"
              width="240px"
              filter="date"
              cell={FieldExtension.DateField}
            />
            <Column
              field="Enabled"
              width="190px"
              filter="boolean"
              cell={FieldExtension.BooleanField}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Dashboard;
