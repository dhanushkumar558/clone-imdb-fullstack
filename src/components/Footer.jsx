export default function Footer() {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-light text-center">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0">
            🎬 <strong>IMDb Clone</strong> &copy; {new Date().getFullYear()} — Just for fun.
          </p>
          <div>
            <a href="mailto:support@imdbclone.fake" className="text-light me-3 footer-link">
              📩 Contact Us
            </a>
            <a href="https://en.wikipedia.org/wiki/Cinema_of_India" target="_blank" rel="noreferrer" className="text-light footer-link">
              🎞️ Movie Wiki
            </a>
          </div>
        </div>
      </div>

      {/* Scoped Styles */}
      <style>{`
        .footer {
          box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.3);
        }

        .footer-link {
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #0d6efd;
        }
      `}</style>
    </footer>
  );
}
