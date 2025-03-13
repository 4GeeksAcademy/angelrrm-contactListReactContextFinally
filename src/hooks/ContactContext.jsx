import { createContext, useReducer, useEffect } from "react";

// Crear el contexto
export const ContactContext = createContext();

// Estado inicial
const initialState = {
  contacts: [],
  message: "",  // Mensaje de éxito/error
  isError: false,  // Indica si el mensaje es un error
};

// Reducer para manejar acciones
const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    case "SET_MESSAGE":
      return { ...state, message: action.payload.message, isError: action.payload.isError };
    default:
      return state;
  }
};

// Proveedor del Contexto
export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Función para obtener contactos desde la API
  const getContacts = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/your-agenda-name/contacts");
      const data = await response.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts });
    } catch (error) {
      dispatch({ type: "SET_MESSAGE", payload: { message: "Error fetching contacts", isError: true } });
    }
  };

  // Función para agregar un contacto
  const addContact = async (contact) => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/your-agenda-name/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      const newContact = await response.json();
      dispatch({ type: "ADD_CONTACT", payload: newContact });
      dispatch({ type: "SET_MESSAGE", payload: { message: "Contact added successfully", isError: false } });
    } catch (error) {
      dispatch({ type: "SET_MESSAGE", payload: { message: "Error adding contact", isError: true } });
    }
  };

  // Función para actualizar un contacto
  const updateContact = async (contact) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/your-agenda-name/contacts/${contact.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      const updatedContact = await response.json();
      dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
      dispatch({ type: "SET_MESSAGE", payload: { message: "Contact updated successfully", isError: false } });
    } catch (error) {
      dispatch({ type: "SET_MESSAGE", payload: { message: "Error updating contact", isError: true } });
    }
  };

  // Función para eliminar un contacto
  const deleteContact = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/contact/agendas/your-agenda-name/contacts/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_CONTACT", payload: id });
      dispatch({ type: "SET_MESSAGE", payload: { message: "Contact deleted successfully", isError: false } });
    } catch (error) {
      dispatch({ type: "SET_MESSAGE", payload: { message: "Error deleting contact", isError: true } });
    }
  };

  // Cargar contactos al iniciar
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ state, getContacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};