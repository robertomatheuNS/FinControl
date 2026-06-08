import { obterUsuario } from "../controllers/usuarioController";

const usuario = obterUsuario();

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center pt-2 pb-4 mb-4 border-bottom">
      <div>
        <h2 className="m-0 fw-bold">FinControl</h2>
        <span className="text-muted">Resumo da sua vida financeira</span>
      </div>

      <div className="d-flex align-items-center gap-4">
        <button
          type="button"
          className="header-action-button position-relative header-action-lift"
          onClick={() => console.log("Notificações clicadas")}
          aria-label="Notificações"
        >
          <i className="bi bi-bell fs-4"></i>
          {}
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        </button>

        <button
          type="button"
          className="header-action-button d-flex align-items-center gap-2 header-action-lift"
          onClick={() => console.log("Perfil clicado")}
          aria-label="Perfil"
        >
          <div
            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="bi bi-person fs-5"></i>
          </div>
          <span className="fw-medium">Olá, {usuario.nome}!</span>
        </button>
      </div>
    </div>
  );
}
