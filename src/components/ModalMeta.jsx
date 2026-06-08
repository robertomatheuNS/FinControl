import { useState } from "react";
import { createPortal } from "react-dom";
import InputMoeda from "./InputMoeda";
import { criarMeta } from "../controllers/metasController";

export default function ModalMeta({ show, handleClose, onSave }) {
  const [titulo, setTitulo] = useState("");
  const [valorMeta, setValorMeta] = useState("");
  const [acumulado, setAcumulado] = useState("");
  const [prazo, setPrazo] = useState("");
  const [cor, setCor] = useState("#2563eb");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setTitulo("");
    setValorMeta("");
    setAcumulado("");
    setPrazo("");
    setCor("#2563eb");
  };

  const salvarMeta = async () => {
    try {
      setLoading(true);

      const novaMeta = {
        titulo,
        valorMeta,
        acumulado,
        progresso: calcularProgresso(valorMeta, acumulado),
        prazo,
        cor,
      };

      
      await criarMeta(novaMeta);

      
      if (onSave) await onSave(novaMeta);

      reset();
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar meta");
    } finally {
      setLoading(false);
    }
  };

  const calcularProgresso = (meta, atual) => {
    const parse = (v) => Number(String(v).replace(/[^\d]/g, "")) || 0;
    const m = parse(meta);
    const a = parse(atual);
    if (!m) return 0;
    return Math.min(Math.round((a / m) * 100), 100);
  };

  if (!show) return null;

  return createPortal(
    <>
      <div
        className="modal-backdrop fade show"
        style={{ position: "fixed", inset: 0, zIndex: 1050 }}
        onClick={handleClose}
      />
      <div
        className="modal d-block"
        style={{ position: "fixed", inset: 0, zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {}
            <div className="modal-header">
              <h5 className="modal-title">Nova Meta</h5>
              <button className="btn-close" onClick={handleClose} />
            </div>

            {}
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Título da meta"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />

              <InputMoeda
                value={valorMeta}
                onChange={setValorMeta}
                className="mb-3"
              />

              <InputMoeda
                value={acumulado}
                onChange={setAcumulado}
                className="mb-3"
              />

              <input
                type="date"
                className="form-control mb-3"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
              />

              <div className="mb-3">
                <label className="form-label">Cor da meta</label>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                />
              </div>
            </div>

            {}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={salvarMeta}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
