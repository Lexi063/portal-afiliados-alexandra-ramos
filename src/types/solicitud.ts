export type Solicitud = {
  id: number;
  numeroSolicitud: string;
  tipoSolicitud: string;
  nombreAfiliado: string;
  fechaSolicitud: string;
  estado: "Pendiente" | "En proceso" | "Resuelta" | "Rechazada";

  // 👇 AGREGA ESTOS
  descripcion?: string;
  numeroDocumento?: string;
  observaciones?: string;
};