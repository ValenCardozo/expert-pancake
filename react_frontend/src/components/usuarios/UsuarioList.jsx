import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import { useNotification } from '../../context/NotificationContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await UsuarioService.getAllUsuarios();
        setUsuarios(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching usuarios');
        showError('No se pudieron cargar los usuarios');
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const confirmDeleteUsuario = (id) => {
    confirmDialog({
      message: '¿Estás seguro que deseas eliminar este usuario?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => handleDelete(id)
    });
  };

  const handleDelete = async (id) => {
    try {
      await UsuarioService.deleteUsuario(id);
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      showSuccess('Usuario eliminado exitosamente');
    } catch (err) {
      setError('Error deleting usuario');
      showError('Error al eliminar el usuario');
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Listado de Usuarios', 14, 14);
    autoTable(doc, {
      head: [['Nombre', 'Email', 'Edad']],
      body: usuarios.map(u => [u.name, u.email, u.age]),
      startY: 20,
    });
    doc.save('usuarios.pdf');
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Link to={`/usuarios/${rowData.id}`}>
        <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-button-sm" />
      </Link>
      <Link to={`/usuarios/edit/${rowData.id}`}>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-button-sm" />
      </Link>
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-sm"
        onClick={() => confirmDeleteUsuario(rowData.id)}
      />
    </div>
  );

  const header = (
    <div className="flex justify-content-between align-items-center">
      <h2>Usuarios</h2>
      <div>
        <Button icon="pi pi-file-pdf" label="Exportar PDF" className="p-button-success mr-2" onClick={exportPDF} />
        <Link to="/usuarios/new">
          <Button icon="pi pi-plus" label="Nuevo Usuario" className="p-button-success" />
        </Link>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex justify-content-center align-items-center" style={{ height: '300px' }}>
      <ProgressSpinner />
    </div>
  );

  if (error) return (
    <Message severity="error" text={error} />
  );

  const emptyTemplate = () => (
    <div className="text-center p-5">
      <p className="mb-3">No hay usuarios disponibles</p>
      <Link to="/usuarios/new">
        <Button label="Agregar un usuario" icon="pi pi-plus" />
      </Link>
    </div>
  );

  return (
    <Card>
      <ConfirmDialog />
      <DataTable
        value={usuarios}
        header={header}
        emptyMessage={emptyTemplate}
        responsiveLayout="scroll"
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column field="name" header="Nombre" sortable style={{ width: '25%' }} />
        <Column field="email" header="Email" sortable style={{ width: '25%' }} />
        <Column field="age" header="Edad" sortable style={{ width: '20%' }} />
        <Column body={actionBodyTemplate} style={{ width: '20%', textAlign: 'center' }} />
      </DataTable>
    </Card>
  );
};

export default UsuarioList;