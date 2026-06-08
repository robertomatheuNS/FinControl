import { Card } from "./CardResumo";

export default function RecebimentosRecentes() {
  return (
    <Card className="h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-3">
          Recebimentos Recentes
        </h5>

        <div className="d-flex justify-content-between mb-2">
          <span>Salário</span>
          <strong>R$ 7.500,00</strong>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span>Freelance 1</span>
          <strong>R$ 2.200,00</strong>
        </div>

        <div className="d-flex justify-content-between">
          <span>Freelance 2</span>
          <strong>R$ 1.500,00</strong>
        </div>
      </div>
    </Card>
  );
}