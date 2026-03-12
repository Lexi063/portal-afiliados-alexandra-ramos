import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div style={navbar}>
      <h2 style={{fontWeight:600, letterSpacing:"0.5px"}}>Portal de Afiliados</h2>

      <div style={rightSection}>
        <span style={userName}>👤 {user?.name}</span>

        <button
      onClick={handleLogout}
      style={logoutBtn}
      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <FiLogOut />
      Cerrar sesión
    </button>
      </div>
    </div>
  );
}

const navbar = {
  background: "linear-gradient(90deg, #1e40af, #ffffff)",
  color: "white",
  padding: "16px 50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
};


const rightSection = {
  display: "flex",
  gap: "18px",
  alignItems: "center"
};

const userName = {
  fontSize: "14px",
  opacity: 0.9
};

const logoutBtn = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  background: "white",
  color: "#1e40af",
  border: "none",
  padding: "9px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "13px",
  transition: "all 0.2s ease"
};