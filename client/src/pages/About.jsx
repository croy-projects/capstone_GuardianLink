import "../styles/about.css";
import { useNavigate } from 'react-router-dom';

function AboutUs() {
    const navigate = useNavigate();
    return (
        <div className="about-page">
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="hero-overlay">
                    <h1>About GuardianLink</h1>
                    <p>
                        Connecting cybersecurity professionals with nonprofits and small
                        organizations that need protection.
                    </p>
                </div>
            </section>
            {/* WHO WE ARE */}
            <section className="about-section">
                <div className="section-content">
                    <h2>Who We Are</h2>
                    <p>
                        GuardianLink is a volunteer-driven cybersecurity platform dedicated
                        to helping nonprofits and small organizations improve their digital
                        safety. We connect skilled cybersecurity professionals with
                        organizations that need guidance, protection, and support.
                    </p>
                </div>
            </section>
            {/* WHAT WE DO */}
            <section className="about-section alt-bg">
                <div className="section-content">
                    <h2>What We Do</h2>
                    <div className="card-grid">
                        <div className="info-card">
                            <h3>Volunteer Matching</h3>
                            <p>
                                We connect cybersecurity volunteers with organizations seeking
                                technical assistance and security guidance.
                            </p>
                        </div>

                        <div className="info-card">
                            <h3>Cybersecurity Support</h3>
                            <p>
                                Volunteers help identify vulnerabilities, improve security
                                practices, and strengthen digital infrastructure.
                            </p>
                        </div>

                        <div className="info-card">
                            <h3>Community Protection</h3>
                            <p>
                                Our mission is to make cybersecurity accessible to organizations
                                that may not have the resources for professional services.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* WHY WE DO IT */}
            <section className="about-section">
                <div className="section-content">
                    <h2>Why We Do It</h2>
                    <p>
                        Nonprofits and community organizations are increasingly targeted by
                        cyber threats but often lack the resources to defend themselves.
                        GuardianLink exists to bridge that gap by empowering skilled
                        volunteers to make a meaningful impact through cybersecurity
                        service.
                    </p>
                </div>
            </section>
            {/* PARTNERSHIPS */}
            <section className="about-section alt-bg">
                <div className="section-content">
                    <h2>Our Partnerships</h2>

                    <div className="partners-grid">
                        <div className="partner-card">
                            <h3>CyberShield Alliance</h3>
                            <p>Providing educational resources and volunteer training.</p>
                        </div>

                        <div className="partner-card">
                            <h3>SafeNet Foundation</h3>
                            <p>Supporting nonprofit organizations with digital safety.</p>
                        </div>

                        <div className="partner-card">
                            <h3>SecureFuture Tech</h3>
                            <p>Collaborating on cybersecurity awareness initiatives.</p>
                        </div>

                        <div className="partner-card">
                            <h3>Global Defense Initiative</h3>
                            <p>
                                Assisting with cybersecurity outreach and community protection.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Actions */}
            <section className="cta-section">
                <h2>Join GuardianLink Today</h2>
                <p>
                    Whether you're a cybersecurity professional or an organization in
                    need, together we can build a safer digital future.
                </p>

                <div className="cta-buttons">
                    <button className="btn-primary" onClick={() => navigate('/register-volunteer')}>Become a Volunteer</button>
                    <button className="btn-secondary" onClick={() => navigate('/register-ngo')}>Request Assistance</button>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;