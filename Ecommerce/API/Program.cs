using API.Models;
using Microsoft.AspNetCore.Mvc;
//using equivale ao import do java

Console.Clear();
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

//lista de produtos fixos
List<Produto> produtos = new List<Produto>

    {
        new Produto { Nome = "Teclado", Preco = 120.99 },
        new Produto { Nome = "Mouse", Preco = 59.90 },
        new Produto { Nome = "Monitor", Preco = 899.00 },
        new Produto { Nome = "Notebook", Preco = 3499.99 },
        new Produto { Nome = "Headset", Preco = 199.50 }
    };

    // Exibindo os produtos
    foreach (var produto in produtos)
    {
        Console.WriteLine($"ID: {produto.Id}");
        Console.WriteLine($"Nome: {produto.Nome}");
        Console.WriteLine($"Preço: R$ {produto.Preco:F2}");
        Console.WriteLine($"Criado em: {produto.CriadoEm}");
        Console.WriteLine(new string('-', 40));
    }

//Funcionalidades
//Requisições
// - Endereço/URL
// - Método HTTP
app.MapGet("/", () => "API de Produtos");

app.MapGet("/api/produto/listar", () =>
{
    //valida se tem algo na lista
    if (produtos.Count != 0)
    {
        return Results.Ok(produtos);
    }
    return Results.BadRequest("Lista vazia");
});

app.MapPost("/api/produto/cadastrar", (Produto produto) =>
{

    foreach (Produto produtoCadastrado in produtos)
    {
        if (produtoCadastrado.Nome == produto.Nome)
        {
            return Results.Conflict("Produto já cadastrado!");
        }
    }

    produtos.Add(produto);
    return Results.Created("", produto);
});

app.MapGet("/api/produto/buscar/{nome}", (string nome) =>
{
    //expressão lambda
    Produto? resultado = produtos.FirstOrDefault(x => x.Nome.Contains(nome));
    if (resultado == null)
    {
        return Results.NotFound("Produto não encontrado.");
    }
    return Results.Ok(resultado);
});

app.MapDelete("/api/produto/remover/{nome}", (string nome) =>
{
    Produto? resultado = produtos.FirstOrDefault(x => x.Nome.Contains(nome));
    if (resultado == null)
    {
        return Results.NotFound("Produto não encontrado.");
    }
    produtos.Remove(resultado);
    return Results.Ok(" item removido com sucesso!");
});

app.MapPost("/api/produtos/alterar/{id}", (string id, [FromBody] Produto produtoAlterado) =>
{
    var resultado = produtos.FirstOrDefault(p => p.Id == produtoAlterado.Id);
    if (resultado is null)
        return Results.NotFound("Produto não encontrado");
    resultado.Nome = produtoAlterado.Nome;
    resultado.Preco = produtoAlterado.Preco;
    resultado.Quantidade = produtoAlterado.Quantidade;

    return Results.Ok(resultado);
});

app.Run();
