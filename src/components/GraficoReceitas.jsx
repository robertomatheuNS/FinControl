import { Card } from "./CardResumo";

export default function GraficoReceitas() {
  return (
    <Card className="h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-3">
          Visão Geral por Origem
        </h5>

        <ul className="list-unstyled">
          <li>💼 Salário - 70%</li>
          <li>💻 Freelance - 15%</li>
          <li>📈 Investimentos - 10%</li>
          <li>📦 Outros - 5%</li>
        </ul>
      </div>
    </Card>
  );
}