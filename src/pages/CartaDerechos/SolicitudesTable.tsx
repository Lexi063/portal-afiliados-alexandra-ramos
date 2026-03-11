import { useState } from "react";
import type { Solicitud } from "../../types/solicitud";

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
  const btnAzul = { background:"#3b82f6", color:"white", border:"none", padding:"6px 10px", borderRadius:"6px", cursor:"pointer" };
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
          style={{ padding:"10px", borderRadius:"8px", border:"1px solid #cbd5e1" }}
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
          <h3>📭 No hay solicitudes</h3>
          <p>Crea una nueva solicitud para comenzar</p>
        </div>
      ) : (
        <>
          {/* TABLA */}
          <table width="100%" cellPadding={10} style={{ borderCollapse: "collapse" }}>
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th>N° Solicitud</th>
                <th>Tipo</th>
                <th>Afiliado</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {solicitudesPagina.map(s => (
                <tr key={s.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td>{s.numeroSolicitud}</td>
                  <td>{s.tipoSolicitud}</td>
                  <td>{s.nombreAfiliado}</td>
                  <td>{s.fechaSolicitud}</td>

                  <td>
                    <span style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      background:
                        s.estado === "Pendiente" ? "#facc15" :
                        s.estado === "En proceso" ? "#3b82f6" :
                        s.estado === "Resuelta" ? "#22c55e" :
                        "#ef4444"
                    }}>
                      {s.estado}
                    </span>
                  </td>

                  <td style={{ display:"flex", gap:"8px" }}>
                    <button style={btnAzul} onClick={() => onVer(s)}>Ver</button>
                    <button style={btnVerde} onClick={() => onEditar(s)}>Editar</button>
                    <button style={btnRojo} onClick={() => confirmarEliminar(s.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINACIÓN */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"15px" }}>
            <button disabled={paginaActual === 1} onClick={() => setPaginaActual(p => p - 1)}>Anterior</button>
            <span>Página {paginaActual} de {totalPaginas || 1}</span>
            <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(p => p + 1)}>Siguiente</button>
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
  boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
};