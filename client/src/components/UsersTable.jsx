import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/userService';

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);
  const navigate = useNavigate();
  return (

    <section className="table-container admin-section">
      <h3>Users List</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.email}</td>
              <td className="actions">
                <button className="btn-edit" onClick={() => navigate(`/edit-user/${u.id}`)}>
                  Edit
                </button>
                <button className="btn-reset">
                  Reset Pass
                </button>
                <button className="btn-delete" onClick={() => deleteUser(u.id).then(loadUsers)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-actions">
        <button className="btn-action"
          onClick={() => navigate('/create-user')}
        >
          Create User
        </button>
      </div>
    </section>
  );
}