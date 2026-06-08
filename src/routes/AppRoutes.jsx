import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";
import Despesas from "../pages/Despesas";
import Metas from "../pages/Metas";
import Receitas from "../pages/Receitas";


export default function AppRoutes() {
    return (
        <div
            className="d-flex vh-100 bg-light"
            style={{ overflow: "hidden" }}
        >
            <Sidebar />

            <main
                className="d-flex flex-column flex-grow-1 h-100"
                style={{
                    marginLeft: "260px",
                    overflow: "hidden",
                }}
            >
                <div className="px-4 pt-4 pb-2">
                    <Header
                        title="Dashboard"
                        subtitle="Resumo da sua vida financeira"
                    />
                </div>

                <div className="ps-1 pe-4 pb-3 flex-grow-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/despesas" element={<Despesas />} />
                        <Route path="/metas" element={<Metas />} />
                        <Route path="*" element={<h1>Página não desenvolvida</h1>} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}