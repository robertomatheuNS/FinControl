import { Card } from "./CardResumo";
import { converterMoedaParaNumero } from "../controllers/dashboardController";

export default function RecebimentosRecentes({ receitas = [] }) {
  const formatarMoeda = (valor) =>
    Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const ultimas3 = receitas
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 3);

  return (
    <Card className="h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Recebimentos Recentes</h5>

        {ultimas3.length === 0 ? (
          <p className="text-muted">Nenhum recebimento registrado.</p>
        ) : (
          ultimas3.map((receita, index) => (
            <div
              key={receita.id || index}
              className="d-flex justify-content-between mb-2"
            >
              <span>{receita.descricao || receita.categoria}</span>
              <strong>{formatarMoeda(converterMoedaParaNumero(receita.valor))}</strong>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}