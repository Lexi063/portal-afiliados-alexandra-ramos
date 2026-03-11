import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";


export default function Login() {

  const navigate = useNavigate();
  const { login, user } = useAuth();
  useEffect(() => {
  if (user) {
    navigate("/dashboard");
  }
}, [user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setErrorEmail("");
    setErrorPassword("");
    setAlert("");

    if (!email) {
      setErrorEmail("El correo es obligatorio");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorEmail("Correo electrónico no válido");
      return;
    }

    if (!password) {
      setErrorPassword("La contraseña es obligatoria");
      return;
    }

    setLoading(true);

    setTimeout(() => {

      if (email === "afiliado@prueba.com" && password === "Prueba2024*") {

        login("Alex",email);
        navigate("/dashboard");

      } else {

        setAlert("Credenciales incorrectas. Inténtalo de nuevo");

      }

      setLoading(false);

    }, 1000);
  };

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#f1f5f9"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          background:"white",
          padding:"40px",
          borderRadius:"10px",
          boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
          width:"320px"
        }}
      >

        <h2 style={{textAlign:"center"}}>Portal Afiliados</h2>

        {alert && (
          <p style={{color:"red"}}>{alert}</p>
        )}

        <input
  type="email"
  placeholder="Correo"
  value={email}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
  style={{ width:"100%", padding:"10px", marginTop:"10px", borderRadius:"6px", border:"1px solid #ccc" }}
/>

        {errorEmail && (
          <p style={{color:"red"}}>{errorEmail}</p>
        )}

        <div style={{marginTop:"10px"}}>

          <input
  type={showPassword ? "text" : "password"}
  placeholder="Contraseña"
  value={password}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
  style={{ flex:1, width:"80%", padding:"10px", marginTop:"10px", borderRadius:"6px", border:"1px solid #ccc" }}
/>

          <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
          >
            👁
          </button>

        </div>

        {errorPassword && (
          <p style={{color:"red"}}>{errorPassword}</p>
        )}

        <button
  type="submit"
  disabled={loading}
  style={{
    marginTop:"20px",
    width:"100%",
    padding:"10px",
    background:"#2563eb",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  }}
>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

      </form>

    </div>
  );
}