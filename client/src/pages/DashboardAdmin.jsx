import UsersTable from '../components/UsersTable';

function DashboardAdmin() {
  return (
    <>
      <section className="admin-section">
        <h2>Admin Dashboard</h2>
        <UsersTable />
      </section>
    </>
  );
}

export default DashboardAdmin;