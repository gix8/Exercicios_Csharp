import React, { useState } from "react";
import Produto from "../models/Produto";
import "../Index.css";

interface Props {
  onProdutoCadastrado?: (produto: Produto) => void;
}

const CadastrarProduto: React.FC<Props> = ({ onProdutoCadastrado }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [aberto, setAberto] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setSucesso(false);
    let precoNum = Number(preco.replace(",", "."));
    if (isNaN(precoNum) || precoNum < 0) {
      setErro("Digite um preço válido.");
      setLoading(false);
      return;
    }
    try {
      const resposta = await fetch(
        "http://localhost:5011/api/produto/cadastrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, descricao, preco: precoNum, quantidade }),
        }
      );
      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar produto: " + resposta.statusText);
      }
      const produto: Produto = await resposta.json();
      setSucesso(true);
      setNome("");
      setDescricao("");
      setPreco("");
      setQuantidade(1);
      if (onProdutoCadastrado) onProdutoCadastrado(produto);
    } catch (err: any) {
      setErro(err?.message ?? "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="cadastro-container"
      style={{
        marginBottom: 32,
        maxWidth: 520,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <button
        className="reload-btn"
        type="button"
        style={{
          width: "100%",
          borderRadius: aberto ? "12px 12px 0 0" : 12,
          marginBottom: 0,
          fontSize: "1.1rem",
          letterSpacing: 0.5,
          boxShadow: aberto ? "none" : undefined,
        }}
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
      >
        {aberto
          ? "Fechar Cadastro de Produto"
          : "Cadastrar Novo Produto"}
      </button>
      <div
        style={{
          maxHeight: aberto ? 900 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(.23,1.01,.32,1)",
          background: "#fff",
          borderRadius: aberto ? "0 0 12px 12px" : "0 0 12px 12px",
          boxShadow: aberto ? "0 2px 12px #c7d2fe33" : "none",
          padding: aberto ? 24 : "0 24px",
          opacity: aberto ? 1 : 0.5,
        }}
      >
        {aberto && (
          <form
            className="produto-form"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#2d6cdf",
                marginBottom: 10,
                fontSize: "1.4rem",
                letterSpacing: 0.5,
              }}
            >
              Cadastrar Produto
            </h2>
            <label className="input-label">
              Nome:
              <input
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="input"
                maxLength={60}
                style={{ width: "100%" }}
              />
            </label>
            <label className="input-label">
              Descrição:
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="input"
                maxLength={200}
                style={{ width: "100%", minHeight: 48 }}
              />
            </label>
            <label className="input-label">
              Preço:
              <input
                required
                type="text"
                inputMode="decimal"
                pattern="[0-9.,]*"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="input"
                style={{ width: 140 }}
                placeholder="Ex: 19,99"
              />
            </label>
            <label className="input-label">
              Quantidade:
              <input
                required
                type="number"
                min={1}
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="input"
                style={{ width: 120 }}
              />
            </label>
            <button
              className="reload-btn"
              type="submit"
              disabled={loading}
              style={{ marginTop: 10, fontSize: "1.08rem" }}
            >
              {loading ? "Cadastrando..." : "Cadastrar Produto"}
            </button>
            {erro && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {erro}
              </p>
            )}
            {sucesso && (
              <p
                style={{
                  color: "#1a8c3b",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Produto cadastrado com sucesso!
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default CadastrarProduto;
