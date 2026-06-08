const API_URL = "http://localhost:3001/despesas";

export async function listarDespesas() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar despesas");
  }

  return response.json();
}

export async function criarDespesa(despesa) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(despesa),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar despesa");
  }

  return response.json();
}

