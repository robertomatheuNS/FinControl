import React from "react";
import "../styles/metas.css";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

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

  // 🔵 dados do gráfico "Próximas Conquistas"
  const proximasConquistas = metas.map((meta, index) => ({
    nome: meta.titulo,
    valor: meta.progresso,
    cor: ["#9333ea", "#a855f7", "#c084fc"][index],
  }));

  return (
    <div className="container-fluid py-4">

      {/* CABEÇALHO */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Metas Financeiras</h1>
          <p className="text-muted">
            Defina e acompanhe seus objetivos de longo prazo
          </p>
        </div>

        <button className="btn-nova-meta">
          + Adicionar Nova Meta
        </button>
      </div>

      {/* RESUMO (INTACTO) */}
      <div className="card resumo-card mb-4">
        <div className="card-body p-4">

          <h3 className="fw-bold mb-4">
            Resumo Geral das Metas
          </h3>

          <div className="row">
            <div className="col-md-4">
              <h5 className="fw-bold">
                Total percentual de todas as metas atingido
              </h5>

              <div
                className="progress my-3"
                style={{ height: "30px" }}
              >
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

            {/* 🔥 PRÓXIMAS CONQUISTAS (GRÁFICO CORRIGIDO) */}
            <div className="col-md-4">
              <h4 className="fw-bold mb-3">
                Próximas Conquistas
              </h4>

              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={proximasConquistas}
                      dataKey="valor"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      stroke="none"
                    >
                      {proximasConquistas.map((item, index) => (
                        <Cell key={index} fill={item.cor} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 🔥 LEGENDA COMPLETA (RECUPERA INFORMAÇÕES) */}
              <div className="mt-3">
                {proximasConquistas.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mb-2"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: item.cor,
                          display: "inline-block",
                        }}
                      />
                      <span style={{ fontSize: "13px" }}>
                        {item.nome}
                      </span>
                    </div>

                    <span
                      className="text-muted"
                      style={{ fontSize: "13px" }}
                    >
                      {item.valor}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUNA DIREITA (mantida como estava) */}
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

      {/* LISTA DE METAS */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          Módulos de Metas Individual
        </h2>

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

                <h5 className="text-muted mb-3">
                  ({meta.valorMeta})
                </h5>

                <div
                  className="progress mb-3"
                  style={{ height: "25px" }}
                >
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

                <p className="fw-bold">
                  Acumulado: {meta.acumulado}
                </p>

                <p>Prazo: {meta.prazo}</p>

                <button className="btn-meta w-100">
                  Ver Detalhes
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DICA */}
      <div className="text-center dica-meta">
        <p className="fw-semibold">
          Dica: Crie uma meta secundária para lazer e viagens para
          manter o foco nas metas principais.
        </p>
      </div>

    </div>
  );
}