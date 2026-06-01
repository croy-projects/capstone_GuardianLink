import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Connecting Cybersecurity Experts with NGOs</h1>
        <button type="button" className="btn-primary" onClick={() => navigate('/register-volunteer')}>Become a Volunteer</button>
        <button type="button" className="btn-secondary" onClick={() => navigate('/register-ngo')}>Request Assistance</button>
      </div>
      <section>
        <h2>What We Do</h2>
        <p>
          Connecting cybersecurity professionals with nonprofits and small organizations that need protection.
        </p>
      </section>
      <section>
        <h2>Our Partners</h2>
        <div className="cards">
          <div className="card">
            <h3>CyberShield Alliance</h3>
            <p>Protecting those who protect others</p>
          </div>
          <div className="card">
            <h3>SecureFuture Foundation</h3>
            <p>Empowering nonprofits through digital safety</p>
          </div>
          <div className="card">
            <h3>NetGuard Volunteers Network</h3>
            <p>Connecting experts to causes that matter</p></div>
        </div>
      </section>
    </div>
  );
}

export default Home;