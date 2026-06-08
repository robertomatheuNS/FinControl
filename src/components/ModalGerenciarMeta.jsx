import { useState } from "react";
import { createPortal } from "react-dom";
import InputMoeda from "./InputMoeda";
import { atualizarMeta } from "../controllers/metasController";

export default function ModalGerenciarMeta({
  show,
  handleClose,
  metas,
  onSave,
}) {
  const [metaSelecionada, setMetaSelecionada] = useState("");
  const [valorMovimento, setValorMovimento] = useState("");
  const [tipoMovimento, setTipoMovimento] = useState("adicionar");
  const [novoValorMeta, setNovoValorMeta] = useState("");
  const [novoPrazo, setNovoPrazo] = useState("");

  if (!show) return null;

  const converterMoedaParaNumero = (valor) => {
    if (!valor) return 0;

    return Number(
      valor
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()
    );
  };

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const salvarAlteracoes = async () => {
    try {
      if (!metaSelecionada) {
        alert("Selecione uma meta.");
        return;
      }

      const meta = metas.find(
        (m) => m.id === metaSelecionada
      );

      if (!meta) {
        alert("Meta não encontrada.");
        return;
      }

      let acumuladoAtual = converterMoedaParaNumero(
        meta.acumulado
      );

      const movimentacao = converterMoedaParaNumero(
        valorMovimento
      );

      if (tipoMovimento === "adicionar") {
        acumuladoAtual += movimentacao;
      } else {
        acumuladoAtual -= movimentacao;

        if (acumuladoAtual < 0) {
          acumuladoAtual = 0;
        }
      }

      const valorMetaFinal = novoValorMeta
        ? converterMoedaParaNumero(novoValorMeta)
        : converterMoedaParaNumero(meta.valorMeta);

      const progresso = Math.min(
        Math.round(
          (acumuladoAtual / valorMetaFinal) * 100
        ),
        100
      );

      const dadosAtualizados = {
        acumulado: formatarMoeda(acumuladoAtual),
        valorMeta: novoValorMeta || meta.valorMeta,
        prazo: novoPrazo || meta.prazo,
        progresso,
      };

      console.log(
        "Atualizando:",
        meta.id,
        dadosAtualizados
      );

      await atualizarMeta(
        meta.id,
        dadosAtualizados
      );

      if (onSave) {
        await onSave();
      }

      setMetaSelecionada("");
      setValorMovimento("");
      setNovoValorMeta("");
      setNovoPrazo("");
      setTipoMovimento("adicionar");

      handleClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar meta");
    }
  };

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

            <div className="modal-header">
              <h5 className="modal-title">
                Gerenciar Meta
              </h5>

              <button
                className="btn-close"
                onClick={handleClose}
              />
            </div>

            <div className="modal-body">

              <label className="form-label">
                Meta
              </label>

              <select
                className="form-select mb-3"
                value={metaSelecionada}
                onChange={(e) =>
                  setMetaSelecionada(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Selecione uma meta
                </option>

                {metas.map((meta) => (
                  <option
                    key={meta.id}
                    value={meta.id}
                  >
                    {meta.titulo}
                  </option>
                ))}
              </select>

              <label className="form-label">
                Valor da movimentação
              </label>

              <InputMoeda
                value={valorMovimento}
                onChange={setValorMovimento}
                className="mb-3"
              />

              <div className="mb-3">
                <label className="form-label d-block">
                  Tipo
                </label>

                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    checked={
                      tipoMovimento ===
                      "adicionar"
                    }
                    onChange={() =>
                      setTipoMovimento(
                        "adicionar"
                      )
                    }
                  />

                  <label className="form-check-label">
                    Adicionar valor
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    checked={
                      tipoMovimento ===
                      "retirar"
                    }
                    onChange={() =>
                      setTipoMovimento(
                        "retirar"
                      )
                    }
                  />

                  <label className="form-check-label">
                    Retirar valor
                  </label>
                </div>
              </div>

              <label className="form-label">
                Novo valor da meta
              </label>

              <InputMoeda
                value={novoValorMeta}
                onChange={setNovoValorMeta}
                className="mb-3"
              />

              <label className="form-label">
                Novo prazo
              </label>

              <input
                type="date"
                className="form-control"
                value={novoPrazo}
                onChange={(e) =>
                  setNovoPrazo(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancelar
              </button>

              <button
                className="btn btn-primary"
                onClick={salvarAlteracoes}
              >
                Salvar Alterações
              </button>
            </div>

          </div>
        </div>
      </div>
    </>,
    document.body
  );
}