# Sistema de Produtos

Sistema simples de cadastro e listagem de produtos desenvolvido com **React + TypeScript** e **CSS puro** (sem Tailwind).

## Estrutura de Arquivos

```
src/
├── types/
│   └── Produto.ts           # Interface do modelo Produto
├── components/
│   ├── CadastrarProduto.tsx # Formulário de cadastro
│   ├── ListarProdutos.tsx   # Listagem em grid
│   └── Produtos.css         # Estilos compartilhados (CSS puro)
├── pages/
│   ├── Produtos.tsx         # Página principal
│   └── Produtos.css         # Estilos da página
└── App.tsx                  # Rotas principais
```

## Como rodar

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Rode o projeto:
   ```sh
   npm start
   ```

## Funcionalidades
- Cadastro de produtos com validação
- Listagem de produtos em grid responsivo
- Persistência local com localStorage
- Design dark moderno com hover effects
- Animações suaves e transições
- Totalmente responsivo

## Customização
Edite as variáveis CSS em `Produtos.css` para mudar cores e estilos.

---

**Última atualização**: 2025-10-31
