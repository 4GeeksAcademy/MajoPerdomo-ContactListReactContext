const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            currentContact: null,
            error: null
        },
        actions: {
            // Cargar todos los contactos
            loadContacts: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/docs');
                    if (!response.ok) {
                        throw new Error('Error fetching contacts');
                    }
                    const data = await response.json();
                    setStore({ 
                        contacts: data,
                        error: null 
                    });
                } catch (error) {
                    console.error('Error loading contacts:', error);
                    setStore({ 
                        contacts: [],
                        error: 'No se pudieron cargar los contactos' 
                    });
                }
            },

            // Crear un nuevo contacto
            createContact: async (contactData) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/docs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contactData)
                    });

                    if (!response.ok) {
                        throw new Error('Error creating contact');
                    }

                    const newContact = await response.json();
                    const { contacts } = getStore();
                    setStore({ 
                        contacts: [...contacts, newContact],
                        error: null
                    });

                    return newContact;
                } catch (error) {
                    console.error('Error creating contact:', error);
                    setStore({ 
                        error: 'No se pudo crear el contacto' 
                    });
                    return null;
                }
            },

            // Actualizar un contacto existente
            updateContact: async (contactId, updatedData) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/docs/${contactId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedData)
                    });

                    if (!response.ok) {
                        throw new Error('Error updating contact');
                    }

                    const updatedContact = await response.json();
                    const { contacts } = getStore();
                    const updatedContacts = contacts.map(contact => 
                        contact.id === contactId ? updatedContact : contact
                    );
                    
                    setStore({ 
                        contacts: updatedContacts,
                        error: null
                    });

                    return updatedContact;
                } catch (error) {
                    console.error('Error updating contact:', error);
                    setStore({ 
                        error: 'No se pudo actualizar el contacto' 
                    });
                    return null;
                }
            },

            // Eliminar un contacto
            deleteContact: async (contactId) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/docs/${contactId}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('Error deleting contact');
                    }

                    const { contacts } = getStore();
                    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
                    
                    setStore({ 
                        contacts: updatedContacts,
                        error: null
                    });

                    return true;
                } catch (error) {
                    console.error('Error deleting contact:', error);
                    setStore({ 
                        error: 'No se pudo eliminar el contacto' 
                    });
                    return false;
                }
            },

            // Establecer el contacto actual para edición
            setCurrentContact: (contact) => {
                setStore({ currentContact: contact });
            },

            // Limpiar errores
            clearError: () => {
                setStore({ error: null });
            }
        }
    };
};

export default getState;
