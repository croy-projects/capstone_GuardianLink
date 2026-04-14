import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero">
        <h1>Connecting Cybersecurity Experts with NGOs</h1>
        <button className="btn-primary">Become a Volunteer</button>
        <button className="btn-secondary" onClick={() => navigate('/register-ngo')}>Request Help</button>
      </div>

      <section>
        <h2>About Us</h2>
        <p>
          We connect cybersecurity professionals with non-profits in need of protection.
        </p>
      </section>

      <section>
        <h2>Our Partners</h2>
        <div className="cards">
          <div className="card">Partner 1</div>
          <div className="card">Partner 2</div>
          <div className="card">Partner 3</div>
        </div>
      </section>
    </>
  );
}

export default Home;