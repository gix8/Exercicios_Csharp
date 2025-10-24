import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import Produto from "../models/Produto";

const ListarProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const fetchProdutos = async () => {
    setCarregando(true);
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

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Produtos Disponíveis
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchProdutos}
          className={`transition-all duration-700 ${carregando ? 'animate-spin' : ''}`}
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>

      {carregando ? (
        <div className="flex h-[200px] items-center justify-center">
          <div className="text-muted-foreground">Carregando produtos...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto, index) => (
            <div
              key={produto.id}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-primary/25 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-card-foreground">
                  {produto.nome}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
                    {produto.quantidade} un.
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{produto.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListarProdutos;
