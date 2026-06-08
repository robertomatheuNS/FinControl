const API_URL = "http://localhost:3001/receitas";

export async function listarReceitas() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar receitas");
  }

  return response.json();
}

export async function criarReceita(receita) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(receita),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar receita");
  }

  return response.json();
}
