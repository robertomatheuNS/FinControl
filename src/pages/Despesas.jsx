import React, { useState }from "react";
import ModalDespesa from "../components/ModalDespesa"; 

export default function Despesas() {

  const [showModalDespesa, setShowModalDespesa] = useState(false);
  const handleOpenModalDespesa = () => setShowModalDespesa(true);
  const handleCloseModalDespesa = () => setShowModalDespesa(false);

  const despesas = [
    {
      id: 1,
      data: "05/06/2024",
      descricao: "Aluguel",
      categoria: "Moradia",
      pagamento: "Transferência",
      valor: 1500,
    },
    {
      id: 2,
      data: "03/06/2024",
      descricao: "Supermercado",
      categoria: "Alimentação",
      pagamento: "Pix",
      valor: 850,
    },
    {
      id: 3,
      data: "01/06/2024",
      descricao: "Conta de Energia",
      categoria: "Contas",
      pagamento: "Débito",
      valor: 320,
    },
    {
      id: 4,
      data: "28/05/2024",
      descricao: "Internet",
      categoria: "Serviços",
      pagamento: "Pix",
      valor: 420,
    },
  ];

  const totalDespesas = despesas.reduce(
    (total, despesa) => total + despesa.valor,
    0
  );

  return (
    <div className="container-fluid py-4">
      {/* Cabeçalho */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Despesas</h1>
          <p className="text-muted">
            Acompanhe todas as saídas financeiras
          </p>
        </div>

        <button
          className="btn text-white px-4 py-2"
          onClick={handleOpenModalDespesa}
          style={{
            backgroundColor: "#d94a4a",
            borderRadius: "10px",
            border: "none",
          }}
        >
          + Nova Despesa
        </button>
      </div>

      {/* Card principal */}
      <div
        className="card border-0 mb-4"
        style={{
          backgroundColor: "#fdf4f4",
          borderRadius: "16px",
        }}
      >
        <div className="card-body p-4 d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-4"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#d94a4a",
              borderRadius: "50%",
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            ↓
          </div>

          <div>
            <h5 className="mb-2">Total de despesas</h5>

            <h1
              className="fw-bold"
              style={{ color: "#d94a4a" }}
            >
              R${" "}
              {totalDespesas.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </h1>

            <p className="text-muted mb-0">
              Este mês
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-3">
          <select className="form-select">
            <option>Este mês</option>
            <option>Últimos 3 meses</option>
            <option>Este ano</option>
          </select>
        </div>

        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar despesa..."
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead>
              <tr>
                <th className="p-4">Data</th>
                <th className="p-4">Descrição</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Forma de Pagamento</th>
                <th className="p-4 text-end">Valor</th>
              </tr>
            </thead>

            <tbody>
              {despesas.map((despesa) => (
                <tr key={despesa.id}>
                  <td className="p-4">{despesa.data}</td>

                  <td className="p-4">
                    {despesa.descricao}
                  </td>

                  <td className="p-4">
                    <span className="badge bg-danger">
                      {despesa.categoria}
                    </span>
                  </td>

                  <td className="p-4">
                    {despesa.pagamento}
                  </td>

                  <td
                    className="p-4 text-end fw-bold"
                    style={{ color: "#d94a4a" }}
                  >
                    - R${" "}
                    {despesa.valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rodapé */}
      <div className="text-center mt-4">
        <p>
          <strong>Dica:</strong> acompanhe seus gastos para identificar oportunidades de economia e melhorar seu planejamento financeiro.
        </p>
      </div>

      <ModalDespesa
        show={showModalDespesa}
        handleClose={handleCloseModalDespesa}
      />
    </div>


  );
}