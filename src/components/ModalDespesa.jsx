import { useState } from "react";
import { createPortal } from "react-dom";
import InputMoeda from "./InputMoeda";
import { criarDespesa } from "../controllers/despesaController";

export default function ModalDespesa({
  show,
  handleClose,
  onSave,
}) {
  const [descricao, setDescricao] = useState("");
  const [valorD, setValorD] = useState("");
  const [data, setData] = useState("");

  
  const [categoria, setCategoria] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);

  const [formaPagamento, setFormaPagamento] = useState("");

  const [loading, setLoading] = useState(false);

  
  const [categorias, setCategorias] = useState([
    "Alimentação",
    "Transporte",
    "Lazer",
    "Contas",
    "Outros",
  ]);

  const salvarDespesa = async () => {
    try {
      setLoading(true);

      const categoriaFinal =
        categoria === "nova"
          ? novaCategoria
          : categoria;

      await criarDespesa({
        descricao,
        valor: valorD,
        data,
        categoria: categoriaFinal,
        formaPagamento,
      });

      setDescricao("");
      setValorD("");
      setData("");
      setCategoria("");
      setFormaPagamento("");
      setNovaCategoria("");

      if (onSave) await onSave();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar despesa.");
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
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1050,
        }}
        onClick={handleClose}
      />

      <div
        className="modal d-block"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1055,
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            {}
            <div className="modal-header">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-danger bg-opacity-10 text-danger p-2 rounded">
                  <i className="bi bi-graph-down-arrow fs-5"></i>
                </div>

                <div>
                  <h5 className="modal-title mb-0">
                    Nova Despesa
                  </h5>
                  <small className="text-muted">
                    Registrar uma nova saída
                  </small>
                </div>
              </div>

              <button
                className="btn-close"
                onClick={handleClose}
              />
            </div>

            {}
            <div className="modal-body">

              {}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) =>
                  setDescricao(e.target.value)
                }
              />

              {}
              <InputMoeda
                value={valorD}
                onChange={setValorD}
                className="mb-3"
              />

              {}
              <input
                type="date"
                className="form-control mb-3"
                value={data}
                onChange={(e) =>
                  setData(e.target.value)
                }
              />

              {}
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
                <option value="nova">
                  + Criar nova categoria
                </option>
              </select>

              {}
              {mostrarNovaCategoria && (
                <div className="d-flex gap-2 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nova categoria"
                    value={novaCategoria}
                    onChange={(e) =>
                      setNovaCategoria(e.target.value)
                    }
                  />

                  <button
                    className="btn btn-success"
                    onClick={adicionarCategoria}
                  >
                    Add
                  </button>
                </div>
              )}

              {}
              <select
                className="form-control"
                value={formaPagamento}
                onChange={(e) =>
                  setFormaPagamento(e.target.value)
                }
              >
                <option value="">
                  Forma de pagamento
                </option>
                <option value="pix">Pix</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
                <option value="dinheiro">Dinheiro</option>
              </select>

            </div>

            {}
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancelar
              </button>

              <button
                className="btn btn-danger"
                onClick={salvarDespesa}
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