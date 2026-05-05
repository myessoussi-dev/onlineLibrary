import { useState } from "react";
import { getBooks } from "../api/bookApi";

/* ── Toggle Switch ── */
function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 99,
        background: value ? "var(--accent)" : "#d1d5db",
        position: "relative", cursor: "pointer", flexShrink: 0,
        transition: "background 0.22s ease",
        boxShadow: value ? "0 0 0 3px rgba(79,142,247,0.18)" : "none",
      }}
    >
      <div style={{
        position: "absolute", top: 3,
        left: value ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
        transition: "left 0.22s cubic-bezier(0.34,1.4,0.64,1)",
      }} />
    </div>
  );
}

/* ── Section Card ── */
function SettingsCard({ icon, title, description, children }) {
  return (
    <div style={{
      background: "var(--card-bg)",
      borderRadius: "var(--radius)",
      border: "1.5px solid var(--border)",
      boxShadow: "var(--shadow)",
      overflow: "hidden",
      marginBottom: 20,
    }}>
      <div style={{
        padding: "18px 24px 16px",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "var(--accent-light)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 17, flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.2px" }}>
            {title}
          </div>
          {description && (
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>{description}</div>
          )}
        </div>
      </div>
      <div style={{ padding: "8px 0" }}>{children}</div>
    </div>
  );
}

/* ── Settings Row ── */
function SettingsRow({ label, description, children, danger }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px",
        borderBottom: "1px solid var(--border)",
        gap: 20, transition: "background 0.15s",
        cursor: "default",
      }}
      onMouseEnter={e => e.currentTarget.style.background = danger ? "#fff5f5" : "var(--bg)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: danger ? "var(--danger)" : "var(--text-primary)" }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.4 }}>
            {description}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

const AVATARS = ["🧑‍💻", "👩‍🎓", "🧑‍🏫", "👨‍💼", "🧙", "🦸"];

export default function Settings() {
  const [profile, setProfile]           = useState({ name: "Admin", email: "admin@bookbase.com", avatar: "🧑‍💻" });
  const [profileDraft, setProfileDraft] = useState({ name: "Admin", email: "admin@bookbase.com", avatar: "🧑‍💻" });
  const [editingProfile, setEditingProfile] = useState(false);
  const [notifications, setNotifications]  = useState({ newBook: true, borrowed: true, returned: false, weekly: true });
  const [display, setDisplay]           = useState({ compactTable: false, showCovers: true, animations: true });
  const [theme, setTheme]               = useState("light");
  const [language, setLanguage]         = useState("fr");
  const [saved, setSaved]               = useState(false);

  function showSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleSaveProfile() {
    setProfile({ ...profileDraft });
    setEditingProfile(false);
    showSaved();
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>⚙️ Paramètres</h1>
          <p>Gérez votre compte et vos préférences</p>
        </div>
      </div>

      {/* Toast */}
      {saved && (
        <div style={{
          position: "fixed", bottom: 28, right: 28,
          background: "var(--success)", color: "#fff",
          padding: "12px 20px", borderRadius: 10,
          fontSize: 14, fontWeight: 600,
          boxShadow: "0 8px 24px rgba(16,185,129,0.3)",
          display: "flex", alignItems: "center", gap: 8,
          zIndex: 9999, animation: "slideUp 0.3s ease",
        }}>
          ✓ Modifications sauvegardées
        </div>
      )}

      {/* ── Profil ── */}
      <SettingsCard icon="👤" title="Profil" description="Vos informations personnelles">

        {/* Avatar + info */}
        <div style={{
          padding: "20px 24px",
          display: "flex", alignItems: "center", gap: 18,
          borderBottom: "1px solid var(--border)",
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "linear-gradient(135deg,#e8f0fe,#c7d7fd)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 30, flexShrink: 0,
            border: "3px solid var(--accent-light)",
            boxShadow: "0 4px 14px rgba(79,142,247,0.15)",
          }}>
            {profile.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "var(--text-primary)" }}>
              {profile.name}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{profile.email}</div>
            <span style={{
              display: "inline-block", marginTop: 7,
              background: "var(--accent-light)", color: "var(--accent)",
              fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
            }}>
              Bibliothécaire
            </span>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setProfileDraft({ ...profile }); setEditingProfile(!editingProfile); }}
          >
            {editingProfile ? "Annuler" : "✏️ Modifier"}
          </button>
        </div>

        {/* Edit form */}
        {editingProfile && (
          <div style={{ padding: "20px 24px", background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>

            {/* Avatar picker */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", marginBottom: 8 }}>
                Choisir un avatar
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {AVATARS.map(a => (
                  <div
                    key={a}
                    onClick={() => setProfileDraft(d => ({ ...d, avatar: a }))}
                    style={{
                      width: 42, height: 42, borderRadius: "50%",
                      background: profileDraft.avatar === a ? "var(--accent-light)" : "#f3f4f6",
                      border: `2px solid ${profileDraft.avatar === a ? "var(--accent)" : "transparent"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, cursor: "pointer",
                      transition: "all 0.18s",
                      boxShadow: profileDraft.avatar === a ? "0 0 0 3px rgba(79,142,247,0.18)" : "none",
                    }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-row" style={{ marginBottom: 14 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label>Nom</label>
                <input value={profileDraft.name} onChange={e => setProfileDraft(d => ({ ...d, name: e.target.value }))} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label>Email</label>
                <input type="email" value={profileDraft.email} onChange={e => setProfileDraft(d => ({ ...d, email: e.target.value }))} />
              </div>
            </div>

            <button className="btn btn-primary btn-sm" onClick={handleSaveProfile}>
              💾 Sauvegarder
            </button>
          </div>
        )}

        <SettingsRow label="Langue" description="Langue d'affichage de l'interface">
          <select
            value={language}
            onChange={e => { setLanguage(e.target.value); showSaved(); }}
            style={{
              padding: "7px 12px", border: "1.5px solid var(--border)",
              borderRadius: 8, fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              background: "var(--card-bg)", color: "var(--text-primary)",
              cursor: "pointer", outline: "none",
            }}
          >
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
            <option value="ar">🇹🇳 العربية</option>
          </select>
        </SettingsRow>

      </SettingsCard>

      {/* ── Apparence ── */}
      <SettingsCard icon="🎨" title="Apparence" description="Thème et affichage visuel">

        <SettingsRow label="Thème" description="Apparence générale de l'application">
          <div style={{ display: "flex", gap: 7 }}>
            {[{ val: "light", label: "☀️ Clair" }, { val: "dark", label: "🌙 Sombre" }, { val: "auto", label: "💻 Auto" }].map(t => (
              <button
                key={t.val}
                onClick={() => { setTheme(t.val); showSaved(); }}
                style={{
                  padding: "6px 13px", borderRadius: 50,
                  border: theme === t.val ? "2px solid var(--accent)" : "1.5px solid var(--border)",
                  background: theme === t.val ? "var(--accent-light)" : "var(--card-bg)",
                  color: theme === t.val ? "var(--accent)" : "var(--text-secondary)",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.18s",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </SettingsRow>

        <SettingsRow label="Table compacte" description="Réduit la hauteur des lignes dans My Library">
          <Toggle value={display.compactTable} onChange={v => { setDisplay(d => ({ ...d, compactTable: v })); showSaved(); }} />
        </SettingsRow>

        <SettingsRow label="Afficher les couvertures" description="Miniatures des livres dans les listes">
          <Toggle value={display.showCovers} onChange={v => { setDisplay(d => ({ ...d, showCovers: v })); showSaved(); }} />
        </SettingsRow>

        <SettingsRow label="Animations" description="Transitions et effets visuels">
          <Toggle value={display.animations} onChange={v => { setDisplay(d => ({ ...d, animations: v })); showSaved(); }} />
        </SettingsRow>

      </SettingsCard>

      {/* ── Notifications ── */}
      <SettingsCard icon="🔔" title="Notifications" description="Ce que vous souhaitez recevoir">

        <SettingsRow label="Nouveau livre ajouté" description="Alerte lors de l'ajout d'un nouveau livre">
          <Toggle value={notifications.newBook} onChange={v => { setNotifications(n => ({ ...n, newBook: v })); showSaved(); }} />
        </SettingsRow>

        <SettingsRow label="Livre emprunté" description="Notification lors d'un emprunt">
          <Toggle value={notifications.borrowed} onChange={v => { setNotifications(n => ({ ...n, borrowed: v })); showSaved(); }} />
        </SettingsRow>

        <SettingsRow label="Retour de livre" description="Notification lors d'un retour">
          <Toggle value={notifications.returned} onChange={v => { setNotifications(n => ({ ...n, returned: v })); showSaved(); }} />
        </SettingsRow>

        <SettingsRow label="Rapport hebdomadaire" description="Résumé de la semaine par email">
          <Toggle value={notifications.weekly} onChange={v => { setNotifications(n => ({ ...n, weekly: v })); showSaved(); }} />
        </SettingsRow>

      </SettingsCard>

      {/* ── Données ── */}
      <SettingsCard icon="🗄️" title="Données" description="Exportez votre collection">

        <SettingsRow label="Exporter la collection" description="Télécharger tous les livres au format JSON">
          <button
            className="btn btn-secondary btn-sm"
            onClick={async () => {
                    try {
                      // 1. Récupération de la liste
                      const response = await getBooks();
                      const booksList=response.data;
                      // 2. On crée un objet qui regroupe la date ET les livres
                      const dataToExport = {
                        date_exportation: new Date().toLocaleString(), // Ajoute la date lisible
                        total_livres: booksList.length,                // Optionnel : le nombre de livres
                        donnees: booksList                             // Ta liste de livres
                      };

                      // 3. On transforme cet objet global en texte
                      const data = JSON.stringify(dataToExport, null, 2);

                      // 4. Téléchargement
                      const blob = new Blob([data], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      
                      // Astuce : On met aussi la date dans le NOM du fichier
                      const dateFichier = new Date().toISOString().split('T')[0]; 
                      a.download = `export-bookbase-${dateFichier}.json`;
                      
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                      
                    } catch (error) {
                      console.error(error);
                    }
                  }}
          >
            ⬇️ Exporter JSON
          </button>
        </SettingsRow>

        <SettingsRow label="Sauvegarde automatique" description="Sauvegarde locale toutes les heures">
          <Toggle value={true} onChange={showSaved} />
        </SettingsRow>

      </SettingsCard>

      {/* ── Danger zone ── */}
      <SettingsCard icon="⚠️" title="Zone de danger" description="Actions irréversibles">

        <SettingsRow label="Réinitialiser les préférences" description="Remet tous les paramètres par défaut" danger>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (!window.confirm("Réinitialiser tous les paramètres ?")) return;
              setNotifications({ newBook: true, borrowed: true, returned: false, weekly: true });
              setDisplay({ compactTable: false, showCovers: true, animations: true });
              setTheme("light"); setLanguage("fr");
              showSaved();
            }}
          >
            🔄 Réinitialiser
          </button>
        </SettingsRow>

        <SettingsRow label="Se déconnecter" description="Fermer votre session en cours" danger>
          <button className="btn btn-danger btn-sm">
            🚪 Déconnexion
          </button>
        </SettingsRow>

      </SettingsCard>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "4px 0 36px", fontSize: 12, color: "var(--text-muted)" }}>
        BookBase v1.0.0
      </div>

    </div>
  );
}
