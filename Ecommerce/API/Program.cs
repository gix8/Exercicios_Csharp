using API.Models;
//using equivale ao import do java

Console.Clear();
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

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
    return produtos;
});

app.MapPost("/api/produto/cadastrar", () =>
{
    Produto produto = new Produto();
    produto.Nome = "Mouse Gamer";
    produto.Quantidade = 12;
    produto.Preco = 600;
    produtos.Add(produto);
});

app.Run();
