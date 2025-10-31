import React from "react";
import { Produto } from "../types/Produto";
import "./Produtos.css";

interface Props {
  produtos: Produto[];
  onRecarregar?: () => void;
}

const ListarProdutos: React.FC<Props> = ({ produtos }) => {
  if (!produtos.length) {
    return <div className="mensagem erro">Nenhum produto cadastrado.</div>;
  }
  return (
    <div className="produto-lista">
      {produtos.map((produto, i) => (
        <div
          className="produto-card"
          key={produto.id}
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <div className="produto-nome">{produto.nome}</div>
          <div className="produto-descricao">{produto.descricao}</div>
          <div className="produto-preco">
            {produto.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
          <div className="produto-quantidade">
            Qtd: {produto.quantidade}
          </div>
          <div className="produto-data">
            Cadastrado em:{" "}
            {new Date(produto.criadoEm).toLocaleString("pt-BR")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListarProdutos;
