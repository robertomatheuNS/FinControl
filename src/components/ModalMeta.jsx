import { useState } from "react";
import { createPortal } from "react-dom";

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
        id: Date.now(),
        titulo,
        valorMeta,
        acumulado,
        progresso: calcularProgresso(valorMeta, acumulado),
        prazo,
        cor,
      };

      // opcional: enviar pra API ou state global
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
    const parse = (v) =>
      Number(String(v).replace(/[^\d]/g, "")) || 0;

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

            {/* HEADER */}
            <div className="modal-header">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="p-2 rounded"
                  style={{ background: `${cor}20`, color: cor }}
                >
                  <i className="bi bi-bullseye fs-5"></i>
                </div>

                <div>
                  <h5 className="modal-title mb-0">Nova Meta</h5>
                  <small className="text-muted">
                    Definir objetivo financeiro
                  </small>
                </div>
              </div>

              <button className="btn-close" onClick={handleClose} />
            </div>

            {/* BODY */}
            <div className="modal-body">

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Título da meta"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Valor da meta (R$ 50.000)"
                value={valorMeta}
                onChange={(e) => setValorMeta(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Valor acumulado (R$ 10.000)"
                value={acumulado}
                onChange={(e) => setAcumulado(e.target.value)}
              />

              <input
                type="month"
                className="form-control mb-3"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
              />

              {/* cor */}
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

            {/* FOOTER */}
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