import { Card } from "./CardResumo";
import { converterMoedaParaNumero } from "../controllers/dashboardController";

export default function FontesRenda({ receitas = [] }) {
  const categoriasMap = receitas.reduce((acc, receita) => {
    const nome = receita.categoria?.trim() || "Sem categoria";
    const valor = converterMoedaParaNumero(receita.valor);

    if (!acc[nome]) {
      acc[nome] = 0;
    }

    acc[nome] += valor;
    return acc;
  }, {});

  const totalReceitas = Object.values(categoriasMap).reduce(
    (sum, val) => sum + val,
    0
  );

  const top3 = Object.entries(categoriasMap)
    .map(([nome, valor]) => ({
      nome,
      valor,
      percentual: totalReceitas > 0 ? (valor / totalReceitas) * 100 : 0,
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 3);

  const cores = ["#4caf50", "#2196f3", "#ffb74d"];

  return (
    <Card className="shadow-sm border-0 fontes-renda-card">
      <div className="card-body">
        <h5 className="fw-bold mb-4">Principais Fontes de Renda</h5>

        {top3.length === 0 ? (
          <p className="text-muted">Nenhuma receita cadastrada.</p>
        ) : (
          top3.map((item, index) => (
            <div key={item.nome} className="fonte-renda-item mb-3 p-3 rounded-3">
              <p className="mb-1 fw-semibold">{item.nome}</p>
              <div className="progress mb-0">
                <div
                  className="progress-bar"
                  style={{
                    width: `${item.percentual}%`,
                    backgroundColor: cores[index],
                  }}
                >
                  {item.percentual.toFixed(0)}%
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}