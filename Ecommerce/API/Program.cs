Console.Clear();
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

//funcionalidades
//requisiçoes
// - Endereço/URL
// - Método HTTP

app.MapGet("/", () => "Ciao mondo!");

app.MapGet("/funcionalidade", () => "segunda funcionalidade");  

app.MapPost("/funcionalidade", () => "funcionalidade com post");  

app.Run();
