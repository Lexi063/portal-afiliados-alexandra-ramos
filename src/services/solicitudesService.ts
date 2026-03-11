import type { Solicitud } from "../types/solicitud";

const solicitudesMock: Solicitud[] = [
  {
    id: 1,
    numeroSolicitud: "SOL-001",
    tipoSolicitud: "Petición",
    nombreAfiliado: "Carlos Pérez",
    fechaSolicitud: "2026-03-10",
    estado: "Pendiente"
  },
  {
    id: 2,
    numeroSolicitud: "SOL-002",
    tipoSolicitud: "Queja",
    nombreAfiliado: "Ana Gómez",
    fechaSolicitud: "2026-03-09",
    estado: "Resuelta"
  }
];

export const obtenerSolicitudes = (): Solicitud[] => {
  return solicitudesMock;
};