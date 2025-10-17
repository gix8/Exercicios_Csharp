//Componente
// - Precisa ser uma função
// - Precisa retornar apenas UM elemento HTML pai

import { useEffect } from "react";

// - Exportar componente
function ListarProdutos() {

    useEffect(() => {
        console.log("Componente foi carregado.");

        obterProdutos();
    }, []);

    async function obterProdutos() {
        
        try {
            const resposta = await fetch("http://localhost:5011/api/produto/listar")

            if (!resposta.ok) {
                throw new Error("Não foi possível obter a lista de produtos." + resposta.statusText);
            }

            const dados = await resposta.json();
            console.log({dados});
        console.log({resposta});
        } catch (error) {
            console.log("Deu erro ao obter produtos.", error);
        }
        
    }

  return (
    <div id="listar-produtos">
      <h2>Listar Produtos</h2>

    </div>
  );
} 

export default ListarProdutos;