import type { Solicitud } from "../../types/solicitud";

type Props = {
  visible: boolean;
  onClose: () => void;
  solicitud: Solicitud | null;
};

export default function SolicitudDetalle({ visible, onClose, solicitud }: Props) {
  if (!visible || !solicitud) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Detalle de Solicitud</h2>

        <div style={infoStyle}><b>N° Solicitud:</b> {solicitud.numeroSolicitud}</div>
        <div style={infoStyle}><b>Afiliado:</b> {solicitud.nombreAfiliado}</div>
        <div style={infoStyle}><b>Tipo:</b> {solicitud.tipoSolicitud}</div>
        <div style={infoStyle}><b>Documento:</b> {solicitud.numeroDocumento}</div>
        <div style={infoStyle}><b>Fecha:</b> {solicitud.fechaSolicitud}</div>
        <div style={infoStyle}><b>Estado:</b> {solicitud.estado}</div>

        <div style={infoStyle}>
          <b>Descripción:</b>
          <p style={boxStyle}>{solicitud.descripcion}</p>
        </div>

        {solicitud.observaciones && (
          <div style={infoStyle}>
            <b>Observaciones:</b>
            <p style={boxStyle}>{solicitud.observaciones}</p>
          </div>
        )}

        <button onClick={onClose} style={btnCerrar}>Cerrar</button>
      </div>
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
  width:"420px",
  boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
};

const infoStyle = { marginBottom:"10px" };

const boxStyle = {
  background:"#f1f5f9",
  padding:"10px",
  borderRadius:"6px"
};

const btnCerrar = {
  marginTop:"15px",
  background:"#3b82f6",
  color:"white",
  border:"none",
  padding:"8px 14px",
  borderRadius:"6px",
  cursor:"pointer",
  fontWeight:"bold"
};