import React, { useState, useEffect } from 'react'
import { websiteService, teamService } from '../../services/api'
import './About.css'

function About() {
  const [settings, setSettings] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [settingsRes, teamRes] = await Promise.all([
        websiteService.getSettings(),
        teamService.getTeamMembers()
      ])
      setSettings(settingsRes.data)
      setTeamMembers(teamRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Learn more about our story and mission</p>
      </section>

      {/* Company Story */}
      <section className="story-section">
        <div className="section-container">
          <h2>Our Story</h2>
          <p>
            {settings?.companyStory || 'Founded with a vision to transform businesses through innovative technology solutions, Data-Analogy has been at the forefront of digital transformation. We started as a small team of passionate developers and have grown into a full-service technology partner for businesses worldwide.'}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mv-section">
        <div className="section-container">
          <div className="mv-grid">
            <div className="mv-card">
              <h3>🎯 Our Mission</h3>
              <p>{settings?.mission || 'To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation.'}</p>
            </div>
            <div className="mv-card">
              <h3>👁️ Our Vision</h3>
              <p>{settings?.vision || 'To be the leading technology partner for businesses seeking digital transformation and sustainable growth.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="section-container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">💡</span>
              <h4>Innovation</h4>
              <p>Constantly pushing boundaries to deliver cutting-edge solutions</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🤝</span>
              <h4>Integrity</h4>
              <p>Building trust through transparency and honesty</p>
            </div>
            <div className="value-card">
              <span className="value-icon">⭐</span>
              <h4>Excellence</h4>
              <p>Striving for perfection in every project we undertake</p>
            </div>
            <div className="value-card">
              <span className="value-icon">👥</span>
              <h4>Collaboration</h4>
              <p>Working together to achieve remarkable results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="section-container">
          <h2>Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2014</div>
              <div className="timeline-content">
                <h4>Company Founded</h4>
                <p>Data-Analogy was established with a small team of 5 members</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2017</div>
              <div className="timeline-content">
                <h4>Expanded Services</h4>
                <p>Added full-stack development and cloud solutions to our offerings</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h4>Global Reach</h4>
                <p>Served clients across 20+ countries worldwide</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h4>Industry Leader</h4>
                <p>Recognized as a top technology solutions provider</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member._id} className="team-card">
                {member.image && <img src={member.image} alt={member.name} />}
                <h3>{member.name}</h3>
                <p>{member.position}</p>
                {member.bio && <p className="bio">{member.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
