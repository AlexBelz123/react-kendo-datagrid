import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import Dashboard from './pages/Dashboard';
import SingleUser from './pages/SingleUser';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Dashboard />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="" element={<Navigate to="/users" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
