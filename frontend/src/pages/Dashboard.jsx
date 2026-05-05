import { useEffect, useState } from "react";
import { getBooks } from "../api/bookApi";
import BookCard from "../components/BookCard";
import BookDetailModal from "../components/BookDetailModal";
import AddBookModal from "../components/AddBookModal";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const load = () => {
    setLoading(true);
    getBooks()
      .then((r) => setBooks(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const available   = books.filter((b) => b.available);
  const recent      = [...books].slice(-8).reverse();
  const categories  = [...new Set(books.map((b) => b.categoryName).filter(Boolean))];

  const handleUpdated = (updated) => {
    setBooks((bs) => bs.map((b) => b.id === updated.id ? updated : b));
    setSelected(updated);
  };
  const handleDeleted = (id) => {
    setBooks((bs) => bs.filter((b) => b.id !== id));
    setSelected(null);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>
            Découvrir 
            <img 
              src="/book_library.ico" 
              alt="" 
              style={{ width: '32px', height: '32px', marginLeft: '10px', verticalAlign: 'middle' }} 
            />
          </h1>
          <p>Gérez et explorez votre collection</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          + Ajouter un livre
        </button>
      </div>

      {!loading && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">📚</div>
            <div><div className="stat-value">{books.length}</div><div className="stat-label">Total livres</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <div><div className="stat-value">{available.length}</div><div className="stat-label">Disponibles</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon yellow">📖</div>
            <div><div className="stat-value">{books.length - available.length}</div><div className="stat-label">Empruntés</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">🏷️</div>
            <div><div className="stat-value">{categories.length}</div><div className="stat-label">Catégories</div></div>
          </div>
        </div>
      )}

      <div className="section">
        <div className="section-header">
          <h2>Ajouts récents</h2>
          <Link className="see-all" to="/library">Voir tout →</Link>
        </div>
        {loading ? (
          <div className="loading-spinner"><div className="spinner" />Chargement…</div>
        ) : recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>Aucun livre</h3>
            <p>Ajoutez votre premier livre</p>
          </div>
        ) : (
          <div className="books-grid-4">
            {recent.map((book) => (
              <BookCard key={book.id} book={book} onClick={setSelected} />
            ))}
          </div>
        )}
      </div>

      {!loading && categories.length > 0 && (
        <div className="section">
          <div className="section-header"><h2>Catégories</h2></div>
          <div className="category-tags">
            {categories.map((cat) => (
              <span key={cat} className="category-tag">{cat}</span>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <BookDetailModal book={selected} onClose={() => setSelected(null)} onUpdated={handleUpdated} onDeleted={handleDeleted} />
      )}
      {showAdd && (
        <AddBookModal onClose={() => setShowAdd(false)} onAdded={(b) => setBooks((bs) => [...bs, b])} />
      )}
    </div>
  );
}
