import { useState, useEffect } from "react";
import { Card } from "../components/CardResumo";
import GraficoReceitas from "../components/GraficoReceitas";
import RecebimentosRecentes from "../components/RecebimentosRecentes";
import FontesRenda from "../components/FontesRenda";
import TabelaReceitas from "../components/TabelaReceitas";
import ModalReceita from "../components/ModalReceita";
import { listarReceitas } from "../controllers/receitaController";
import "../styles/receitas.css";

export default function Receitas() {
  const [showModalReceita, setShowModalReceita] = useState(false);
  const [receitas, setReceitas] = useState([]);

  const handleOpenModalReceita = () => setShowModalReceita(true);
  const handleCloseModalReceita = () => setShowModalReceita(false);

  const carregarReceitas = async () => {
    try {
      const todas = await listarReceitas();
      setReceitas(todas);
    } catch (err) {
      console.error("Erro ao carregar receitas:", err);
    }
  };

  useEffect(() => {
    carregarReceitas();
  }, []);

  const handleSaveReceita = async () => {
    await carregarReceitas();
  };

  // resumo dinâmico
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

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const totalMes = receitas.reduce(
    (acc, r) => acc + converterMoedaParaNumero(r.valor),
    0
  );

  return (
    <div className="container-fluid py-4 receitas-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Receitas</h2>
          <p className="text-muted">Acompanhe todas as entradas</p>
        </div>

        <button
          className="btn btn-success"
          onClick={handleOpenModalReceita}
        >
          + Nova Receita
        </button>
      </div>

      <Card className="shadow-sm border-0 p-4 mb-4 resumo-card">
        <h3 className="fw-bold mb-4">Resumo de Receitas</h3>

        <div className="row align-items-center">
          <div className="col-md-4 border-end">
            <div className="d-flex align-items-center">
              <div
                className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="bi bi-graph-up-arrow text-success fs-1"></i>
              </div>

              <div>
                <h5 className="fw-bold">Total de Receitas do Mês</h5>
                <h1 className="text-success fw-bold">
                  {formatarMoeda(totalMes)}
                </h1>
                <p className="mb-0">Este mês</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 border-end">
            <GraficoReceitas receitas={receitas} />
          </div>

          <div className="col-md-4">
            <RecebimentosRecentes receitas={receitas} />
          </div>
        </div>
      </Card>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Visão Mensal de Entradas</h3>
        <div className="d-flex align-items-center gap-2">
          <span>Período</span>
          <select className="form-select">
            <option>Este mês</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <FontesRenda receitas={receitas} />
        </div>
        <div className="col-md-8">
          <TabelaReceitas receitas={receitas} />
        </div>
      </div>

      <ModalReceita
        show={showModalReceita}
        handleClose={handleCloseModalReceita}
        onSave={handleSaveReceita}
      />
    </div>
  );
}
