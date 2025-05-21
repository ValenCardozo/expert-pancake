import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductoService from '../../services/ProductoService';
import { useNotification } from '../../context/NotificationContext';

// Componentes PrimeReact
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

const ProductoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    nombre: '',
    precio: 0,
    descripcion: '',
    stock: 0
  });

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchProducto = async () => {
        try {
          const producto = await ProductoService.getProductoById(id);
          setFormData(producto.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching producto details');
          showError('No se pudo cargar el producto');
          setLoading(false);
        }
      };

      fetchProducto();
    }
  }, [id, isEditMode, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await ProductoService.updateProducto(id, formData);
        showSuccess('Producto actualizado exitosamente');
      } else {
        await ProductoService.createProducto(formData);
        showSuccess('Producto creado exitosamente');
      }

      navigate('/productos');
    } catch (err) {
      const errorMsg = `Error ${isEditMode ? 'actualizando' : 'creando'} producto`;
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
        onClick={() => navigate('/productos')}
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
      title={isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}
      subTitle={isEditMode ? 'Actualice la información del producto' : 'Complete el formulario para crear un nuevo producto'}
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

          <div className="col-12 md:col-6 mb-4" style={{ marginTop: "10%" }}>
            <span className="p-float-label">
              <InputNumber
                id="price"
                name="price"
                value={formData.price}
                onValueChange={(e) => handleNumberChange('price', e.value)}
                mode="currency"
                currency="USD"
                locale="en-US"
                required
              />
              <label htmlFor="price">Precio</label>
            </span>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ProductoForm;