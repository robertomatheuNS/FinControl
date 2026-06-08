import { useState } from "react";
import { createPortal } from "react-dom";
import InputMoeda from "./InputMoeda";
import { criarReceita } from "../controllers/receitaController";

export default function ModalReceita({ show, handleClose, onSave }) {
  const [descricao, setDescricao] = useState("");
  const [valorD, setValorD] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  // NOVOS ESTADOS
  const [categoria, setCategoria] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);

  const [formaPagamento, setFormaPagamento] = useState("");

  const [categorias, setCategorias] = useState([
    "Salário",
    "Freelance",
    "Investimentos",
    "Outros",
  ]);

  const salvarReceita = async () => {
    try {
      setLoading(true);

      const categoriaFinal =
        categoria === "nova" ? novaCategoria : categoria;

      const novaReceita = {
        descricao,
        valor: valorD,
        data,
        categoria: categoriaFinal,
        formaPagamento,
      };

      await criarReceita(novaReceita);

      // limpa campos
      setDescricao("");
      setValorD("");
      setData("");
      setCategoria("");
      setFormaPagamento("");
      setNovaCategoria("");

      // chama onSave para atualizar lista em Receitas.jsx
      if (onSave) await onSave();

      handleClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar receita.");
    } finally {
      setLoading(false);
    }
  };

  const adicionarCategoria = () => {
    if (!novaCategoria.trim()) return;

    setCategorias([...categorias, novaCategoria]);
    setCategoria(novaCategoria);
    setNovaCategoria("");
    setMostrarNovaCategoria(false);
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
                <div className="bg-success bg-opacity-10 text-success p-2 rounded">
                  <i className="bi bi-graph-up-arrow fs-5"></i>
                </div>

                <div>
                  <h5 className="modal-title mb-0">Nova Receita</h5>
                  <small className="text-muted">
                    Registrar uma nova entrada
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
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />

              <InputMoeda
                value={valorD}
                onChange={setValorD}
                className="mb-3"
              />

              <input
                type="date"
                className="form-control mb-3"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />

              {/* categoria */}
              <select
                className="form-control mb-2"
                value={categoria}
                onChange={(e) => {
                  const value = e.target.value;
                  setCategoria(value);
                  setMostrarNovaCategoria(value === "nova");
                }}
              >
                <option value="">Categoria</option>
                {categorias.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="nova">+ Criar nova categoria</option>
              </select>

              {mostrarNovaCategoria && (
                <div className="d-flex gap-2 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nova categoria"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    onClick={adicionarCategoria}
                  >
                    Add
                  </button>
                </div>
              )}

              {/* forma de pagamento */}
              <select
                className="form-control"
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
              >
                <option value="">Forma de pagamento</option>
                <option value="pix">Pix</option>
                <option value="transferencia">Transferência</option>
                <option value="dinheiro">Dinheiro</option>
              </select>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancelar
              </button>

              <button
                className="btn btn-success"
                onClick={salvarReceita}
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
