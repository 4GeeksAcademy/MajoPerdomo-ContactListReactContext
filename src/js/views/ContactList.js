import React from 'react';
import './index.css';

export const ContactList = ({ 
    contacts, 
    onAddContact, 
    onEditContact, 
    onDeleteContact, 
    error 
}) => {
    return (
        <div className="contact-container">
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            <div className="contact-header">
                <h1>Contact List</h1>
                <button 
                    className="btn btn-primary btn-add-contact" 
                    onClick={onAddContact}
                >
                    + Add Contact
                </button>
            </div>

            {contacts.length === 0 ? (
                <div className="empty-list">No contacts found</div>
            ) : (
                contacts.map(contact => (
                    <div key={contact.id} className="contact-card">
                        <div className="contact-card-body">
                            <div className="contact-info">
                                <div className="contact-name">{contact.name}</div>
                                <div className="contact-details">
                                    Phone: {contact.phone}
                                    <br />
                                    Email: {contact.email}
                                </div>
                            </div>
                            <div className="contact-actions">
                                <button 
                                    className="btn btn-outline-primary btn-contact-action" 
                                    onClick={() => onEditContact(contact)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-outline-danger btn-contact-action" 
                                    onClick={() => onDeleteContact(contact.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};