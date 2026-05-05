import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

const GeoBg = () => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="-30" y="-30" width="120" height="120" rx="18" fill="none" stroke="#e5e7eb" strokeWidth="1" transform="rotate(18 30 30)" />
    <rect x="72%" y="3%" width="90" height="90" rx="12" fill="none" stroke="#e5e7eb" strokeWidth="1" transform="rotate(-12 76% 8%)" />
    <rect x="78%" y="72%" width="140" height="140" rx="20" fill="none" stroke="#e5e7eb" strokeWidth="0.8" transform="rotate(30 85% 79%)" />
    <rect x="-5%" y="68%" width="100" height="100" rx="14" fill="none" stroke="#e5e7eb" strokeWidth="1" transform="rotate(-22 -1% 73%)" />
    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 8" />
    <circle cx="50%" cy="50%" r="260" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
    <circle cx="50%" cy="50%" r="180" fill="none" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="5" height="12" rx="1" fill="white" />
    <rect x="9" y="2" width="5" height="12" rx="1" fill="white" opacity="0.6" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
    <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.101-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const styles = {
  page: { minHeight: "100vh", background: "#f8f8f6", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", position: "relative", overflow: "hidden", fontFamily: "'DM Sans', system-ui, sans-serif" },
  container: { width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 },
  header: { textAlign: "center", marginBottom: "2rem" },
  logoRow: { display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" },
  logoBox: { width: "32px", height: "32px", background: "#111", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: "18px", fontWeight: "500", color: "#111", letterSpacing: "-0.02em" },
  tagline: { fontSize: "11px", color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 },
  card: { background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: "12px", padding: "2rem" },
  tabRow: { display: "flex", border: "0.5px solid #e5e7eb", borderRadius: "8px", marginBottom: "1.75rem", overflow: "hidden" },
  tabActive: { flex: 1, padding: "9px", fontSize: "13px", fontWeight: "500", border: "none", cursor: "pointer", background: "#111", color: "#fff", borderRadius: "0" },
  tabInactive: { flex: 1, padding: "9px", fontSize: "13px", fontWeight: "400", border: "none", cursor: "pointer", background: "transparent", color: "#6b7280", borderRadius: "0" },
  label: { display: "block", fontSize: "11px", color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" },
  input: { width: "100%", padding: "10px 12px", fontSize: "14px", border: "0.5px solid #e5e7eb", borderRadius: "8px", outline: "none", background: "#fff", color: "#111", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" },
  fieldWrap: { marginBottom: "1rem" },
  forgotRow: { textAlign: "right", marginBottom: "1.5rem" },
  forgotLink: { fontSize: "12px", color: "#6b7280", textDecoration: "none", cursor: "pointer" },
  btnPrimary: { width: "100%", padding: "10px", fontSize: "14px", fontWeight: "500", background: "#111", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", letterSpacing: "-0.01em", fontFamily: "inherit" },
  btnDisabled: { width: "100%", padding: "10px", fontSize: "14px", fontWeight: "500", background: "#6b7280", color: "#fff", border: "none", borderRadius: "8px", cursor: "not-allowed", letterSpacing: "-0.01em", fontFamily: "inherit" },
  divider: { display: "flex", alignItems: "center", gap: "12px", margin: "1.25rem 0" },
  dividerLine: { flex: 1, height: "0.5px", background: "#e5e7eb" },
  dividerText: { fontSize: "11px", color: "#d1d5db", letterSpacing: "0.06em" },
  socialGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" },
  btnSocial: { padding: "9px", fontSize: "12px", color: "#6b7280", background: "#f9fafb", border: "0.5px solid #e5e7eb", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontWeight: "400", fontFamily: "inherit" },
  errorBox: { background: "#fef2f2", border: "0.5px solid #fca5a5", borderRadius: "8px", padding: "10px 12px", marginBottom: "1rem", fontSize: "13px", color: "#dc2626" },
  successBox: { background: "#f0fdf4", border: "0.5px solid #86efac", borderRadius: "8px", padding: "10px 12px", marginBottom: "1rem", fontSize: "13px", color: "#16a34a" },
  termsText: { fontSize: "11px", color: "#9ca3af", textAlign: "center", marginTop: "1rem", lineHeight: "1.6" },
  termsLink: { color: "#6b7280", textDecoration: "none" },
  footer: { display: "flex", justifyContent: "center", gap: "24px", marginTop: "1.25rem" },
  footerLink: { fontSize: "11px", color: "#9ca3af", textDecoration: "none", letterSpacing: "0.04em" },
};

export default function LibraioLogin({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ login: "", email: "", password: "" });

  const inputStyle = (id) => ({
    ...styles.input,
    borderColor: focusedInput === id ? "#111" : "#e5e7eb",
  });

const handleLogin = async () => {
  setError("");
  setLoading(false); // 👈 reset au début
  if (!loginForm.email || !loginForm.password) {
    setError("Please fill in all fields.");
    return;
  }
  setLoading(true);
  try {
    await loginUser(loginForm);
    onLogin && onLogin();
  } catch (err) {
    setError(err.response?.data?.message || err.message || "Login failed.");
  } finally {
    setLoading(false); // 👈 et dans le finally
  }
};

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    if (!registerForm.login || !registerForm.email || !registerForm.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await registerUser(registerForm);
      setSuccess("Account created! You can now sign in.");
      setRegisterForm({ login: "", email: "", password: "" });
      setTimeout(() => { setTab("login"); setSuccess(""); }, 1500);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t) => { setTab(t); setError(""); setSuccess(""); };

  return (
    <div style={styles.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <GeoBg />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logoRow}>
            <div style={styles.logoBox}><BookIcon /></div>
            <span style={styles.logoText}>OnlineLibrary</span>
          </div>
          <p style={styles.tagline}>Your digital reading space</p>
        </div>

        <div style={styles.card}>
          <div style={styles.tabRow}>
            <button style={tab === "login" ? styles.tabActive : styles.tabInactive} onClick={() => switchTab("login")}>Sign in</button>
            <button style={tab === "register" ? styles.tabActive : styles.tabInactive} onClick={() => switchTab("register")}>Create account</button>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}
          {success && <div style={styles.successBox}>{success}</div>}

          {tab === "login" && (
            <div>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  style={inputStyle("email-login")}
                  onFocus={() => setFocusedInput("email-login")}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  style={inputStyle("pass-login")}
                  onFocus={() => setFocusedInput("pass-login")}
                  onBlur={() => setFocusedInput(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <div style={styles.forgotRow}>
                <a href="#" style={styles.forgotLink}>Forgot password?</a>
              </div>
              <button style={loading ? styles.btnDisabled : styles.btnPrimary} onClick={handleLogin} disabled={loading}>
                {loading ? "Signing in..." : "Sign in →"}
              </button>

              <div style={styles.divider}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>or</span>
                <div style={styles.dividerLine} />
              </div>

              <div style={styles.socialGrid}>
                <button style={styles.btnSocial}><GoogleIcon /> Google</button>
                <button style={styles.btnSocial}><FacebookIcon /> Facebook</button>
              </div>
            </div>
          )}

          {tab === "register" && (
            <div>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  placeholder="jean_dupont"
                  value={registerForm.login}
                  onChange={(e) => setRegisterForm({ ...registerForm, login: e.target.value })}
                  style={inputStyle("login-reg")}
                  onFocus={() => setFocusedInput("login-reg")}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  style={inputStyle("email-reg")}
                  onFocus={() => setFocusedInput("email-reg")}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div style={{ ...styles.fieldWrap, marginBottom: "1.5rem" }}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  style={inputStyle("pass-reg")}
                  onFocus={() => setFocusedInput("pass-reg")}
                  onBlur={() => setFocusedInput(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
              </div>
              <button style={loading ? styles.btnDisabled : styles.btnPrimary} onClick={handleRegister} disabled={loading}>
                {loading ? "Creating account..." : "Create account →"}
              </button>
              <p style={styles.termsText}>
                By creating an account you agree to our{" "}
                <a href="#" style={styles.termsLink}>terms</a> and{" "}
                <a href="#" style={styles.termsLink}>privacy policy</a>.
              </p>
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <a href="#" style={styles.footerLink}>Browse catalog</a>
          <a href="#" style={styles.footerLink}>Help</a>
          <a href="#" style={styles.footerLink}>Privacy</a>
        </div>
      </div>
    </div>
  );
}
