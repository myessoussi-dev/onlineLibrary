import { useState } from "react";
import { createPortal } from "react-dom";
import { updateBook, deleteBook } from "../api/bookApi";

export default function BookDetailModal({ book, onClose, onUpdated, onDeleted }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title:        book.title        || "",
    description:  book.description  || "",
    authorName:   book.authorName   || "",
    categoryName: book.categoryName || "",
    available:    book.available    ?? true,
    imageUrl:     book.imageUrl     || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateBook(book.id, form);
      onUpdated({ ...book, ...form });
      //setEditing(false);
      onClose();
    } catch {
      alert("Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Supprimer "${book.title}" ?`)) return;
    setLoading(true);
    try {
      await deleteBook(book.id);
      onDeleted(book.id);
    } catch {
      alert("Erreur lors de la suppression.");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="bb-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bb-modal">
        <div className="modal-header">
          <h2>{editing ? "✏️ Modifier" : "📖 Détails"}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {!editing ? (
          <>
            <div className="book-detail-content">
              {/* Cover */}
              <div className="book-detail-cover">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", borderRadius: 10, display: "block" }}
                    onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                  />
                ) : null}
                <div className="book-detail-cover-placeholder" style={{ display: book.imageUrl ? "none" : "flex" }}>
                  📖
                </div>
              </div>

              {/* Info */}
              <div className="book-detail-info">
                <div className="book-detail-title">{book.title}</div>
                <div className="book-detail-author">par {book.authorName}</div>

                <div className="book-detail-badges" style={{ marginBottom: 12 }}>
                  <span className={`badge ${book.available ? "badge-available" : "badge-unavailable"}`}>
                    {book.available ? "✓ Disponible" : "✗ Indisponible"}
                  </span>
                  {book.categoryName && (
                    <span className="badge badge-category">{book.categoryName}</span>
                  )}
                </div>

                <div className="book-meta">
                  <div className="book-meta-item">
                    <label>ID</label>
                    <span>#{book.id}</span>
                  </div>
                  {book.categoryName && (
                    <div className="book-meta-item">
                      <label>Catégorie</label>
                      <span>{book.categoryName}</span>
                    </div>
                  )}
                </div>

                {book.description && (
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginTop: 8 }}>
                    {book.description}
                  </p>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>✏️ Modifier</button>
              <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={loading}>🗑 Supprimer</button>
              <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ marginLeft: "auto" }}>Fermer</button>
            </div>
          </>
        ) : (
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label>Titre</label>
                <input name="title" value={form.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Auteur</label>
                <input name="authorName" value={form.authorName} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Catégorie</label>
                <input name="categoryName" value={form.categoryName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} style={{ resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="btn btn-primary" onClick={handleUpdate} disabled={loading}>
                {loading ? "Sauvegarde…" : "💾 Sauvegarder"}
              </button>
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>Annuler</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
