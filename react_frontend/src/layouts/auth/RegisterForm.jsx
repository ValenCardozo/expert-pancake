import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (name && email && password && confirmPassword && password === confirmPassword) {
      await register({ name, email, password });
    }
  };

  return (
    <div className="flex justify-content-center">
      <Card title="Registro de Usuario" className="w-full md:w-6" style={{ maxWidth: '450px' }}>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="name" className="font-bold">Nombre</label>
            <InputText 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className={classNames({ 'p-invalid': submitted && !name })}
            />
            {submitted && !name && <small className="p-error">Nombre es requerido.</small>}
          </div>
          
          <div className="field">
            <label htmlFor="email" className="font-bold">Email</label>
            <InputText 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className={classNames({ 'p-invalid': submitted && !email })}
            />
            {submitted && !email && <small className="p-error">Email es requerido.</small>}
          </div>
          
          <div className="field">
            <label htmlFor="password" className="font-bold">Contraseña</label>
            <Password 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              toggleMask 
              required
              className={classNames({ 'p-invalid': submitted && !password })}
            />
            {submitted && !password && <small className="p-error">Contraseña es requerida.</small>}
          </div>
          
          <div className="field">
            <label htmlFor="confirmPassword" className="font-bold">Confirmar Contraseña</label>
            <Password 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              toggleMask 
              required
              className={classNames({ 
                'p-invalid': submitted && (!confirmPassword || confirmPassword !== password) 
              })}
              feedback={false}
            />
            {submitted && !confirmPassword && (
              <small className="p-error">Confirmar contraseña es requerido.</small>
            )}
            {submitted && confirmPassword && confirmPassword !== password && (
              <small className="p-error">Las contraseñas no coinciden.</small>
            )}
          </div>
          
          <Button type="submit" label="Registrarse" className="mt-2" />
          
          <div className="mt-3 text-center">
            <p>¿Ya tienes una cuenta? <Link to="/inicio-sesion">Iniciar Sesión</Link></p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;