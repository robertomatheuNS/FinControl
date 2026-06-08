import { useEffect, useState } from "react";
import { listarDespesas } from "../controllers/despesaController";
import { listarReceitas } from "../controllers/receitaController";

export default function UltimasTransacoes() {

  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    async function carregar() {
      const receitas = await listarReceitas();
      const despesas = await listarDespesas();

      const formatadasReceitas = receitas.map((r) => ({
        id: r.id,
        data: r.data,
        descricao: r.descricao,
        categoria: r.categoria,
        tipo: "receita",
        valor: r.valor,
      }));

      const formatadasDespesas = despesas.map((d) => ({
        id: d.id,
        data: d.data,
        descricao: d.descricao,
        categoria: d.categoria,
        tipo: "despesa",
        valor: d.valor,
      }));

      const todas = [...formatadasReceitas, ...formatadasDespesas];

      const ordenadas = todas.sort(
        (a, b) => new Date(b.data) - new Date(a.data)
      );

      setTransacoes(ordenadas.slice(0, 5));
    }
    carregar();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <h5 className="fw-bold mb-4">Últimas transações</h5>

      <div className="table-responsive flex-grow-1">
        <table
          className="table align-middle text-nowrap"
          style={{ fontSize: "14px" }}
        >
          <thead>
            <tr>
              <th
                className="text-muted border-0 pb-3"
                style={{ fontWeight: "600" }}
              >
                Data
              </th>
              <th
                className="text-muted border-0 pb-3"
                style={{ fontWeight: "600" }}
              >
                Descrição
              </th>
              <th
                className="text-muted border-0 pb-3"
                style={{ fontWeight: "600" }}
              >
                Categoria
              </th>
              <th
                className="text-muted border-0 pb-3"
                style={{ fontWeight: "600" }}
              >
                Tipo
              </th>
              <th
                className="text-muted border-0 pb-3"
                style={{ fontWeight: "600" }}
              >
                Valor
              </th>
            </tr>
          </thead>

          <tbody>
            {transacoes.map((t) => (
              <tr key={t.id}>
                <td className="py-3 border-bottom border-light">{t.data}</td>
                <td className="py-3 border-bottom border-light fw-semibold text-dark">
                  {t.descricao}
                </td>
                <td className="py-3 border-bottom border-light">
                  {t.categoria}
                </td>

                <td className="py-3 border-bottom border-light">
                  {t.tipo === "receita" ? (
                    <i className="bi bi-arrow-up text-success fs-5"></i>
                  ) : (
                    <i className="bi bi-arrow-down text-danger fs-5"></i>
                  )}
                </td>

                <td
                  className={`py-3 border-bottom border-light fw-bold ${t.tipo === "receita" ? "text-success" : "text-danger"}`}
                >
                  {t.valor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-3">
      </div>
    </div>
  );
}
