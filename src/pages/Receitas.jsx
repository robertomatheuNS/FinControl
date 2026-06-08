import React, { useState } from "react";
import "../styles/receitas.css";
import ModalReceita from "../components/ModalReceita";

const Receitas = () => {

    const [showModalReceita, setShowModalReceita] = useState(false);
    const handleOpenModalReceita = () => setShowModalReceita(true);
    const handleCloseModalReceita = () => setShowModalReceita(false);

    const receitas = [
        { data: "04/06/2024", descricao: "Salário", origem: "Salário", forma: "Pagamento", valor: 7500 },
        { data: "03/06/2024", descricao: "Freelance 1", origem: "Freelance", forma: "Transferência", valor: 2200 },
        { data: "02/06/2024", descricao: "Freelance 2", origem: "Freelance", forma: "Pix", valor: 1500 },
    ];

    const total = receitas.reduce((acc, r) => acc + r.valor, 0);

    return (
        <div className="receitas-container">
            <header className="receitas-header">
                <h2>Receitas</h2>
                <button className="btn-nova" onClick={handleOpenModalReceita}>+ Nova Receita</button>
            </header>

            <section className="resumo">
                <div className="resumo-item">
                    <h3>Total de Receitas do Mês</h3>
                    <p className="valor-total">R$ {total.toLocaleString("pt-BR")}</p>
                    <small>Este mês</small>
                </div>

                <div className="resumo-item">
                    <h3>Visão Geral por Origem</h3>
                    <div className="chart"></div>
                    <p>Salário - 70%<br />Freelance - 15%<br />Investimentos - 10%<br />Outros - 5%</p>
                </div>

                <div className="resumo-item recebimentos">
                    <h3>Recebimentos Recentes</h3>
                    <ul>
                        {receitas.map((r, i) => (
                            <li key={i}>
                                {r.descricao}: <strong>R$ {r.valor.toLocaleString("pt-BR")}</strong>
                            </li>
                        ))}
                    </ul>
                    <small>Período: Este mês 📅</small>
                </div>
            </section>

            <section className="visao-mensal">
                <h3>Visão Mensal de Entradas</h3>
                <div className="progress-bar"><div className="progress salario">Salário - R$ 7.500,00</div></div>
                <div className="progress-bar"><div className="progress freelance1">Freelance 1 - R$ 2.200,00</div></div>
                <div className="progress-bar"><div className="progress freelance2">Freelance 2 - R$ 1.500,00</div></div>
                <div className="progress-bar"><div className="progress outros">Outros - R$ 50,00</div></div>

                <h3>Todas as Transações (Entradas)</h3>
                <table>
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
                        {receitas.map((r, i) => (
                            <tr key={i}>
                                <td>{r.data}</td>
                                <td>{r.descricao}</td>
                                <td><span className="origem">{r.origem}</span></td>
                                <td>{r.forma}</td>
                                <td>R$ {r.valor.toLocaleString("pt-BR")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <ModalReceita
                show={showModalReceita}
                handleClose={handleCloseModalReceita}
            />
        </div>
    );
};

export default Receitas;
