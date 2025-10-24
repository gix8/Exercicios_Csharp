//Componente
// - Composto por HTML, CSS e JS ou TS


//Regras para ser um componente:
// - Precisa ser uma função
// - Precisa retornar apenas UM elemento HTML pai
// - Exportar componente

import React, { useEffect, useState } from "react";
import "./ListarProdutos.css";
import Produto from "./models/Produto";

function ListarProdutos() {
  
  //Realizar operações quando o componente for carregado
    useEffect(() => {
        console.log("Componente foi carregado.");

        obterProdutos();
    }, []);

    // estado para armazenar produtos e controlar loading/erro
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function obterProdutos() {
        setLoading(true);
        setError(null);
        try {
            const resposta = await fetch("http://localhost:5011/api/produto/listar")

            if (!resposta.ok) {
                throw new Error("Não foi possível obter a lista de produtos. " + resposta.statusText);
            }

            const dados = await resposta.json();
            console.table({dados});

            // converte os campos para minúsculo se vierem em maiúsculo
            const produtosConvertidos: Produto[] = (Array.isArray(dados) ? dados : []).map((p: any) => ({
                id: p.id ?? p.Id,
                nome: p.nome ?? p.Nome,
                descricao: p.descricao ?? p.Descricao,
                preco: p.preco ?? p.Preco,
                quantidade: p.quantidade ?? p.Quantidade,
                criadoEm: p.criadoEm ?? p.CriadoEm,
            }));
            setProdutos(produtosConvertidos);
            setLoading(false);
        } catch (error: any) {
            console.log("Deu erro ao obter produtos.", error);
            setError(error?.message ?? 'Erro ao obter produtos');
            setLoading(false);
        }
        
    }

    // o return é a parte visual do componente
  return (
    <div id="listar-produtos">
      <h2>Listar Produtos</h2>
      <button className="reload-btn" onClick={obterProdutos} disabled={loading}>
        {loading ? 'Carregando...' : 'Recarregar Produtos'}
      </button>
      {loading ? (
        <p style={{textAlign:'center'}}>Carregando produtos...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign:'center' }}>{error}</p>
      ) : produtos.length === 0 ? (
        <p style={{textAlign:'center'}}>Nenhum produto encontrado.</p>
      ) : (
        <ul className="produto-lista">
          {produtos.map((p, idx) => (
            <li key={p.id} className="produto-card" style={{animationDelay: `${idx * 0.07}s`}}>
              <h3>{p.nome}</h3>
              {p.descricao && <p className="descricao">{p.descricao}</p>}
              <p className="preco">Preço: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.preco)}</p>
              <p className="quantidade">Quantidade: {p.quantidade}</p>
              {p.criadoEm && <small>Criado em: {new Date(p.criadoEm).toLocaleString('pt-BR')}</small>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 

export default ListarProdutos;