import { useEffect, useState, useCallback } from "react";
import { getBooks, searchByTitle, searchByAuthor } from "../api/bookApi";
import BookDetailModal from "../components/BookDetailModal";
import AddBookModal from "../components/AddBookModal";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
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

  const handleSearch = useCallback(async () => {
    if (!query.trim()) { load(); return; }
    setLoading(true);
    try {
      const res = searchType === "title"
        ? await searchByTitle(query)
        : await searchByAuthor(query);
      setBooks(res.data);
    } catch { setBooks([]); }
    finally { setLoading(false); }
  }, [query, searchType]);

  useEffect(() => {
    const t = setTimeout(handleSearch, 350);
    return () => clearTimeout(t);
  }, [handleSearch]);

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
          <h1>Ma Bibliothèque 📖</h1>
          <p>{books.length} livre{books.length !== 1 ? "s" : ""} dans la collection</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="search-bar">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              placeholder={`Rechercher par ${searchType === "title" ? "titre" : "auteur"}…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="title">Titre</option>
              <option value="author">Auteur</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Ajouter</button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner"><div className="spinner" />Chargement…</div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Aucun livre trouvé</h3>
          <p>Essayez une autre recherche ou ajoutez un livre</p>
        </div>
      ) : (
        <div className="book-table">
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Catégorie</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} onClick={() => setSelected(book)}>
                  <td>
                    {book.imageUrl ? (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="table-book-cover"
                        onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                      />
                    ) : null}
                    <div className="table-book-cover-placeholder" style={{ display: book.imageUrl ? "none" : "flex" }}>📖</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{book.title}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{book.authorName}</td>
                  <td>
                    {book.categoryName && (
                      <span className="badge badge-category">{book.categoryName}</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${book.available ? "badge-available" : "badge-unavailable"}`}>
                      {book.available ? "Disponible" : "Emprunté"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
