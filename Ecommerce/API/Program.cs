using API.Models;
using Microsoft.AspNetCore.Mvc;
//using equivale ao import do java

Console.Clear();
var builder = WebApplication.CreateBuilder(args);

// Adicionar Serviço de banco de dados na aplicação
builder.Services.AddDbContext<AppDataContext>();

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

app.MapGet("/api/produto/listar", (AppDataContext ctx) =>
{
    var produtos = ctx.Produtos.ToList();
    //valida se tem algo na lista
    if (ctx.Produtos.Count() != 0)
    {
        return Results.Ok(produtos);
    }
    return Results.BadRequest("Lista vazia");
});

app.MapPost("/api/produto/cadastrar", (Produto produto, AppDataContext ctx) =>
{

    if (ctx.Produtos.Any(x => x.Nome == produto.Nome))
    {
        return Results.Conflict("Produto já cadastrado!");
    }

    ctx.Produtos.Add(produto);
    ctx.SaveChanges();
    return Results.Created("", produto);
});

app.MapGet("/api/produto/buscar/{nome}", (string nome, AppDataContext ctx) =>
{
    //expressão lambda
    Produto? resultado = ctx.Produtos.FirstOrDefault(x => x.Nome.Contains(nome));
    if (resultado == null)
    {
        return Results.NotFound("Produto não encontrado.");
    }
    return Results.Ok(resultado);
});

app.MapDelete("/api/produto/remover/{nome}", (string nome, AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.FirstOrDefault(x => x.Nome.Contains(nome));
    if (resultado == null)
    {
        return Results.NotFound("Produto não encontrado.");
    }
    ctx.Produtos.Remove(resultado);
    ctx.SaveChanges();
    return Results.Ok(" item removido com sucesso!");
});

app.MapPost("/api/produtos/alterar/{id}", (string id, [FromBody] Produto produtoAlterado, AppDataContext ctx) =>
{
    var resultado = ctx.Produtos.FirstOrDefault(p => p.Id == id);
    if (resultado is null)
        return Results.NotFound("Produto não encontrado");
    resultado.Nome = produtoAlterado.Nome;
    resultado.Preco = produtoAlterado.Preco;
    resultado.Quantidade = produtoAlterado.Quantidade;

    ctx.SaveChanges();
    return Results.Ok(resultado);
});

app.Run();
