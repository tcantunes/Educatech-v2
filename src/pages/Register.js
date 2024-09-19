import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const { name, city, state, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await fetch('https://educatech-backend-7yo9.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          city,
          state,
          email,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.contentContainer}>
        <div style={styles.imageContainer}>
          <img
            src={require('../assets/cadastro.png')}
            alt="Educatech"
            style={styles.image}
          />
        </div>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>BEM-VINDO À EDUCATECH!</h2>
          <p style={styles.subtitle}>Insira seus dados para criar sua conta:</p>

          <form style={styles.form} onSubmit={handleConfirm}>
            <label style={styles.label}>Nome Completo</label>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome aqui"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Cidade</label>
            <input
              type="text"
              name="city"
              placeholder="Digite sua cidade aqui"
              value={formData.city}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Estado</label>
            <input
              type="text"
              name="state"
              placeholder="Digite seu estado aqui"
              value={formData.state}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email aqui"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha aqui"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Confirme sua senha</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Digite novamente sua senha aqui"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />

            <div style={styles.containerButton}>
              <Button
                text="Confirmar"
                style={styles.confirmButton}
                onClick={handleConfirm}
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#D9633F',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '50px',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    borderRadius: '20%',
    width: '400px',
    height: 'auto',
  },
  formContainer: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: '50px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#FDF4D7',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: '400',
    marginBottom: '20px',
    color: '#FDF4D7',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#FDF4D7',
  },
  input: {
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '2px solid #FDF4D7',
    backgroundColor: 'transparent',
    color: '#FDF4D7',
  },
  containerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};

export default Register;
