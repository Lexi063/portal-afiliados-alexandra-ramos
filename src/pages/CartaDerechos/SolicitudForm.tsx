import { useState } from "react";
import type { Solicitud } from "../../types/solicitud";

type Estado = "Pendiente" | "En proceso" | "Resuelta" | "Rechazada";

type NuevaSolicitud = {
  nombreAfiliado: string;
  tipoSolicitud: string;
  descripcion: string;
  numeroDocumento: string;
  observaciones: string;
  estado: Estado;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: NuevaSolicitud) => void;
  solicitudEditar?: Solicitud | null;
};

export default function SolicitudForm({
  visible,
  onClose,
  onSave,
  solicitudEditar
}: Props) {

  const [errores, setErrores] = useState<string[]>([]);
  const [guardando, setGuardando] = useState(false);

  const [formData, setFormData] = useState<NuevaSolicitud>(() => ({
    nombreAfiliado: solicitudEditar?.nombreAfiliado ?? "",
    tipoSolicitud: solicitudEditar?.tipoSolicitud ?? "",
    descripcion: solicitudEditar?.descripcion ?? "",
    numeroDocumento: solicitudEditar?.numeroDocumento ?? "",
    observaciones: solicitudEditar?.observaciones ?? "",
    estado: (solicitudEditar?.estado as Estado) ?? "Pendiente"
  }));

  if (!visible) return null;

  const handleChange = <K extends keyof NuevaSolicitud>(
    campo: K,
    valor: NuevaSolicitud[K]
  ) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevosErrores: string[] = [];

    if (!formData.nombreAfiliado.trim()) nuevosErrores.push("Nombre requerido");
    if (!formData.tipoSolicitud) nuevosErrores.push("Tipo requerido");
    if (!formData.numeroDocumento.trim()) nuevosErrores.push("Documento requerido");
    if (formData.descripcion.trim().length < 20)
      nuevosErrores.push("Descripción mínima de 20 caracteres");

    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setGuardando(true);

    setTimeout(() => {
      onSave(formData);
      setErrores([]);
      setGuardando(false);
    }, 800);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>{solicitudEditar ? "Editar Solicitud" : "Nueva Solicitud"}</h2>

        {errores.length > 0 && (
          <div style={{ color:"#ef4444", marginBottom:"10px" }}>
            {errores.map((e, i) => <div key={i}>• {e}</div>)}
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>

          <input
            placeholder="Nombre afiliado"
            value={formData.nombreAfiliado}
            onChange={e => handleChange("nombreAfiliado", e.target.value)}
            style={inputStyle}
          />

          <select
            value={formData.tipoSolicitud}
            onChange={e => handleChange("tipoSolicitud", e.target.value)}
            style={inputStyle}
          >
            <option value="">Seleccione tipo</option>
            <option value="Petición">Petición</option>
            <option value="Queja">Queja</option>
            <option value="Reclamo">Reclamo</option>
            <option value="Consulta">Consulta</option>
          </select>

          {solicitudEditar && (
            <select
              value={formData.estado}
              onChange={e => handleChange("estado", e.target.value as Estado)}
              style={inputStyle}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Resuelta">Resuelta</option>
              <option value="Rechazada">Rechazada</option>
            </select>
          )}

          <input
            placeholder="Número de documento"
            value={formData.numeroDocumento}
            onChange={e => handleChange("numeroDocumento", e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={e => handleChange("descripcion", e.target.value)}
            style={{ ...inputStyle, height:"80px" }}
          />

          <p style={{
            fontSize:"12px",
            color: formData.descripcion.length >= 20 ? "#16a34a" : "#dc2626",
            marginTop:"-6px"
          }}>
            {formData.descripcion.length} / 20 mínimo
          </p>

          <textarea
            placeholder="Observaciones (opcional)"
            value={formData.observaciones}
            onChange={e => handleChange("observaciones", e.target.value)}
            style={{ ...inputStyle, height:"60px" }}
          />

          <div style={btnGroupStyle}>
            <button
              type="submit"
              disabled={guardando}
              style={{
                ...btnGuardar,
                opacity: guardando ? 0.7 : 1,
                cursor: guardando ? "not-allowed" : "pointer"
              }}
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>

            <button type="button" onClick={onClose} style={btnCancelar}>
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const formStyle = {
  display:"flex",
  flexDirection:"column" as const,
  gap:"12px"
};

const inputStyle = {
  padding:"10px",
  borderRadius:"6px",
  border:"1px solid #cbd5e1",
  width:"100%"
};

const btnGroupStyle = {
  display:"flex",
  gap:"10px",
  marginTop:"10px"
};

const btnGuardar = {
  background:"#22c55e",
  color:"white",
  border:"none",
  padding:"8px 14px",
  borderRadius:"6px",
  fontWeight:"bold"
};

const btnCancelar = {
  background:"#ef4444",
  color:"white",
  border:"none",
  padding:"8px 14px",
  borderRadius:"6px",
  fontWeight:"bold"
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
  width:"420px",
  boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
};