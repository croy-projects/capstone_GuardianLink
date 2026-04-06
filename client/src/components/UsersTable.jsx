import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (

    <section className="table-container admin-section">
      <h3>Users</h3>
      <div className="table-actions">
        <button className="btn-create">
          Create User
        </button>
      </div>
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
                <button className="btn-edit">
                  Edit
                </button>
                <button className="btn-reset">
                  Reset Pass
                </button>
                <button className="btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}