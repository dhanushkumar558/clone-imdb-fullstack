import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://imdb.boltxgaming.com/api';
const BASE_IMG = 'https://imdb.boltxgaming.com';

export default function MovieDetailPage() {
  const { id } = useParams();
  const { user } = useUser();
  const [movie, setMovie] = useState(null);
  const [saved, setSaved] = useState(false);
  const [errorImages, setErrorImages] = useState({});

  useEffect(() => {
    axios.get(`${BASE_URL}/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error('❌ Movie fetch failed:', err));
  }, [id]);

  useEffect(() => {
    if (user && movie?.id) {
      axios
        .get(`${BASE_URL}/saved/${user.id}`)
        .then(res => {
          const savedIds = res.data.map(m => m.id);
          setSaved(savedIds.includes(movie.id));
        })
        .catch(() => {});
    }
  }, [user, movie]);

  const toggleSave = async () => {
    if (!user) return alert('Login to save movies');
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
    } catch {
      alert('❌ Save/Unsave failed.');
    }
  };

  const handleImageError = (key) => {
    setErrorImages(prev => ({ ...prev, [key]: true }));
  };

  if (!movie) return <div className="container mt-5 text-center">🎥 Loading movie details...</div>;

  return (
    <>
      <div className="container mt-4 movie-detail-card shadow-sm p-4 rounded position-relative">
        {/* ❤️ Save Button */}
        <button
          onClick={toggleSave}
          className="btn-save-detail"
          title="Save Movie"
        >
          {saved ? '❤️' : '🤍'}
        </button>

        {/* Banner */}
        {errorImages.banner ? (
          <div className="fallback-banner">{movie.title} banner not available</div>
        ) : (
          <img
            src={movie.banner?.startsWith('http') ? movie.banner : `${BASE_IMG}/${movie.banner}`}
            alt={movie.title}
            className="img-fluid mb-4 movie-banner"
            onError={() => handleImageError('banner')}
          />
        )}

        <h1 className="text-primary fw-bold mb-4 text-center">{movie.title}</h1>

        {/* Hero + Heroine */}
        <div className="row g-4 mb-4 justify-content-center">
          <div className="col-md-5 text-center">
            {errorImages.hero_img ? (
              <div className="fallback-image">Hero image not available</div>
            ) : (
              <img
                src={movie.hero_img?.startsWith('http') ? movie.hero_img : `${BASE_IMG}/${movie.hero_img}`}
                alt="Hero"
                className="profile-img"
                onError={() => handleImageError('hero_img')}
              />
            )}
            <h5 className="mt-2 fw-semibold">{movie.hero_name}</h5>
          </div>
          <div className="col-md-5 text-center">
            {errorImages.heroine_img ? (
              <div className="fallback-image">Heroine image not available</div>
            ) : (
              <img
                src={movie.heroine_img?.startsWith('http') ? movie.heroine_img : `${BASE_IMG}/${movie.heroine_img}`}
                alt="Heroine"
                className="profile-img"
                onError={() => handleImageError('heroine_img')}
              />
            )}
            <h5 className="mt-2 fw-semibold">{movie.heroine_name}</h5>
          </div>
        </div>

        {/* Movie Info */}
        <div className="movie-info-box p-4 rounded shadow-sm mt-4">
          <h4 className="mb-4 text-secondary border-bottom pb-2">🎬 Movie Information</h4>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="info-item">
                <span className="label">🎞️ Description:</span>
                <p>{movie.description}</p>
              </div>
              <div className="info-item">
                <span className="label">👥 Cast:</span>
                <p>{movie.cast}</p>
              </div>
              <div className="info-item">
                <span className="label">⭐ Rating:</span>
                <p>{movie.rating}</p>
              </div>
              <div className="info-item">
                <span className="label">📅 Release Year:</span>
                <p>{movie.release_year}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="info-item">
                <span className="label">📺 Platform:</span>
                <p>{movie.platform}</p>
              </div>
              <div className="info-item">
                <span className="label">🎶 Music:</span>
                <p>{movie.music}</p>
              </div>
              <div className="info-item">
                <span className="label">📖 Story:</span>
                <p>{movie.story}</p>
              </div>
              <div className="info-item">
                <span className="label">✨ VFX:</span>
                <p>{movie.vfx}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .movie-detail-card {
          background-color: #fff;
          border-left: 5px solid #0d6efd;
          animation: fadeInUp 0.5s ease;
        }

        .movie-banner {
          height: 320px;
          object-fit: cover;
          border-radius: 12px;
          width: 100%;
        }

        .profile-img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #dee2e6;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .btn-save-detail {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: none;
          font-size: 1.8rem;
          border-radius: 50%;
          padding: 6px 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 10;
          transition: transform 0.2s ease;
        }

        .btn-save-detail:hover {
          transform: scale(1.2);
        }

        .fallback-banner {
          background: #f8f9fa;
          color: #777;
          font-size: 1.1rem;
          font-weight: 500;
          height: 320px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .fallback-image {
          background: #f0f0f0;
          color: #999;
          width: 200px;
          height: 200px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          font-weight: 500;
        }

        .movie-info-box {
          background-color: #f8f9fa;
          border-left: 4px solid #0d6efd;
        }

        .movie-info-box .label {
          font-weight: 600;
          display: inline-block;
          margin-bottom: 0.25rem;
          color: #0d6efd;
        }

        .movie-info-box p {
          margin: 0 0 1rem 0;
          font-size: 0.96rem;
          color: #333;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
