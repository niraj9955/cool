import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { serviceService } from '../../services/api'
import './Services.css'

function Services() {
  const [searchParams] = useSearchParams()
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    fetchServices()
    const searchParam = searchParams.get('search')
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams])

  useEffect(() => {
    filterServices()
  }, [services, selectedCategory, searchQuery])

  const fetchServices = async () => {
    try {
      const response = await serviceService.getServices()
      setServices(response.data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = [...services]
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category === selectedCategory)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      )
    }
    
    setFilteredServices(filtered)
  }

  const categories = ['all', ...new Set(services.map(s => s.category).filter(Boolean))]

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="services-page">
      <section className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive solutions for your business needs</p>
      </section>

      <section className="services-content">
        <div className="section-container">
          {/* Search and Filter */}
          <div className="services-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="category-filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service._id} className="service-card">
                  {service.image && (
                    <img src={service.image} alt={service.title} />
                  )}
                  <div className="service-content">
                    <span className="service-category">{service.category}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button 
                      className="read-more-btn"
                      onClick={() => setSelectedService(service)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No services found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedService(null)}>×</button>
            {selectedService.image && (
              <img src={selectedService.image} alt={selectedService.title} className="modal-image" />
            )}
            <h2>{selectedService.title}</h2>
            <span className="service-category">{selectedService.category}</span>
            <p className="modal-description">{selectedService.description}</p>
            {selectedService.features && (
              <div className="modal-features">
                <h4>Key Features:</h4>
                <ul>
                  {selectedService.features.split('\n').map((feature, idx) => (
                    <li key={idx}>{feature.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Services
