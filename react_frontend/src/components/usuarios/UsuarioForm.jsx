import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import { useNotification } from '../../context/NotificationContext';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

const UsuarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchUsuario = async () => {
        try {
          const usuario = await UsuarioService.getUsuarioById(id);
          setFormData(usuario.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching usuario details');
          showError('No se pudo cargar el usuario');
          setLoading(false);
        }
      };
      fetchUsuario();
    }
  }, [id, isEditMode, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await UsuarioService.updateUsuario(id, formData);
        showSuccess('Usuario actualizado exitosamente');
      } else {
        await UsuarioService.createUsuario(formData);
        showSuccess('Usuario creado exitosamente');
      }
      navigate('/usuarios');
    } catch (err) {
      const errorMsg = `Error ${isEditMode ? 'actualizando' : 'creando'} usuario`;
      setError(errorMsg);
      showError(errorMsg);
    }
  };

  if (loading) return (
    <div className="flex justify-content-center align-items-center" style={{ height: '300px' }}>
      <ProgressSpinner />
    </div>
  );

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => navigate('/usuarios')}
      />
      <Button
        label={isEditMode ? 'Actualizar' : 'Crear'}
        icon="pi pi-check"
        type="submit"
        onClick={handleSubmit}
      />
    </div>
  );

  return (
    <Card
      title={isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      subTitle={isEditMode ? 'Actualice la información del usuario' : 'Complete el formulario para crear un nuevo usuario'}
      footer={footer}
    >
      {error && <Message severity="error" text={error} className="mb-4" />}
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="grid">
          <div className="col-12 md:col-6 mb-4">
            <span className="p-float-label">
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Nombre</label>
            </span>
          </div>
          <div className="col-12 md:col-6 mb-4">
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="col-12 md:col-6 mb-4">
            <span className="p-float-label">
              <InputText
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              <label htmlFor="age">Edad</label>
            </span>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default UsuarioForm;