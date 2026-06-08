import { useEffect, useState } from "react";
import { obterMetas } from "../controllers/metasController";

export default function MetasFinanceiras() {
  const [metas, setMetas] = useState([]);

  const converterMoedaParaNumero = (valor) => {
    if (!valor) return 0;
    return Number(
      String(valor)
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()
    );
  };

  useEffect(() => {
    async function carregarMetas() {
      try {
        const data = await obterMetas();

        const ordenadas = [...data]
          .sort((a, b) => {
            return (b.progresso ?? 0) - (a.progresso ?? 0);
          })
          .slice(0, 3);

        setMetas(ordenadas);
      } catch (err) {
        console.error("Erro ao carregar metas", err);
      }
    }

    carregarMetas();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <h5 className="fw-bold mb-3">Metas financeiras</h5>

      {metas.map((meta) => {
        const progresso = meta.progresso ?? 0;

        return (
          <div key={meta.id} className="card border rounded-4 p-3 mb-2 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "14px" }}>
                  {meta.titulo}
                </h6>

                <small className="text-muted" style={{ fontSize: "12px" }}>
                  Meta: {meta.valorMeta}
                </small>
              </div>

              <span className="fw-bold" style={{ color: meta.cor, fontSize: "16px" }}>
                {progresso}%
              </span>
            </div>

            <div className="progress mb-1" style={{ height: "6px", backgroundColor: "#f0f0f0" }}>
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(progresso, 100)}%`,
                  backgroundColor: meta.cor,
                }}
              />
            </div>

            <span className="fw-bold text-dark" style={{ fontSize: "12px" }}>
              {meta.acumulado}{" "}
              <span className="text-muted fw-semibold">/ {meta.valorMeta}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}