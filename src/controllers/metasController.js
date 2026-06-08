const API_URL = "http://localhost:3001/metas";

export async function obterMetas() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar metas");
  }

  return response.json();
}

export async function organizarMetas() {
  const metas = await obterMetas();

  return metas
    .sort((a, b) => b.progresso - a.progresso)
    .slice(0, 3);
}

export async function criarMeta(meta) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meta),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar meta");
  }

  return response.json();
}



export async function atualizarMeta(id, dadosAtualizados) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosAtualizados),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar meta");
  }

  return response.json();
}