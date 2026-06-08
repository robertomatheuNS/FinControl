import { Card } from "./CardResumo";

export default function TabelaReceitas() {
  return (
    <Card className="shadow-sm border-0">
      <div className="card-body">

        <div className="d-flex justify-content-between mb-3">
          <h5 className="fw-bold">
            Todas as Transações
          </h5>

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
            <tr>
              <td>04/06/2024</td>
              <td>Salário</td>
              <td>
                <span className="badge bg-success">
                  Salário
                </span>
              </td>
              <td>Pagamento</td>
              <td>R$ 7.500,00</td>
            </tr>

            <tr>
              <td>03/06/2024</td>
              <td>Freelance 1</td>
              <td>
                <span className="badge bg-primary">
                  Freelance
                </span>
              </td>
              <td>PIX</td>
              <td>R$ 2.200,00</td>
            </tr>

            <tr>
              <td>02/06/2024</td>
              <td>Freelance 2</td>
              <td>
                <span className="badge bg-info">
                  Freelance
                </span>
              </td>
              <td>PIX</td>
              <td>R$ 1.500,00</td>
            </tr>
          </tbody>

        </table>
      </div>
    </Card>
  );
}