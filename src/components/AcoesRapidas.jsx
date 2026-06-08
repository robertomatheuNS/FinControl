import { useState } from "react";
import ModalReceita from "./ModalReceita";
import ModalDespesa from "./ModalDespesa";

export default function AcoesRapidas({ onSaveReceita, onSaveDespesa }) {
  const [showModalReceita, setShowModalReceita] = useState(false);
  const [showModalDespesa, setShowModalDespesa] = useState(false);

  const handleOpenModalReceita = () => setShowModalReceita(true);
  const handleCloseModalReceita = () => setShowModalReceita(false);

  const handleOpenModalDespesa = () => setShowModalDespesa(true);
  const handleCloseModalDespesa = () => setShowModalDespesa(false);

  return (
    <div className="d-flex flex-column h-100">
      <h5 className="fw-bold mb-4">Ações rápidas</h5>

      <div
        className="card border rounded-3 p-3 mb-3 shadow-sm-hover quick-action-card"
        style={{ cursor: "pointer" }}
        onClick={handleOpenModalReceita}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="bi bi-graph-up fs-5"></i>
          </div>

          <div>
            <h6 className="fw-bold mb-0 text-dark">Adicionar Receita</h6>
            <small className="text-muted">Registrar uma nova entrada</small>
          </div>
        </div>
      </div>

      <div
        className="card border rounded-3 p-3 mb-3 quick-action-card"
        style={{ cursor: "pointer" }}
        onClick={handleOpenModalDespesa}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="bg-danger bg-opacity-10 text-danger rounded-3 d-flex align-items-center justify-content-center"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="bi bi-graph-down fs-5"></i>
          </div>

          {/* Textos */}
          <div>
            <h6 className="fw-bold mb-0 text-dark">Adicionar Despesa</h6>
            <small className="text-muted">Registrar uma nova saída</small>
          </div>
        </div>
      </div>

      <ModalReceita
        show={showModalReceita}
        handleClose={handleCloseModalReceita}
        onSave={onSaveReceita}
      />
      <ModalDespesa
        show={showModalDespesa}
        handleClose={handleCloseModalDespesa}
        onSave={onSaveDespesa}
      />
    </div>
  );
}
