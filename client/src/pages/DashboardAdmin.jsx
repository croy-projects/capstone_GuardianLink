import UsersTable from '../components/UsersTable';

function DashboardAdmin() {
  return (
    <>
      <section className="admin-section">
        <h2>Admin Dashboard</h2>
        <UsersTable />
        <div className="table-actions">
          <button className="btn-create">
            Create User
          </button>
        </div>
      </section>
    </>
  );
} 

export default DashboardAdmin;