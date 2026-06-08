import { useState, useEffect } from "react";
import "../App.css";
import GraficoDespesas from "../components/GraficoDespesas";
import AcoesRapidas from "../components/AcoesRapidas";
import UltimasTransacoes from "../components/UltimasTransacoes";
import MetasFinanceiras from "../components/MetasFinanceiras";
import { listarReceitas } from "../controllers/receitaController";
import { listarDespesas } from "../controllers/despesaController";

export default function Dashboard() {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);

  const carregarReceitas = async () => {
    try {
      const todas = await listarReceitas();
      setReceitas(todas);
    } catch (err) {
      console.error("Erro ao carregar receitas:", err);
    }
  };

  const carregarDespesas = async () => {
    try {
      const todas = await listarDespesas();
      setDespesas(todas);
    } catch (err) {
      console.error("Erro ao carregar despesas:", err);
    }
  };

  useEffect(() => {
    async function carregarDados() {
      await carregarReceitas();
      await carregarDespesas();
    }

    carregarDados();
  }, []);

  const converterMoedaParaNumero = (valor) => {
    if (typeof valor === "number") return valor;
    if (!valor) return 0;
    return Number(
      String(valor)
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(/,/g, ".")
        .replace(/\s/g, "")
        .trim()
    ) || 0;
  };

  const formatarMoeda = (valor) =>
    Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const totalReceitas = receitas.reduce(
    (acc, item) => acc + converterMoedaParaNumero(item.valor),
    0
  );

  const totalDespesas = despesas.reduce(
    (acc, item) => acc + converterMoedaParaNumero(item.valor),
    0
  );

  const saldoAtual = totalReceitas - totalDespesas;

  return (
    // Container com padding ajustado para não comprimir o conteúdo
    <div
      className="container-fluid pb-2"
      style={{
        fontFamily: "Inter, sans-serif",
        paddingLeft: "0",
        paddingRight: "0",
      }}
    >
      <div className="row g-3 mb-3 mx-0 px-4">
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-3 h-100"
            style={{ backgroundColor: "#e8f5e9" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                <i className="bi bi-wallet2 fs-5"></i>
              </div>
              <div>
                <p
                  className="text-muted fw-semibold mb-0"
                  style={{ fontSize: "14px" }}
                >
                  Saldo Atual
                </p>
                <h4 className="text-success fw-bold mb-0">
                  {formatarMoeda(saldoAtual)}
                </h4>
                <small className="text-muted" style={{ fontSize: "12px" }}>
                  Disponível
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-3 h-100"
            style={{ backgroundColor: "#e3f2fd" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                <i className="bi bi-arrow-up fs-5"></i>
              </div>
              <div>
                <p
                  className="text-muted fw-semibold mb-0"
                  style={{ fontSize: "14px" }}
                >
                  Receitas do mês
                </p>
                <h4 className="text-dark fw-bold mb-0">
                  {formatarMoeda(totalReceitas)}
                </h4>
                <small className="text-muted" style={{ fontSize: "12px" }}>
                  Total de entradas
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-3 h-100"
            style={{ backgroundColor: "#ffebee" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                <i className="bi bi-arrow-down fs-5"></i>
              </div>
              <div>
                <p
                  className="text-muted fw-semibold mb-0"
                  style={{ fontSize: "14px" }}
                >
                  Despesas do mês
                </p>
                <h4 className="text-dark fw-bold mb-0">
                  {formatarMoeda(totalDespesas)}
                </h4>
                <small className="text-muted" style={{ fontSize: "12px" }}>
                  Total de saídas
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-3 mx-0 px-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <GraficoDespesas />
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <AcoesRapidas
              onSaveReceita={carregarReceitas}
              onSaveDespesa={carregarDespesas}
            />
          </div>
        </div>
      </div>

      <div className="row g-3 mx-0 px-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <UltimasTransacoes />
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <MetasFinanceiras />
          </div>
        </div>
      </div>
    </div>
  );
}
