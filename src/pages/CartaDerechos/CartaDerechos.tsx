import { useState } from "react";
import SolicitudesTable from "./SolicitudesTable";
import SolicitudForm from "./SolicitudForm";
import SolicitudDetalle from "./SolicitudDetalle";
import type { Solicitud } from "../../types/solicitud";
import { obtenerSolicitudes } from "../../services/solicitudesService";

type Estado = "Pendiente" | "En proceso" | "Resuelta" | "Rechazada";

type NuevaSolicitud = {
  nombreAfiliado: string;
  tipoSolicitud: string;
  descripcion: string;
  numeroDocumento: string;
  observaciones: string;
  estado?: Estado;
};

export default function CartaDerechos() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(() => obtenerSolicitudes());
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [solicitudEditar, setSolicitudEditar] = useState<Solicitud | null>(null);
  const [solicitudVer, setSolicitudVer] = useState<Solicitud | null>(null);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [mostrarError, setMostrarError] = useState(false);

  // ================================
  // CREAR
  // ================================
  const agregarSolicitud = (nueva: NuevaSolicitud) => {
    const nuevaSolicitud: Solicitud = {
      id: solicitudes.length + 1,
      numeroSolicitud: `SOL-${String(solicitudes.length + 1).padStart(3, "0")}`,
      fechaSolicitud: new Date().toISOString().split("T")[0],
      estado: nueva.estado ?? "Pendiente",
      ...nueva
    };

    setSolicitudes(prev => [...prev, nuevaSolicitud]);
    setMostrarFormulario(false);
    mostrarMensajeExito();
  };

  // ================================
  // EDITAR
  // ================================
  const actualizarSolicitud = (actualizada: Solicitud) => {
    setSolicitudes(prev =>
      prev.map(s => (s.id === actualizada.id ? actualizada : s))
    );
    setSolicitudEditar(null);
    mostrarMensajeExito();
  };

  // ================================
  // TOASTS
  // ================================
  const mostrarMensajeExito = () => {
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);
  };

  const mostrarMensajeError = () => {
    setMostrarError(true);
    setTimeout(() => setMostrarError(false), 3000);
  };

  // ================================
  // EXPORTAR CSV
  // ================================
  const exportarCSV = () => {
    const encabezados = ["Número Solicitud", "Tipo", "Afiliado", "Fecha", "Estado"];

    const filas = solicitudes.map(s => [
      s.numeroSolicitud,
      s.tipoSolicitud,
      s.nombreAfiliado,
      s.fechaSolicitud,
      s.estado
    ]);

    const contenido = [encabezados, ...filas]
      .map(fila => fila.join(","))
      .join("\n");

    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "solicitudes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={container}>
      <h1 style={title}>Carta de Derechos y Deberes</h1>

      <div style={barraAcciones}>
      <button
      onClick={() => setMostrarFormulario(true)}
      style={btnPrimario}
      onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      }}
      onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      }}
    >
      + Nueva Solicitud
      </button>
        <button
      onClick={exportarCSV}
      style={btnSecundario}
      onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      }}
      onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      }}
      >
      Exportar CSV
      </button>
      </div>

      <SolicitudesTable
        solicitudes={solicitudes}
        setSolicitudes={setSolicitudes}
        onEditar={setSolicitudEditar}
        onVer={setSolicitudVer}
      />

      <SolicitudForm
        visible={mostrarFormulario || solicitudEditar !== null}
        onClose={() => {
          setMostrarFormulario(false);
          setSolicitudEditar(null);
        }}
        onSave={(data) => {
          try {
            if (solicitudEditar) {
              actualizarSolicitud({ ...solicitudEditar, ...data });
            } else {
              agregarSolicitud(data);
            }
          } catch {
            mostrarMensajeError();
          }
        }}
        solicitudEditar={solicitudEditar}
      />

      <SolicitudDetalle
        visible={solicitudVer !== null}
        solicitud={solicitudVer}
        onClose={() => setSolicitudVer(null)}
      />

      {mostrarToast && (
        <div style={toastExitoStyle}>
          Solicitud guardada correctamente
        </div>
      )}

      {mostrarError && (
        <div style={toastErrorStyle}>
          Error al guardar la solicitud
        </div>
      )}
    </div>
  );
}

// ================================
// ESTILOS
// ================================
const container = {
  padding: "40px 60px",
  maxWidth: "2500px",
  margin: "0 auto"
};

const title = {
  marginBottom: "25px",
  fontWeight: 600,
  letterSpacing: "0.5px",
  color: "#1e3a8a"
};

const barraAcciones = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const btnPrimario = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const btnSecundario = {
  background: "#60a5fa",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const toastBase = {
  position: "fixed" as const,
  bottom: "30px",
  right: "30px",
  padding: "12px 18px",
  borderRadius: "8px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  fontWeight: "bold",
  zIndex: 2000,
  color: "white"
};

const toastExitoStyle = {
  ...toastBase,
  background: "#16a34a"
};

const toastErrorStyle = {
  ...toastBase,
  background: "#dc2626"
};

