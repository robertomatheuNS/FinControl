import { Card } from "./CardResumo";
import { converterMoedaParaNumero } from "../controllers/dashboardController";

export default function TabelaReceitas({ receitas = [] }) {
  const formatarMoeda = (valor) =>
    Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const formatarData = (data) => {
    if (!data) return "";
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <Card className="shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5 className="fw-bold">Todas as Transações</h5>

          <select className="form-select w-auto">
            <option>Este mês</option>
          </select>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Origem</th>
              <th>Forma</th>
              <th>Valor</th>
            </tr>
          </thead>

          <tbody>
            {receitas.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  Nenhuma receita cadastrada.
                </td>
              </tr>
            ) : (
              receitas.map((receita) => (
                <tr key={receita.id}>
                  <td>{formatarData(receita.data)}</td>
                  <td>{receita.descricao}</td>
                  <td>
                    <span className="badge bg-success">
                      {receita.categoria}
                    </span>
                  </td>
                  <td>{receita.formaPagamento}</td>
                  <td>{formatarMoeda(converterMoedaParaNumero(receita.valor))}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}