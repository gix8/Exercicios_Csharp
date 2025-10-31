import React, { useState } from "react";
import { Produto } from "../types/Produto";
import "./Produtos.css";

interface Props {
  onProdutoCadastrado?: (produto: Produto) => void;
}

const CadastrarProduto: React.FC<Props> = ({ onProdutoCadastrado }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [aberto, setAberto] = useState(true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);
    // Validação de preço
    const precoNum = Number(preco.replace(",", "."));
    if (isNaN(precoNum) || precoNum <= 0) {
      setErro("Preço inválido.");
      setLoading(false);
      return;
    }
    if (!nome.trim() || !descricao.trim() || !quantidade.trim()) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }
    const novoProduto: Produto = {
      id: crypto.randomUUID(),
      nome,
      descricao,
      preco: precoNum,
      quantidade: Number(quantidade),
      criadoEm: new Date().toISOString(),
    };
    try {
      const resp = await fetch("http://localhost:5000/api/produto/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto),
      });
      if (!resp.ok) {
        const msg = await resp.text();
        setErro(msg || "Erro ao cadastrar produto");
        setLoading(false);
        return;
      }
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidade("");
      setSucesso("Produto cadastrado com sucesso!");
      onProdutoCadastrado?.(novoProduto);
    } catch (e: any) {
      setErro(e.message || "Erro ao cadastrar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button className="toggle-btn" onClick={() => setAberto((a) => !a)}>
        {aberto ? "Fechar formulário" : "Cadastrar Produto"}
      </button>
      {aberto && (
        <div className="form-wrapper">
          <form
            className="produto-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <label>
              Nome:
              <input
                className="input"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </label>
            <label>
              Descrição:
              <textarea
                className="textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </label>
            <label>
              Preço:
              <input
                className="input"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </label>
            <label>
              Quantidade:
              <input
                className="input"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </label>
            <button
              className="toggle-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
            {erro && <div className="mensagem erro">{erro}</div>}
            {sucesso && <div className="mensagem">{sucesso}</div>}
          </form>
        </div>
      )}
    </div>
  );
};

export default CadastrarProduto;