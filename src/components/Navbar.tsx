import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // limpia estado global
    navigate("/login"); // redirige
  };

  return (
    <div style={{
      background:"#2563eb",
      color:"white",
      padding:"15px 40px",
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center"
    }}>
      <h2>Portal de Afiliados</h2>

      <div style={{display:"flex", gap:"15px", alignItems:"center"}}>
        <span>{user?.name}</span>
        <button
          onClick={handleLogout}
          style={{
            background:"white",
            color:"#2563eb",
            border:"none",
            padding:"8px 12px",
            borderRadius:"6px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}