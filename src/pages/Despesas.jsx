import React from "react";

export default function Despesas() {
    const despesas = [
        {
        data: "03/06/2024",
        descricao: "Transporte (Uber)",
        categoria: "Transporte",
        categoriaClass: "bg-primary-subtle text-primary",
        pagamento: "Pix",
        valor: "25,00",
        icone: "🚕",
        },
        {
        data: "02/06/2024",
        descricao: "Conta de luz",
        categoria: "Contas",
        categoriaClass: "bg-warning-subtle text-warning",
        pagamento: "Débito Automático",
        valor: "200,00",
        icone: "🏠",
        },
        {
        data: "01/06/2024",
        descricao: "Alimentação",
        categoria: "Alimentação",
        categoriaClass: "bg-danger-subtle text-danger",
        pagamento: "Cartão de Débito",
        valor: "120,00",
        icone: "🍴",
        },
        {
        data: "31/05/2024",
        descricao: "Lazer",
        categoria: "Lazer",
        categoriaClass: "bg-info-subtle text-info",
        pagamento: "Pix",
        valor: "100,00",
        icone: "🎮",
        },
    ];

    return (
        <div className="container-fluid py-3">

        {/* Cabeçalho */}
        <div className="d-flex justify-content-between align-items-start mb-4">

            <div>
            <h1 className="fw-bold mb-2">Despesas</h1>
            <p className="text-muted">
                Acompanhe todas as saídas
            </p>
            </div>

            <button
            className="btn text-white px-4 py-2"
            style={{
                backgroundColor: "#d94b4b",
                borderRadius: "10px",
                fontWeight: "600",
                minWidth: "180px",
            }}
            >
            + Nova Despesa
            </button>

        </div>

        {/* Card Total */}
        <div
            className="card border-0 mb-4"
            style={{
            backgroundColor: "#fff5f5",
            borderRadius: "15px",
            }}
        >
            <div className="card-body p-4">

            <div className="d-flex align-items-center">

                <div
                className="d-flex justify-content-center align-items-center me-4"
                style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#d94b4b",
                    borderRadius: "50%",
                    color: "white",
                    fontSize: "32px",
                }}
                >
                ↘
                </div>

                <div>
                <h5 className="mb-1">
                    Total de despesas
                </h5>

                <h1
                    className="fw-bold mb-1"
                    style={{ color: "#d94b4b" }}
                >
                    R$ 1.500,00
                </h1>

                <p className="text-muted mb-0">
                    Este mês
                </p>
                </div>

            </div>

            </div>
        </div>

        {/* Filtros */}
        <div className="row mb-4">

            <div className="col-md-3">
            <select
                className="form-select"
                style={{ height: "55px" }}
            >
                <option>Este mês</option>
                <option>Últimos 3 meses</option>
                <option>Este ano</option>
            </select>
            </div>

            <div className="col-md-9">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar despesa..."
                style={{ height: "55px" }}
            />
            </div>

        </div>

        {/* Tabela */}
        <div
            className="card border-0 shadow-sm"
            style={{
            borderRadius: "15px",
            }}
        >
            <div className="card-body p-0">

            <table className="table align-middle mb-0">

                <thead>
                <tr>
                    <th className="p-4">Data</th>
                    <th className="p-4">Descrição</th>
                    <th className="p-4">Categoria</th>
                    <th className="p-4">
                    Forma de Pagamento
                    </th>
                    <th className="p-4 text-end">
                    Valor
                    </th>
                    <th></th>
                </tr>
                </thead>

                <tbody>

                {despesas.map((item, index) => (
                    <tr key={index}>

                    <td className="p-4">

                        <div className="d-flex align-items-center gap-3">

                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            backgroundColor: "#d94b4b",
                            color: "white",
                            }}
                        >
                            {item.icone}
                        </div>

                        {item.data}

                        </div>

                    </td>

                    <td className="p-4">
                        {item.descricao}
                    </td>

                    <td className="p-4">

                        <span
                        className={`badge rounded-pill px-3 py-2 ${item.categoriaClass}`}
                        >
                        {item.categoria}
                        </span>

                    </td>

                    <td className="p-4">
                        {item.pagamento}
                    </td>

                    <td
                        className="p-4 text-end fw-bold"
                        style={{
                        color: "#c94a4a",
                        }}
                    >
                        - R$ {item.valor}
                    </td>

                    <td
                        className="text-center"
                        style={{
                        fontSize: "24px",
                        color: "#999",
                        }}
                    >
                        ›
                    </td>

                    </tr>
                ))}

                </tbody>

            </table>

            </div>
        </div>

        {/* Dica */}
        <div className="text-center mt-5">
            <p>
            <strong>Dica:</strong> acompanhe seus gastos por categoria e identifique onde pode economizar.
            </p>
        </div>

        </div>
    );
}