import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  setTimeout(() => {
    login("Alex", email);
    navigate("/dashboard");
  }, 800);
};

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={card}>
        <h1 style={title}>Portal de Afiliados</h1>
        <p style={subtitle}>Accede a tu cuenta</p>

        <div style={inputGroup}>
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={input}
            required
          />
        </div>

        <div style={inputGroup}>
          <label>Contraseña</label>
          <div style={passwordWrapper}>
            <input
              type={mostrar ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...input, paddingRight: "40px" }}
              required
            />
            <span onClick={() => setMostrar(!mostrar)} style={eyeButton}>
              {mostrar ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        <button
  type="submit"
  style={button}
  onMouseOver={(e) => {
    e.currentTarget.style.opacity = "0.9";
    e.currentTarget.style.transform = "scale(1.02)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.opacity = "1";
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  {loading ? "Ingresando..." : "Iniciar sesión"}
</button>
          </form>
          </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #2563eb, #1e3a8a)"
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "14px",
  width: "380px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column" as const,
  gap: "20px"
};

const title = {
  fontSize: "24px",
  fontWeight: 700,
  textAlign: "center" as const
};

const subtitle = {
  textAlign: "center" as const,
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "10px"
};

const inputGroup = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px",
  fontSize: "14px"
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none"
};

const passwordWrapper = {
  position: "relative" as const,
  display: "flex",
  alignItems: "center"
};

const eyeButton = {
  position: "absolute" as const,
  right: "12px",
  cursor: "pointer",
  color: "#64748b",
  fontSize: "18px"
};

const button = {
  marginTop: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: "15px"
};