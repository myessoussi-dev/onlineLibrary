import { useState } from "react";
import { createPortal } from "react-dom";
import { addBook } from "../api/bookApi";

const EMPTY = { title: "", description: "", authorName: "", categoryName: "",imageUrl: "" };

export default function AddBookModal({ onClose, onAdded }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.authorName.trim()) {
      setError("Le titre et l'auteur sont obligatoires.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await addBook(form);
      onAdded(res.data);
      onClose();
    } catch {
      setError("Erreur lors de l'ajout. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="bb-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bb-modal">
        <div className="modal-header">
          <h2>➕ Ajouter un livre</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {error && (
            <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
              {error}
            </div>
          )}
          <div className="form-row">
            <div className="form-group">
              <label>Titre *</label>
              <input name="title" placeholder="Titre du livre" value={form.title} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Auteur *</label>
              <input name="authorName" placeholder="Nom de l'auteur" value={form.authorName} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Catégorie</label>
              <input name="categoryName" placeholder="ex: Fiction, Science…" value={form.categoryName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input name="imageUrl" placeholder="https://…" value={form.imageUrl} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Résumé du livre…" value={form.description} onChange={handleChange} rows={3} style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Ajout…" : "➕ Ajouter"}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
