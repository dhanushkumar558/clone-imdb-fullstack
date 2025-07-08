import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';

export default function SearchFilterBar({ onChange }) {
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('title_asc');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Track screen width for responsive behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    onChange({ search, year, genre, sort });
  }, [sort]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange({ search, year, genre, sort });
  };

  const handleReset = () => {
    setSearch('');
    setYear('');
    setGenre('');
    setSort('title_asc');
    onChange({ search: '', year: '', genre: '', sort: 'title_asc' });
  };

  const yearOptions = [...Array(20)].map((_, i) => {
    const y = new Date().getFullYear() - i;
    return { label: y.toString(), value: y.toString() };
  });

  const genreOptions = [
    { value: '', label: 'All Genres' },
    { value: 'Action', label: 'Action' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Adventure', label: 'Adventure' },
  ];

  const FilterForm = (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="row align-items-end g-3 mb-4 p-4 rounded shadow filter-bar bg-white mx-0"
    >
      <div className="col-lg-3 col-12">
        <label className="form-label fw-semibold">🎬 Search by Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Inception"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="col-lg-2 col-6">
        <label className="form-label fw-semibold">📅 Release Year</label>
        <Select
          options={yearOptions}
          value={yearOptions.find(opt => opt.value === year)}
          onChange={(option) => {
            const selected = option?.value ?? '';
            setYear(selected);
            onChange({ search, year: selected, genre, sort });
          }}
          isClearable
          placeholder="Select Year"
          styles={selectStyles}
        />
      </div>

      <div className="col-lg-2 col-6">
        <label className="form-label fw-semibold">🎭 Genre</label>
        <Select
          options={genreOptions}
          value={genreOptions.find(opt => opt.value === genre)}
          onChange={(option) => {
            const selected = option?.value ?? '';
            setGenre(selected);
            onChange({ search, year, genre: selected, sort });
          }}
          isClearable
          placeholder="Select Genre"
          styles={selectStyles}
        />
      </div>

      <div className="col-lg-2 col-12">
        <label className="form-label fw-semibold">⬇️ Sort By</label>
        <select
          className="form-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="title_asc">Title A–Z</option>
          <option value="title_desc">Title Z–A</option>
          <option value="rating_desc">Rating High–Low</option>
          <option value="rating_asc">Rating Low–High</option>
        </select>
      </div>

      <div className="col-lg-3 col-12 d-flex gap-2 mt-2">
        <button type="submit" className="btn btn-primary flex-grow-1 shadow-sm">
          🔍 Search
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary shadow-sm"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </motion.form>
  );

  return (
    <>
{isMobile && (
  <div className="d-flex justify-content-center mb-3">
    <button
      className="btn btn-sm text-white"
      style={{
        background: 'linear-gradient(45deg, #0d6efd, #6610f2)',
        border: 'none',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        padding: '6px 16px',
        borderRadius: '20px'
      }}
      onClick={() => setMobileFilterOpen(prev => !prev)}
    >
      {mobileFilterOpen ? 'Hide 🔼' : 'Filters 🔽'}
    </button>
  </div>
)}



      {/* Filters: mobile collapsible or desktop static */}
      <AnimatePresence>
        {(mobileFilterOpen || !isMobile) && FilterForm}
      </AnimatePresence>

      <style>{`
        .filter-bar {
          border-left: 4px solid #0d6efd;
          border-right: 4px solid #0d6efd;
        }

        .filter-bar input,
        .filter-bar .form-select {
          height: 38px;
        }

        .filter-bar .form-label {
          font-size: 0.9rem;
        }

        .filter-bar .btn {
          font-weight: 500;
          transition: transform 0.2s ease;
        }

        .filter-bar .btn:hover {
          transform: scale(1.04);
        }

        @media (max-width: 767px) {
          .filter-bar {
            margin-top: 0;
          }
        }
      `}</style>
    </>
  );
}

// React Select Styles
const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: '0.375rem',
    borderColor: state.isFocused ? '#0d6efd' : '#ced4da',
    boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13,110,253,.25)' : 'none',
    minHeight: '38px',
  }),
  dropdownIndicator: base => ({ ...base, padding: '0 8px' }),
  clearIndicator: base => ({ ...base, padding: '0 8px' }),
  menu: base => ({ ...base, zIndex: 9999 }),
};
