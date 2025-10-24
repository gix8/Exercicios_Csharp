import React, { useEffect, useState } from "react";
import "../Index.css";
import Produto from "../models/Produto";

const ListarProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost:5011/api/produto/listar");
        const data = await response.json();
        setProdutos(
          Array.isArray(data)
            ? data.map((p: any) => ({
                id: p.id ?? p.Id,
                nome: p.nome ?? p.Nome,
                descricao: p.descricao ?? p.Descricao,
                preco: p.preco ?? p.Preco,
                quantidade: p.quantidade ?? p.Quantidade,
                criadoEm: p.criadoEm ?? p.CriadoEm,
              }))
            : []
        );
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchProdutos();
  }, []);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="listar-produtos">
      <h1>Lista de Produtos</h1>
      <div className="produtos-container">
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-card">
            <h2>{produto.nome}</h2>
            <p>Preço: R$ {produto.preco.toFixed(2)}</p>
            <p>Descrição: {produto.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarProdutos;
