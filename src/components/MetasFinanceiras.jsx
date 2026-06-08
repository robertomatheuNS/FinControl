export default function MetasFinanceiras() {
  return (
    // d-flex flex-column h-100 garante que o link "Ver todas" vá parar lá no final da caixa branca
    <div className="d-flex flex-column h-100">
      {/* Título do Componente */}
      <h5 className="fw-bold mb-4">Metas financeiras</h5>

      {/* Cartão Interno da Meta (Com borda suave e cantos arredondados) */}
      <div className="card border rounded-4 p-4 mb-3 shadow-none">
        {/* Cabeçalho do Cartão (Ícone, Textos e Porcentagem) */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-3">
            {/* Ícone Roxo Claro */}
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#f3e8ff",
                color: "#6f42c1",
              }}
            >
              <i className="bi bi-laptop fs-5"></i>
            </div>

            {/* Textos */}
            <div>
              <h6 className="fw-bold mb-0 text-dark">Comprar Notebook</h6>
              <small className="text-muted">Meta: R$ 4.000,00</small>
            </div>
          </div>

          {/* Porcentagem Limpa (Sem o círculo em volta) */}
          <span className="fw-bold fs-4" style={{ color: "#6f42c1" }}>
            62%
          </span>
        </div>

        {/* Barra de Progresso do Bootstrap */}
        <div
          className="progress mb-2"
          style={{ height: "8px", backgroundColor: "#f0f0f0" }}
        >
          <div
            className="progress-bar rounded-pill"
            role="progressbar"
            style={{ width: "62%", backgroundColor: "#6f42c1" }}
            aria-valuenow="62"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        {/* Valores Dinâmicos abaixo da barra */}
        <span className="fw-bold text-dark" style={{ fontSize: "13px" }}>
          R$ 2.500,00{" "}
          <span className="text-muted fw-semibold">/ R$ 4.000,00</span>
        </span>
      </div>
    </div>
  );
}
