import { Card } from "./CardResumo";

export default function FontesRenda() {
  return (
    <Card className="shadow-sm border-0 fontes-renda-card">
      <div className="card-body">
        <h5 className="fw-bold mb-4">
          Principais Fontes de Renda
        </h5>

        <p className="mb-1">Salário</p>
        <div className="progress mb-3">
          <div
            className="progress-bar bg-success"
            style={{ width: "70%" }}
          >
            70%
          </div>
        </div>

        <p className="mb-1">Freelance 1</p>
        <div className="progress mb-3">
          <div
            className="progress-bar bg-primary"
            style={{ width: "20%" }}
          >
            20%
          </div>
        </div>

        <p className="mb-1">Freelance 2</p>
        <div className="progress">
          <div
            className="progress-bar bg-info"
            style={{ width: "10%" }}
          >
            10%
          </div>
        </div>
      </div>
    </Card>
  );
}