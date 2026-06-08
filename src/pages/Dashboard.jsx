import { useState, useEffect } from "react";
import "../App.css";
import "../styles/dashboard.css";
import GraficoDespesas from "../components/GraficoDespesas";
import AcoesRapidas from "../components/AcoesRapidas";
import UltimasTransacoes from "../components/UltimasTransacoes";
import MetasFinanceiras from "../components/MetasFinanceiras";
import ModalReceita from "../components/ModalReceita";
import ModalDespesa from "../components/ModalDespesa";
import {
  carregarReceitas,
  carregarDespesas,
  formatarMoeda,
  calcularTotalReceitas,
  calcularTotalDespesas,
  calcularSaldoAtual,
} from "../controllers/dashboardController";

export default function Dashboard() {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [showModalReceita, setShowModalReceita] = useState(false);
  const [showModalDespesa, setShowModalDespesa] = useState(false);

  const handleOpenModalReceita = () => setShowModalReceita(true);
  const handleCloseModalReceita = () => setShowModalReceita(false);
  const handleOpenModalDespesa = () => setShowModalDespesa(true);
  const handleCloseModalDespesa = () => setShowModalDespesa(false);

  const carregarDashboard = async () => {
    const todasReceitas = await carregarReceitas();
    setReceitas(todasReceitas);

    const todasDespesas = await carregarDespesas();
    setDespesas(todasDespesas);
  };

  useEffect(() => {
    async function init() {
      await carregarDashboard();
    }

    init();
  }, []);

  const totalReceitas = calcularTotalReceitas(receitas);
  const totalDespesas = calcularTotalDespesas(despesas);
  const saldoAtual = calcularSaldoAtual(receitas, despesas);

  return (
    
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
            <GraficoDespesas despesas={despesas} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <AcoesRapidas
              onOpenReceita={handleOpenModalReceita}
              onOpenDespesa={handleOpenModalDespesa}
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

      <ModalReceita
        show={showModalReceita}
        handleClose={handleCloseModalReceita}
        onSave={async () => {
          await carregarDashboard();
          handleCloseModalReceita();
        }}
      />
      <ModalDespesa
        show={showModalDespesa}
        handleClose={handleCloseModalDespesa}
        onSave={async () => {
          await carregarDashboard();
          handleCloseModalDespesa();
        }}
      />
    </div>
  );
}
