import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
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

  const proximasConquistas = [
    {
      titulo: "Viagem Fim de Ano",
      progresso: 80,
      cor: "#ef4444",
      valorMeta: "R$ 10.000",
    },
    {
      titulo: "Carro Novo",
      progresso: 60,
      cor: "#2563eb",
      valorMeta: "R$ 50.000",
    },
    {
      titulo: "Reserva de Emergência",
      progresso: 30,
      cor: "#f59e0b",
      valorMeta: "R$ 10.000",
    },
  ];

  const chartData = proximasConquistas.map((item) => ({
    name: item.titulo,
    value: item.progresso,
    fill: item.cor,
  }));

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
                  className="progress-bar"
                  style={{
                    width: "60%",
                    background:
                      "linear-gradient(90deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  60%
                </div>
              </div>

              <h5>Total Acumulado: R$ 45.000,00</h5>
              <h5>Meta Total: R$ 75.000,00</h5>
            </div>

            <div className="col-md-4">
              <h4 className="fw-bold mb-4">Próximas Conquistas</h4>

              <div className="proximas-conquistas-list">
                {proximasConquistas.map((item) => (
                  <div key={item.titulo} className="proxima-conquista-item">
                    <div className="d-flex align-items-center gap-3">
                      <span
                        className="proxima-conquista-dot"
                        style={{ backgroundColor: item.cor }}
                      />
                      <div>
                        <p className="mb-1 fw-semibold">{item.titulo}</p>
                        <p
                          className="text-muted mb-0"
                          style={{ fontSize: "14px" }}
                        >
                          {item.valorMeta}
                        </p>
                      </div>
                    </div>

                    <span className="fw-bold">{item.progresso}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="proximas-chart-wrapper mx-auto">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="chart-center-badge">
                  Próximas
                  <br />
                  <span className="fw-bold">Conquistas</span>
                </div>
              </div>
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
                    className="progress-bar"
                    style={{
                      width: `${meta.progresso}%`,
                      background:
                        "linear-gradient(90deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)",
                      color: "#fff",
                      fontWeight: "600",
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
