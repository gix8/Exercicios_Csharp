import React, { useState } from 'react';
import { Header } from '../components/Header';
import CadastrarProduto from '../components/CadastrarProduto';
import ListarProdutos from '../components/ListarProdutos';

const ProdutosPage: React.FC = () => {
  const [reload, setReload] = useState(0);
  const [activeTab, setActiveTab] = useState<'list' | 'register'>('list');

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {activeTab === 'register' ? (
          <CadastrarProduto
            onProdutoCadastrado={() => {
              setReload(r => r + 1);
              setActiveTab('list');
            }}
          />
        ) : (
          <ListarProdutos key={reload} />
        )}
      </main>
    </div>
  );
};

export default ProdutosPage;
