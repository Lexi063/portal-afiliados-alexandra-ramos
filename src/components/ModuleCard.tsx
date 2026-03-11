import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  icon: string;
  color: string;
  count: number;
  ruta: string;
};

export default function ModuleCard({
  title,
  description,
  icon,
  color,
  count,
  ruta
}: Props) {

  return (

    <div
      style={{
        borderTop: `5px solid ${color}`,
        borderRadius: "12px",
        padding: "22px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        background: "#ffffff",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.25s ease"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }}
    >

      {/* Badge contador */}
      <span style={{
        position: "absolute",
        top: "15px",
        right: "15px",
        background: color,
        color: "#ffffff",
        padding: "5px 11px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold"
      }}>
        {count}
      </span>

      {/* Icono */}
      <div style={{
        fontSize: "34px",
        marginBottom: "12px"
      }}>
        {icon}
      </div>

      {/* Título */}
      <h3 style={{
        marginBottom: "10px",
        fontSize: "18px"
      }}>
        {title}
      </h3>

      {/* Descripción */}
      <p style={{
        color: "#64748b",
        fontSize: "14px",
        lineHeight: "1.5"
      }}>
        {description}
      </p>

      <Link to={ruta} style={{ textDecoration: "none" }}>
  <button
    style={{
      marginTop: "15px",
      background: color,
      color: "#ffffff",
      border: "none",
      padding: "10px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      width: "100%"
    }}
>
  Ir al módulo
</button>
</Link>

    </div>
  );
}