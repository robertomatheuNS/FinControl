import Gerencie from "../assets/Gerencie.png";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Troquei os componentes do Lucide pelos nomes das classes do Bootstrap Icons
  const menu = [
    { label: "Dashboard", icon: "bi-grid", path: "/" },
    { label: "Receitas", icon: "bi-graph-up-arrow", path: "/receitas" },
    { label: "Despesas", icon: "bi-graph-down-arrow", path: "/despesas" },
    { label: "Metas Financeiras", icon: "bi-bullseye", path: "/metas" },
    { label: "Relatórios", icon: "bi-file-earmark-text", path: "/relatorios" },
  ];

  return (
    <aside
      className="bg-dark text-white p-0 vh-100"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "260px",
        zIndex: 1000,
      }}
    >
      <div className="d-flex flex-column h-100">
        <div className="p-3 border-bottom border-secondary">
          <img
            src={Gerencie}
            alt="FinControl"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <nav className="flex-grow-1 overflow-auto mt-3">
          <ul className="nav flex-column p-2 gap-2">
            {menu.map((item) => {
              return (
                <li key={item.label} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-menu-button d-flex align-items-center gap-3 w-100 btn border-0 ${
                        isActive
                          ? "bg-success text-white"
                          : "text-white-50 text-start"
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} fs-5`}></i>
                    <span className="small fw-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Card extra que estava no Figma */}
        <div className="p-3 mx-2 mb-3 bg-success bg-opacity-25 rounded text-center">
          <i className="bi bi-wallet2 fs-3 text-success mb-2 d-block"></i>
          <small className="text-white">
            Organize suas finanças e conquiste seus objetivos!
          </small>
        </div>
      </div>
    </aside>
  );
}
