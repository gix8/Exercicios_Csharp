import React, { useState } from 'react';
import CadastrarProduto from '../components/CadastrarProduto';
import ListarProdutos from '../components/ListarProdutos';

const ProdutosPage: React.FC = () => {
  const [reload, setReload] = useState(0);
  return (
    <div>
      <CadastrarProduto onProdutoCadastrado={() => setReload(r => r + 1)} />
      <ListarProdutos key={reload} />
    </div>
  );
};

export default ProdutosPage;
