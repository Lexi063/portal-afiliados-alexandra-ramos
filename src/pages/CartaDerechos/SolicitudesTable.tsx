import { useState } from "react";
import type { Solicitud } from "../../types/solicitud";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

type Props = {
  solicitudes: Solicitud[];
  setSolicitudes: React.Dispatch<React.SetStateAction<Solicitud[]>>;
  onEditar: React.Dispatch<React.SetStateAction<Solicitud | null>>;
  onVer: React.Dispatch<React.SetStateAction<Solicitud | null>>;
};

export default function SolicitudesTable({
  solicitudes,
  setSolicitudes,
  onEditar,
  onVer
}: Props) {

  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [solicitudAEliminar, setSolicitudAEliminar] = useState<number | null>(null);

  // FILTRADO
  const solicitudesFiltradas = solicitudes.filter(s =>
    (s.numeroSolicitud.toLowerCase().includes(busqueda.toLowerCase()) ||
    s.nombreAfiliado.toLowerCase().includes(busqueda.toLowerCase())) &&
    (estadoFiltro ? s.estado === estadoFiltro : true)
  );

  // PAGINACIÓN
  const totalPaginas = Math.ceil(solicitudesFiltradas.length / registrosPorPagina);
  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimero = indiceUltimo - registrosPorPagina;
  const solicitudesPagina = solicitudesFiltradas.slice(indicePrimero, indiceUltimo);

  // ELIMINAR
  const confirmarEliminar = (id: number) => {
    setSolicitudAEliminar(id);
    setMostrarConfirmacion(true);
  };

  const eliminarSolicitud = () => {
    if (solicitudAEliminar !== null) {
      setSolicitudes(prev => prev.filter(s => s.id !== solicitudAEliminar));
    }
    setMostrarConfirmacion(false);
    setSolicitudAEliminar(null);
  };

  // ESTILOS
  const btnAzul = { background:"#3b82f6", color:"white", border:"none", padding:"6px 10px", borderRadius:"6px", cursor:"pointer"};
  const btnVerde = { background:"#22c55e", color:"white", border:"none", padding:"6px 10px", borderRadius:"6px", cursor:"pointer" };
  const btnRojo = { background:"#ef4444", color:"white", border:"none", padding:"6px 10px", borderRadius:"6px", cursor:"pointer" };

  return (
    <div style={{ marginTop: "30px" }}>

  {/* FILTROS */}
  <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
    <input
    placeholder="🔍 Buscar por número o afiliado..."
    value={busqueda}
    onChange={(e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
    }}
    style={{ padding:"10px", width:"280px", borderRadius:"8px", border:"1px solid #cbd5e1" }}
      />

    <select
    value={estadoFiltro}
    onChange={(e) => {
    setEstadoFiltro(e.target.value);
    setPaginaActual(1);
    }}
    style={{ padding:"10px", borderRadius:"8px", border:"1px solid #cbd5e1",  }}
    >
    <option value="">Todos los estados</option>
    <option value="Pendiente">Pendiente</option>
    <option value="En proceso">En proceso</option>
    <option value="Resuelta">Resuelta</option>
    <option value="Rechazada">Rechazada</option>
    </select>
    </div>

    {/* ESTADO VACÍO */}
    {solicitudesFiltradas.length === 0 ? (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
    <h3> No hay solicitudes</h3>
    <p>Crea una nueva solicitud para comenzar</p>
    </div>
    ) : (
    <>
    {/* TABLA */}
    <table width="100%" cellPadding={10} style={tabla}>
      <thead style={headerTabla}>
        <tr>
          <th style={celda}>N° Solicitud</th>
          <th style={celda}>Tipo</th>
          <th style={celda}>Afiliado</th>
          <th style={celda}>Fecha</th>
          <th style={celda}>Estado</th>
          <th style={celda}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {solicitudesPagina.map(s => (
                <tr
                  key={s.id}
                  style={{
                    transition: "background 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td style={celda}> {s.numeroSolicitud}</td>
                  <td style={celda}> {s.tipoSolicitud}</td>
                  <td style={celda}>{s.nombreAfiliado}</td>
                  <td style={celda}>
                  {new Date(s.fechaSolicitud).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                }).replace(/\//g, "-")}
                </td>

                  <td style={{ textAlign: "center" }}>
                  <span
                  style={{
              padding: "6px 14px",
              borderRadius: "20px",
              color: "white",
              fontSize: "12px",
              fontWeight: 600,
              display: "inline-block",
              background:
                s.estado === "Pendiente" ? "#facc15" :
                s.estado === "En proceso" ? "#3b82f6" :
                s.estado === "Resuelta" ? "#22c55e" :
                "#ef4444"
                }}
              >
                {s.estado}
              </span>
            </td>

<td>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "6px"
    }}
  >
    <button
      style={{
        ...btnAzul,
        padding: "5px 10px",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.2s ease"
      }}
      onClick={() => onVer(s)}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <FiEye size={14} />
      Ver
    </button>

    <button
      style={{
        ...btnVerde,
        padding: "5px 10px",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.2s ease"
      }}
      onClick={() => onEditar(s)}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <FiEdit size={14} />
      Editar
    </button>

    <button
      style={{
        ...btnRojo,
        padding: "5px 10px",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.2s ease"
      }}
      onClick={() => confirmarEliminar(s.id)}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <FiTrash2 size={14} />
      Eliminar
    </button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINACIÓN */}
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px"
          }}
          >
          <button
          onMouseOver={(e)=> e.currentTarget.style.transform="scale(1.1)"}
          onMouseOut={(e)=> e.currentTarget.style.transform="scale(1)"}
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(p => p - 1)}
            style={btnPaginacion}
          >
            <FiChevronLeft size={18} />
          </button>

          <span style={{ fontWeight: 500 }}>
            Página {paginaActual} de {totalPaginas || 1}
          </span>

          <button
          onMouseOver={(e)=> e.currentTarget.style.transform="scale(1.1)"}
          onMouseOut={(e)=> e.currentTarget.style.transform="scale(1)"}
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(p => p + 1)}
            style={btnPaginacion}
          >
            <FiChevronRight size={18} />
          </button>
        </div>
        </>
      )}

      {/* MODAL CONFIRMACIÓN */}
      {mostrarConfirmacion && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>¿Eliminar solicitud?</h3>
            <p>Esta acción no se puede deshacer.</p>

            <div style={{ display:"flex", gap:"10px", marginTop:"15px" }}>
              <button style={btnAzul} onClick={() => setMostrarConfirmacion(false)}>Cancelar</button>
              <button style={btnRojo} onClick={eliminarSolicitud}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const tabla = {
  width: "100%",
  borderCollapse: "collapse" as const,
  background: "#fdf6ec",   // beige suave
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
};

const headerTabla = {
  background: "#93c5fd",   // azul claro
  color: "#1e3a8a",
  textAlign: "center" as const
};

const celda = {
  padding: "12px 14px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "14px",
  textAlign: "center" as const
};

const btnPaginacion = {
  border: "none",
  background: "#2563eb",
  color: "white",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease"
};

const overlayStyle = {
  position:"fixed" as const,
  inset:0,
  background:"rgba(0,0,0,0.4)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  zIndex:1000
};

const modalStyle = {
  background:"white",
  padding:"25px",
  borderRadius:"12px",
  width:"350px",
  boxShadow:"0 10px 25px rgba(0,0,0,0.15)",

};