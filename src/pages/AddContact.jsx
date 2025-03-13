import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactContext } from "../hooks/ContactContext";

export const AddContact = () => {
    const { addContact, updateContact, state } = useContext(ContactContext);
    const navigate = useNavigate();
    const { id } = useParams();  // Para editar un contacto existente
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Si hay un ID, estamos en modo edición
    useEffect(() => {
        if (id) {
            const contactToEdit = state.contacts.find(contact => contact.id === parseInt(id));
            if (contactToEdit) {
                setFormData(contactToEdit);
            }
        }
    }, [id, state.contacts]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.full_name || !formData.email || !formData.phone || !formData.address) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        if (id) {
            updateContact({ ...formData, id: parseInt(id) });  // Actualizar contacto
        } else {
            addContact(formData);  // Agregar nuevo contacto
        }
        navigate("/");  // Redirigir a la lista de contactos
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">{id ? "Editar Contacto" : "Agregar Contacto"}</h2>
            {state.message && (  // Mostrar mensaje de éxito/error
                <div className={`alert ${state.isError ? "alert-danger" : "alert-success"}`}>
                    {state.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? "Actualizar" : "Agregar"}
                </button>
            </form>
        </div>
    );
};

export default AddContact;