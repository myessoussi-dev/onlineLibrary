import { useEffect, useState } from "react";
import { getByAvailable } from "../api/bookApi";
import BookCard from "../components/BookCard";
import BookDetailModal from "../components/BookDetailModal";

export default function Available() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    getByAvailable()
      .then((r) => setBooks(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleUpdated = (updated) => {
    if (!updated.available) {
      setBooks((bs) => bs.filter((b) => b.id !== updated.id));
      setSelected(null);
    } else {
      setBooks((bs) => bs.map((b) => b.id === updated.id ? updated : b));
      setSelected(updated);
    }
  };
  const handleDeleted = (id) => {
    setBooks((bs) => bs.filter((b) => b.id !== id));
    setSelected(null);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Livres disponibles ✅</h1>
          <p>{books.length} livre{books.length !== 1 ? "s" : ""} prêt{books.length !== 1 ? "s" : ""} à emprunter</p>
        </div>
        <button className="btn btn-secondary" onClick={load}>↻ Actualiser</button>
      </div>

      {loading ? (
        <div className="loading-spinner"><div className="spinner" />Chargement…</div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">😔</div>
          <h3>Aucun livre disponible</h3>
          <p>Tous les livres sont actuellement empruntés</p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onClick={setSelected} />
          ))}
        </div>
      )}

      {selected && (
        <BookDetailModal book={selected} onClose={() => setSelected(null)} onUpdated={handleUpdated} onDeleted={handleDeleted} />
      )}
    </div>
  );
}
