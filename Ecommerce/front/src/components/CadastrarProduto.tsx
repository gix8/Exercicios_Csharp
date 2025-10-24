import React, { useState } from "react";
import { Package } from "lucide-react";
import { Button } from "./ui/button";
import Produto from "../models/Produto";

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
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Cadastrar Produto</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Nome do Produto
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full rounded-md border bg-background/50 px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Digite o nome do produto"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Descrição
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="w-full rounded-md border bg-background/50 px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px]"
            placeholder="Digite a descrição do produto"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Preço (R$)
            </label>
            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              className="w-full rounded-md border bg-background/50 px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Quantidade
            </label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              min={1}
              required
              className="w-full rounded-md border bg-background/50 px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {erro && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="rounded-md bg-primary/10 p-3 text-sm text-primary">
            Produto cadastrado com sucesso!
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          variant="gradient"
        >
          {loading ? "Cadastrando..." : "Cadastrar Produto"}
        </Button>
      </form>
    </div>
  );
};

export default CadastrarProduto;