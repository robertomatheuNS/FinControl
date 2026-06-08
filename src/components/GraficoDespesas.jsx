import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { converterMoedaParaNumero } from "../controllers/dashboardController";

export default function GraficoDespesas({ despesas = [] }) {
  const cores = [
    "#4caf50",
    "#2196f3",
    "#ffb74d",
    "#9c27b0",
    "#f44336",
    "#00bcd4",
    "#ff9800",
    "#8bc34a",
    "#673ab7",
    "#607d8b",
  ];

  const formatarMoeda = (valor) =>
    Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const categoriasMap = despesas.reduce((acc, despesa) => {
    const nome = despesa.categoria?.trim() || "Sem categoria";
    const valor = converterMoedaParaNumero(despesa.valor);

    if (!acc[nome]) {
      acc[nome] = 0;
    }

    acc[nome] += valor;
    return acc;
  }, {});

  const categorias = Object.entries(categoriasMap).map(
    ([nome, valor], index) => ({
      id: nome,
      nome,
      valorText: formatarMoeda(valor),
      valorNum: valor,
      cor: cores[index % cores.length],
    })
  );

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="d-flex flex-column h-100">
      <h5 className="fw-bold mb-4">Despesas por categoria</h5>

      <div className="row flex-grow-1 align-items-center">
        <div className="col-5" style={{ height: "220px" }}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categorias}
                dataKey="valorNum"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={0}
                labelLine={false}
                label={renderCustomizedLabel}
                stroke="none"
              >
                {categorias.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-7">
          {categorias.length === 0 ? (
            <p className="text-muted">Nenhuma despesa cadastrada.</p>
          ) : (
            categorias.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-3 pe-3"
              >
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="rounded-circle"
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: item.cor,
                    }}
                  ></span>
                  <span
                    className="fw-semibold text-dark"
                    style={{ fontSize: "14px" }}
                  >
                    {item.nome}
                  </span>
                </div>

                <span
                  className="text-muted fw-semibold"
                  style={{ fontSize: "14px" }}
                >
                  {item.valorText}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-end mt-2">
        <a
          href="#"
          className="text-success text-decoration-none fw-bold"
          style={{ fontSize: "14px" }}
        >
          Ver relatório completo
        </a>
      </div>
    </div>
  );
}
