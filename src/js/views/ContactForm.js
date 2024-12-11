import React, { useState, useEffect } from 'react';
import './index.css';

export const ContactForm = ({ 
    initialContact = null, 
    onSubmit,
    error 
}) => {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (initialContact) {
            setContactData(initialContact);
        }
    }, [initialContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contactData);
    };

    return (
        <div className="contact-form-container">
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <div className="contact-form">
                <h1>{initialContact ? 'Edit Contact' : 'Add New Contact'}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={contactData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={contactData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={contactData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={contactData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {initialContact ? 'Update Contact' : 'Create Contact'}
                    </button>
                </form>
            </div>
        </div>
    );
};