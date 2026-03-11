import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import Navbar from "../../components/Navbar";
import ModuleCard from "../../components/ModuleCard";


export default function Dashboard() {

  const { user } = useAuth();
  const [time, setTime] = useState(new Date());
  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000); // cada minuto

    return () => clearInterval(interval);

  }, []);
  return (

    <div>

      <Navbar />

      <div style={{padding:"40px 60px"}}>

        <h1>¡Bienvenido, {user?.name}!</h1>
        <p style={{ color:"#64748b", marginTop:"5px", fontSize:"14px" }}>
  {time.toLocaleString()}
</p>

  <div
  style={{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",
    gap:"25px",
    marginTop:"30px"
  }}

        >

<ModuleCard
  icon="📜"
  title="Carta de Derechos y Deberes"
  description="Consulta la carta oficial del afiliado"
  color="#3b82f6"
  count={12}
  ruta="/carta-derechos"
/>

<ModuleCard
  icon="📄"
  title="Certificado de Afiliación"
  description="Descarga tu certificado de afiliación"
  color="#10b981"
  count={3}
  ruta="/certificados"
/>

<ModuleCard

  icon="🔄"
  title="Solicitud de Portabilidad"
  description="Solicita portabilidad de servicios"
  color="#f59e0b"
  count={5}
  ruta="/portabiliadad"
/>

<ModuleCard
  icon="📨"
  title="PQR Recepcionado"
  description="Consulta tus peticiones, quejas o reclamos"
  color="#ef4444"
  count={2}
  ruta="/pqr"
/>

        </div>

      </div>

    </div>
  );
}