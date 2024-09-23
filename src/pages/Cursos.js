import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 
import Card from '../components/Card'; 
import { FaDesktop, FaTv, FaMobileAlt } from 'react-icons/fa';

const Cursos = () => {
  const navigate = useNavigate(); 

  const handleCourseClick = (curso) => {
    navigate(`/videos/${curso}`);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.pageContainer}>
        <div style={styles.cardContainer}>
          <div onClick={() => handleCourseClick('computador')} style={styles.clickableCard}>
            <Card
              icon={<FaDesktop />}
              title="COMPUTADOR"
              description="Aprenda a navegar pela internet e outros"
            />
          </div>

          <div onClick={() => handleCourseClick('televisao')} style={styles.clickableCard}>
            <Card
              icon={<FaTv />}
              title="TELEVISÃO"
              description="Aprenda agora a usar sua Smart TV novinha"
            />
          </div>

          <div onClick={() => handleCourseClick('celular')} style={styles.clickableCard}>
            <Card
              icon={<FaMobileAlt />}
              title="CELULAR"
              description="Aprenda agora como usar seu celular"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#d66747',
    padding: '50px 0',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    gap: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',  
    width: '100%',
  },
  clickableCard: {
    cursor: 'pointer',
  },
};

export default Cursos;
