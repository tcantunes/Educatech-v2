import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import image from '../assets/login.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await fetch('https://educatech-backend-7yo9.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                toast.success('Login bem-sucedido!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => navigate('/cursos')
                });
            } else {
                toast.error(data.message || 'Erro ao fazer login', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            toast.error('Erro no servidor', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.contentContainer}>
                <div style={styles.imageContainer}>
                    <img src={image} alt="Casal sorrindo" style={styles.image} />
                </div>
                <div style={styles.formContainer}>
                    <h1 style={styles.title}>BEM-VINDO DE VOLTA!</h1>
                    <p style={styles.subtitle}>INSIRA SUAS INFORMAÇÕES PARA CONTINUAR</p>

                    <form onSubmit={handleLogin}>
                        <div style={styles.formGroup}>
                            <label htmlFor="email" style={styles.label}>EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="DIGITE SEU EMAIL AQUI"
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="password" style={styles.label}>SENHA</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="DIGITE SUA SENHA AQUI"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div style={styles.containerButton}>
                            <Button text="ENTRAR" style={styles.loginButton} type="submit" />
                            <p style={styles.registerText}>SE AINDA NÃO POSSUIR UMA CONTA:</p>
                            <Button text="CADASTRE-SE" style={styles.registerButton} onClick={handleRegisterRedirect} />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        backgroundColor: '#D9633F',
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: '20%',
        width: '400px',
        height: 'auto',
    },
    formContainer: {
        flex: 1,
        marginLeft: '50px',
        textAlign: 'left',
        color: '#FDF4D7',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '16px',
        fontWeight: '400',
        marginBottom: '30px',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '5px',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '2px solid #F4D19B',
        backgroundColor: '#D9633F',
        color: '#FDF4D7',
        marginBottom: '20px',
    },
    containerButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    registerText: {
        fontSize: '14px',
        fontWeight: '400',
        marginTop: '20px',
        marginBottom: '10px',
        color: '#FDF4D7',
    },
    registerButton: {
        padding: '15px 10px',
    },
};

export default Login;
