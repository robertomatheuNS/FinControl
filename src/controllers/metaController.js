import { metas } from "../models/metas";

export const obterMetas = () => {
    return metas;
};

export const organizarMetas = () => {
    return obterMetas().sort((a, b) => b.progresso - a.progresso).slice(0, 3);
}