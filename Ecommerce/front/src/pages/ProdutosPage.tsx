import React, { useState, useEffect } from 'react';
import CadastrarProduto from '../components/CadastrarProduto';
import ListarProdutos from '../components/ListarProdutos';
import { Produto } from '../types/Produto';

const ProdutosPage: React.FC = () => {
  const [reload, setReload] = useState(0);
  const [activeTab, setActiveTab] = useState<'list' | 'register'>('list');
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      const resp = await fetch('http://localhost:5011/api/produto/listar');
      if (resp.ok) {
        setProdutos(await resp.json());
      } else {
        setProdutos([]);
      }
    }
    fetchProdutos();
  }, [reload]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {activeTab === 'register' ? (
          <CadastrarProduto
            onProdutoCadastrado={() => {
              setReload(r => r + 1);
              setActiveTab('list');
            }}
          />
        ) : (
          <ListarProdutos key={reload} produtos={produtos} />
        )}
      </main>
    </div>
  );
};

export default ProdutosPage;
