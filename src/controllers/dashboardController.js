import { listarReceitas } from "./receitaController";
import { listarDespesas } from "./despesaController";

export async function carregarReceitas() {
  try {
    const todas = await listarReceitas();
    return todas;
  } catch (err) {
    console.error("Erro ao carregar receitas:", err);
    return [];
  }
}

export async function carregarDespesas() {
  try {
    const todas = await listarDespesas();
    return todas;
  } catch (err) {
    console.error("Erro ao carregar despesas:", err);
    return [];
  }
}

export const converterMoedaParaNumero = (valor) => {
  if (typeof valor === "number") return valor;
  if (!valor) return 0;

  return (
    Number(
      String(valor)
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(/,/g, ".")
        .replace(/\s/g, "")
        .trim()
    ) || 0
  );
};

export const formatarMoeda = (valor) =>
  Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export const calcularTotalReceitas = (receitas) =>
  receitas.reduce(
    (acc, item) => acc + converterMoedaParaNumero(item.valor),
    0
  );

export const calcularTotalDespesas = (despesas) =>
  despesas.reduce(
    (acc, item) => acc + converterMoedaParaNumero(item.valor),
    0
  );

export const calcularSaldoAtual = (receitas, despesas) =>
  calcularTotalReceitas(receitas) - calcularTotalDespesas(despesas);
