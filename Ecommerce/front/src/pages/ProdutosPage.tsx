import React, { useState } from 'react';
import CadastrarProduto from '../components/CadastrarProduto';
import ListarProdutos from '../components/ListarProdutos';
import Header from '../components/Header';

const ProdutosPage: React.FC = () => {
  const [reload, setReload] = useState(0);
  const [page, setPage] = useState<'cadastro' | 'lista'>('lista');
  return (
    <>
      <Header onNavigate={setPage} active={page} />
      <div>
        {page === 'cadastro' && <CadastrarProduto onProdutoCadastrado={() => { setReload(r => r + 1); setPage('lista'); }} />}
        {page === 'lista' && <ListarProdutos key={reload} />}
      </div>
    </>
  );
};

export default ProdutosPage;
