import React, { useEffect, useState } from 'react';
import { Produto } from '../types/Produto';
import CadastrarProduto from '../components/CadastrarProduto';
import ListarProdutos from '../components/ListarProdutos';
import '../components/Produtos.css';

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [view, setView] = useState<'list' | 'cadastro'>('list');

  async function carregarProdutos() {
    setLoading(true);
    setErro('');
    try {
      const resp = await fetch('http://localhost:5011/api/produto/listar');
      if (!resp.ok) throw new Error('Erro ao buscar produtos');
      const data = await resp.json();
      setProdutos(data);
    } catch (e: any) {
      setErro(e.message || 'Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleNovoProduto(produto: Produto) {
    setErro('');
    try {
      const resp = await fetch('http://localhost:5011/api/produto/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
      });
      if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(msg || 'Erro ao cadastrar produto');
      }
      await carregarProdutos();
      setView('list');
    } catch (e: any) {
      setErro(e.message || 'Erro ao cadastrar produto');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cor-fundo)' }}>
      <header style={{
        width: '100%',
        background: 'var(--cor-fundo-claro)',
        color: 'var(--cor-texto)',
        padding: '1.2rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px #0002',
        marginBottom: '2rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <span style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '2px', marginLeft: '2rem' }}>Ecommerce</span>
        <nav style={{ marginRight: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setView('list')}
            style={{
              background: view === 'list' ? 'var(--cor-primaria)' : 'transparent',
              color: view === 'list' ? '#fff' : 'var(--cor-texto)',
              border: 'none',
              borderRadius: 8,
              padding: '0.5rem 1.2rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Lista
          </button>
          <button
            onClick={() => setView('cadastro')}
            style={{
              background: view === 'cadastro' ? 'var(--cor-primaria)' : 'transparent',
              color: view === 'cadastro' ? '#fff' : 'var(--cor-texto)',
              border: 'none',
              borderRadius: 8,
              padding: '0.5rem 1.2rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Cadastro
          </button>
        </nav>
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{textAlign: 'center', margin: '2rem 0'}}>Produtos</h1>
        {view === 'cadastro' ? (
          <CadastrarProduto onProdutoCadastrado={handleNovoProduto} />
        ) : null}
        {erro && <div className="mensagem erro">{erro}</div>}
        {view === 'list' ? (
          loading ? <div className="mensagem">Carregando...</div> : <ListarProdutos produtos={produtos} onRecarregar={carregarProdutos} />
        ) : null}
      </main>
    </div>
  );
};

export default Produtos;
