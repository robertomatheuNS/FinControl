import { useEffect, useState } from "react";
import { obterMetas } from "../controllers/metasController";

export default function MetasFinanceiras() {
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const data = await obterMetas();
        setMetas(data);
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
          <div
            key={meta.id}
            className="card border rounded-4 p-3 mb-2 shadow-sm"
          >
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-2">

              {/* TEXTO */}
              <div>
                <h6
                  className="fw-bold mb-1 text-dark"
                  style={{ fontSize: "14px" }}
                >
                  {meta.titulo}
                </h6>

                <small
                  className="text-muted"
                  style={{ fontSize: "12px" }}
                >
                  Meta: {meta.valorMeta}
                </small>
              </div>

              {/* % PROGRESSO */}
              <span
                className="fw-bold"
                style={{
                  color: meta.cor,
                  fontSize: "16px",
                }}
              >
                {progresso}%
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div
              className="progress mb-1"
              style={{
                height: "6px",
                backgroundColor: "#f0f0f0",
                overflow: "hidden",
              }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(progresso, 100)}%`,
                  backgroundColor: meta.cor,
                  display: "block",
                }}
              />
            </div>

            {/* VALORES */}
            <span
              className="fw-bold text-dark"
              style={{ fontSize: "12px" }}
            >
              {meta.acumulado}{" "}
              <span className="text-muted fw-semibold">
                / {meta.valorMeta}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}