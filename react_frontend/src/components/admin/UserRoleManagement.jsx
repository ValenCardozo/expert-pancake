import React, { useState, useEffect, useContext } from 'react';
import UsuarioService from '../../services/UsuarioService';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { ConfirmDialog } from 'primereact/confirmdialog';

const UserRoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useContext(AuthContext);

  const roleOptions = [
    { label: 'Usuario', value: 'user' },
    { label: 'Administrador', value: 'admin' }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UsuarioService.getAllUsuarios();
        setUsers(data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          throw new Error('Formato de datos inesperado');
        }
        console.log('Usuarios cargados:', users);
      } catch (error) {
        setError('Error al cargar los usuarios: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (e, userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, role: e.value } : user
    );
    setUsers(updatedUsers);
  };

  const saveRoleChange = async (userId, newRole) => {
    try {
      await UsuarioService.updateUserRole(userId, { role: newRole });
      alert('Rol actualizado correctamente');
    } catch (err) {
      alert('Error al actualizar el rol');
    }
  };

  const roleBodyTemplate = (rowData) => {
    const isDisabled = rowData.id === currentUser?.id || currentUser?.role !== 'admin';

    return (
      <Dropdown
        value={rowData.role || 'user'}
        options={roleOptions}
        onChange={(e) => {
          handleRoleChange(e, rowData.id);
          saveRoleChange(rowData.id, e.value);
        }}
        disabled={isDisabled}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    const isDisabled = rowData.id === currentUser?.id || currentUser?.role !== 'admin';

    return (
      <Button
        label="Guardar"
        icon="pi pi-save"
        onClick={() => saveRoleChange(rowData.id, rowData.role || 'user')}
        disabled={isDisabled}
        className="p-button-sm"
      />
    );
  };

  const header = (
    <div className="flex justify-content-between align-items-center">
      <h2>Panel de usuarios</h2>
      <div>
        {/* <Button icon="pi pi-file-pdf" label="Exportar PDF" className="p-button-danger mr-2" onClick={exportPDF} /> */}
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
    <Card title="Gestión de Roles de Usuario">
      <p className="mb-3">Desde esta sección puedes asignar roles a los usuarios. Solo los administradores pueden cambiar roles.</p>
      <ConfirmDialog />
      <DataTable
        header={header}
        value={users}
        emptyMessage={emptyTemplate}
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column field="name" header="Nombre" sortable />
        <Column field="email" header="Email" sortable />
        <Column header="Rol" body={roleBodyTemplate} sortable sortField="role" />
        <Column body={actionBodyTemplate} style={{ width: '150px', textAlign: 'center' }} />
      </DataTable>
    </Card>
  );
};

export default UserRoleManagement;