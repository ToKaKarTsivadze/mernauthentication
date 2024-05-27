import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div>Dashboard</div>
      {user && <h1> hello {user.name}!</h1>}
    </div>
  );
}
