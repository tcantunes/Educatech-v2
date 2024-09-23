import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const VideoPage = () => {
  const [userName, setUserName] = useState('');
  const [videos, setVideos] = useState([]); 
  const { curso } = useParams(); 

  const videoData = {
    computador: [
      { title: "Introdução ao Hardware", description: "Entenda as partes do computador", videoUrl: "https://www.youtube.com/embed/Oru9Ca9PGQg?si=fw8QYQ9J5P4V8l4j" },
      { title: "Montagem de PC", description: "Aprenda a montar um PC do zero", videoUrl: "https://www.youtube.com/embed/Oru9Ca9PGQg?si=fw8QYQ9J5P4V8l4j" },
    ],
    televisao: [
      { title: "Configuração de Smart TV", description: "Aprenda a configurar sua Smart TV", videoUrl: "url3" },
      { title: "Aplicativos Essenciais", description: "Os melhores apps para Smart TV", videoUrl: "url4" },
    ],
    celular: [
      { title: "Configurações Básicas", description: "Ajustes básicos para o seu celular", videoUrl: "url5" },
      { title: "Aplicativos Essenciais", description: "Os apps que você deve instalar", videoUrl: "url6" },
    ]
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;

      const fetchUserName = async () => {
        try {
          const response = await fetch(`https://educatech-backend-7yo9.onrender.com/api/auth/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserName(data.name); 
          } else {
            console.error('Erro ao buscar o nome do usuário');
          }
        } catch (error) {
          console.error('Erro na requisição da API:', error);
        }
      };

      fetchUserName(); 
    }

    if (videoData[curso]) {
      setVideos(videoData[curso]);
    }
  }, [curso]);

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>OLÁ, {userName.toUpperCase()}!</h1>
        <p style={styles.subtitle}>ESSES SÃO OS CURSOS SOBRE {curso.toUpperCase()}:</p>

        <div style={styles.videoGrid}>
          {videos.map((video, index) => (
            <div key={index} style={styles.card}>
              <iframe
                style={styles.video}
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{video.title}</h2>
                <p style={styles.cardDescription}>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
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
    padding: '40px',
    maxWidth: '1200px',
    color: '#FDF4D7',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop: '80px'
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: '400',
    marginBottom: '30px',
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#FDF4D7',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '200px',
  },
  cardContent: {
    padding: '15px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4C3327',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#4C3327',
  },
};

export default VideoPage;
