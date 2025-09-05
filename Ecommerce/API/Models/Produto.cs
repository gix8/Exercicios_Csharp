using Microsoft.AspNetCore.SignalR;

namespace API.Models;

public class Produto
{

    //Características|Atributos|Propriedades
    //id, nome, preço, quantidade
    //java
    /*
    private string id;
    private string nome;
    private double preco;
    private int quantidade;

    public string getNome()
    {
        return nome;
    }

    public void setNome(string nome)
    {
        this.nome = nome;
    }
    */

    //C#
    public Produto()
    {
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }

    public string Id { get; set; }
    public string Nome { get; set; }
    public double Preco { get; set; }
    public int Quantidade { get; set; }
    public DateTime CriadoEm { get; set; }

}
