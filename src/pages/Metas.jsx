import {
  obterMetas,
  organizarMetas,
} from "../controllers/metasController";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

import ModalMeta from "../components/ModalMeta";
import ModalGerenciarMeta from "../components/ModalGerenciarMeta";

import "../styles/metas.css";

export default function Metas() {
  const [showModalMeta, setShowModalMeta] = useState(false);
  const [showModalGerenciar, setShowModalGerenciar] = useState(false);

  const [metas, setMetas] = useState([]);
  const [proximasConquistas, setProximasConquistas] = useState([]);

  const handleOpenModalMeta = () => setShowModalMeta(true);
  const handleCloseModalMeta = () => setShowModalMeta(false);

  const handleOpenModalGerenciar = () => setShowModalGerenciar(true);
  const handleCloseModalGerenciar = () => setShowModalGerenciar(false);

  const carregarMetas = async () => {
    try {
      const todasMetas = await obterMetas();
      setMetas(todasMetas);

      const conquistas = await organizarMetas();
      setProximasConquistas(conquistas);
    } catch (err) {
      console.error("Erro ao carregar metas:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await carregarMetas();
    };
    init();
  }, []);

  const handleSaveMeta = async () => {
    await carregarMetas();
  };

  // Funções auxiliares para resumo geral
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

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const totalAcumulado = metas.reduce(
    (acc, meta) => acc + converterMoedaParaNumero(meta.acumulado),
    0
  );

  const metaTotal = metas.reduce(
    (acc, meta) => acc + converterMoedaParaNumero(meta.valorMeta),
    0
  );

  const percentualGeral =
    metaTotal > 0 ? Math.min(Math.round((totalAcumulado / metaTotal) * 100), 100) : 0;

  const chartData = proximasConquistas.map((item) => ({
    name: item.titulo,
    value: item.progresso,
    fill: item.cor,
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

        <div className="d-flex gap-2">
          <button className="btn-nova-meta" onClick={handleOpenModalMeta}>
            + Adicionar Nova Meta
          </button>
          <button className="btn-nova-meta" onClick={handleOpenModalGerenciar}>
            + Gerenciar Meta
          </button>
        </div>
      </div>

      {/* RESUMO DINÂMICO */}
      <div className="card resumo-card mb-4">
        <div className="card-body p-4">
          <div className="row gy-4 align-items-start">
            {/* ESQUERDA */}
            <div className="col-md-4">
              <h4 className="fw-bold mb-4">Resumo Geral das Metas</h4>
              <h5 className="fw-bold">
                Total percentual de todas as metas atingido
              </h5>
              <div className="progress my-3" style={{ height: "30px" }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${percentualGeral}%`,
                    background:
                      "linear-gradient(90deg, #9333ea 0%, #a855f7 50%, #c084fc 100%)",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  {percentualGeral}%
                </div>
              </div>
              <h5>Total Acumulado: {formatarMoeda(totalAcumulado)}</h5>
              <h5>Meta Total: {formatarMoeda(metaTotal)}</h5>
            </div>
                        {/* MEIO - Próximas Conquistas */}
            <div className="col-md-4 text-center">
              <h4 className="fw-bold mb-4">Próximas Conquistas</h4>
              <div className="proximas-conquistas-list">
                {proximasConquistas.map((item) => (
                  <div
                    key={item.id}
                    className="proxima-conquista-item d-flex justify-content-between align-items-center mb-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span
                        className="proxima-conquista-dot"
                        style={{ backgroundColor: item.cor }}
                      />
                      <div>
                        <p className="mb-1 fw-semibold">{item.titulo}</p>
                        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                          {item.valorMeta}
                        </p>
                      </div>
                    </div>
                    <span className="fw-bold">{item.progresso}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DIREITA - Gráfico */}
            <div className="col-md-4 text-center">
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
                      paddingAngle={4}
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

      {/* LISTA DE METAS (Módulos Individuais) */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Módulos de Metas Individual</h2>
        <div className="btn-group">
          <button className="btn btn-light">Todas</button>
          <button className="btn btn-outline-secondary">Ativas</button>
          <button className="btn btn-outline-secondary">Concluídas</button>
        </div>
      </div>

      <div className="row">
        {metas.map((meta) => (
          <div className="col-md-4 mb-4" key={meta.id}>
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

      {/* DICA */}
      <div className="text-center dica-meta">
        <p className="fw-semibold">
          Dica: Crie uma meta secundária para lazer e viagens para manter o foco nas metas principais.
        </p>
      </div>

      {/* MODAIS */}
      <ModalMeta
        show={showModalMeta}
        handleClose={handleCloseModalMeta}
        onSave={handleSaveMeta}
      />
      <ModalGerenciarMeta
        show={showModalGerenciar}
        handleClose={handleCloseModalGerenciar}
        metas={metas}
        onSave={carregarMetas}
      />
    </div>
  );
}

