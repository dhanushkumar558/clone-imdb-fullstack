import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_IMG = 'https://imdb.boltxgaming.com';

export default function MovieCard({ movie, saved: initiallySaved }) {
  const { user } = useUser();
  const [saved, setSaved] = useState(initiallySaved);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setSaved(initiallySaved);
  }, [initiallySaved]);

  const toggleSave = async (e) => {
    e.stopPropagation();

    if (!user) {
      setMessage('Login to save movies');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      if (saved) {
        await axios.delete(`${BASE_URL}/saved/${user.id}/${movie.id}`);
      } else {
        await axios.post(`${BASE_URL}/saved`, {
          userId: user.id,
          movieId: movie.id
        });
      }
      setSaved(!saved);
      setMessage(saved ? 'Removed from saved' : 'Added to saved');
    } catch {
      setMessage('Action failed');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="col-md-3 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="position-relative shadow-sm"
        style={{
          height: '380px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={() => navigate(`/movie/${movie.id}`)}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        {/* Trending Ribbon */}
        {movie.rating >= 8.5 && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '-30px',
            background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '4px 40px',
            transform: 'rotate(-45deg)',
            zIndex: 10,
            textAlign: 'center',
            boxShadow: '0 0 6px rgba(0,0,0,0.2)'
          }}>
            TRENDING
          </div>
        )}

        {/* Image */}
        <img
          src={movie.thumbnail?.startsWith('http') ? movie.thumbnail : `${BASE_IMG}/${movie.thumbnail}`}
          alt={movie.title}
          style={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />

        {/* Title + Description */}
        <div style={{ padding: '12px 16px 4px' }}>
          <h5 style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '4px' }}>{movie.title}</h5>
          <p style={{
            fontSize: '0.9rem',
            color: '#555',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>{movie.description}</p>
        </div>

        {/* Message area */}
        {message && (
          <div style={{
            color: saved ? '#dc3545' : '#198754',
            fontSize: '0.75rem',
            textAlign: 'center',
            marginTop: '4px',
            padding: '2px 10px',
          }}>
            {message}
          </div>
        )}

        {/* Bottom row: rating + save icon */}
        <div className="d-flex justify-content-between align-items-center px-3 pb-3 mt-auto">
          <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#444' }}>{movie.rating} ⭐</span>
          <button
            onClick={toggleSave}
            style={{
              background: 'white',
              borderRadius: '50%',
              padding: '6px 9px',
              fontSize: '1.4rem',
              border: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          >
            {saved ? '❤️' : '🤍'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
