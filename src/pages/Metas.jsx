import React from "react";
import "../styles/metas.css";

export default function Metas() {
  const metas = [
    {
      titulo: "Viagem para o Japão",
      valorMeta: "R$ 20.000",
      acumulado: "R$ 15.000",
      progresso: 75,
      prazo: "Dez 2024",
    },
    {
      titulo: "Carro Novo",
      valorMeta: "R$ 50.000",
      acumulado: "R$ 30.000",
      progresso: 60,
      prazo: "Dez 2024",
    },
    {
      titulo: "Reserva de Emergência",
      valorMeta: "R$ 10.000",
      acumulado: "R$ 3.000",
      progresso: 30,
      prazo: "Jun 2025",
    },
  ];

  return (
    <div className="container-fluid py-4">
      {/* Cabeçalho */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Metas Financeiras</h1>
          <p className="text-muted">
            Defina e acompanhe seus objetivos de longo prazo
          </p>
        </div>

        <button className="btn-nova-meta">+ Adicionar Nova Meta</button>
      </div>

      {/* Resumo */}
      <div className="card resumo-card mb-4">
        <div className="card-body p-4">
          <h3 className="fw-bold mb-4">Resumo Geral das Metas</h3>

          <div className="row">
            <div className="col-md-4">
              <h5 className="fw-bold">
                Total percentual de todas as metas atingido
              </h5>

              <div className="progress my-3" style={{ height: "30px" }}>
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "60%" }}
                >
                  60%
                </div>
              </div>

              <h5>Total Acumulado: R$ 45.000,00</h5>
              <h5>Meta Total: R$ 75.000,00</h5>
            </div>

            <div className="col-md-4">
              <h4 className="fw-bold mb-4">Próximas Conquistas</h4>

              <p>Viagem Fim de Ano - 80%</p>
              <p>Carro Novo - 60%</p>
              <p>Reserva de Emergência - 30%</p>
            </div>

            <div className="col-md-4 text-center">
              <div
                className="meta-circle"
                style={{
                  width: "180px",
                  height: "180px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Metas */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Módulos de Metas Individual</h2>

        <div className="btn-group">
          <button className="btn btn-light">Todas</button>
          <button className="btn btn-outline-secondary">Ativas</button>
          <button className="btn btn-outline-secondary">Concluídas</button>
        </div>
      </div>

      <div className="row">
        {metas.map((meta, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card meta-card h-100">
              <div className="card-body">
                <h4 className="fw-bold">{meta.titulo}</h4>

                <h5 className="text-muted mb-3">({meta.valorMeta})</h5>

                <div className="progress mb-3" style={{ height: "25px" }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{
                      width: `${meta.progresso}%`,
                    }}
                  >
                    {meta.progresso}%
                  </div>
                </div>

                <p className="fw-bold">Acumulado: {meta.acumulado}</p>

                <p>Prazo: {meta.prazo}</p>

                <button className="btn-meta w-100">Ver Detalhes</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dica */}
      <div className="text-center dica-meta">
        <p className="fw-semibold">
          Dica: Crie uma meta secundária para lazer e viagens para manter o foco
          nas metas principais.
        </p>
      </div>
    </div>
  );
}
