import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { websiteService, serviceService, testimonialService, teamService } from '../../services/api'
import './Home.css'

function Home() {
  const [settings, setSettings] = useState(null)
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [settingsRes, servicesRes, testimonialsRes, teamRes] = await Promise.all([
        websiteService.getSettings(),
        serviceService.getServices(),
        testimonialService.getTestimonials(),
        teamService.getTeamMembers()
      ])
      
      setSettings(settingsRes.data)
      setServices(servicesRes.data.slice(0, 3))
      setTestimonials(testimonialsRes.data.slice(0, 3))
      setTeamMembers(teamRes.data.slice(0, 3))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  const primaryColor = settings?.themeColor || '#2563eb'

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ background: `linear-gradient(135deg, ${primaryColor}dd, ${primaryColor}88)` }}>
        <div className="hero-container">
          <h1>{settings?.heroHeading || 'Welcome to Data-Analogy'}</h1>
          <p className="hero-description">{settings?.heroDescription || 'Building innovative solutions for your business growth'}</p>
          <div className="hero-buttons">
            <Link to="/services" className="btn-primary">Explore Services</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-card">
            <h3>200+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Team Members</p>
          </div>
          <div className="stat-card">
            <h3>10+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">We offer comprehensive solutions for your business</p>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service._id} className="service-card">
                {service.image && <img src={service.image} alt={service.title} />}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/services?id=${service._id}`} className="read-more">Read More →</Link>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>We deliver projects on time without compromising quality</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>Industry-leading standards in everything we do</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Dedicated Support</h3>
              <p>24/7 support to help you succeed</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Innovative Solutions</h3>
              <p>Cutting-edge technology for modern challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="testimonial-card">
                <div className="testimonial-content">"{testimonial.content}"</div>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="team-section">
        <div className="section-container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member._id} className="team-card">
                {member.image && <img src={member.image} alt={member.name} />}
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="contact-preview-section">
        <div className="section-container">
          <h2 className="section-title">Get In Touch</h2>
          <p>Ready to start your project? Contact us today!</p>
          <Link to="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
