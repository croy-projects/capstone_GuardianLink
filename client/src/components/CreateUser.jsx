import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../services/userService";
import { getRoles } from "../services/roleService";

function CreateUser() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    name: '',
    role_id: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    navigate('/admin'); // go back to dashboard
  };

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="form-page">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role_id">Role</label>

          <select
            name="role_id"
            value={form.role_id}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.role}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-action" onClick={() => navigate('/admin')}>
            Cancel
          </button>
          <button type="submit" className="btn-action">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;