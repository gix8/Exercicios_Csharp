//1-criar um vetor de inteiros para receber 1000 números aleatórios
//2-percorre o vetor com um laço de repetição
//3-preencher o vetor com números aleatórios 
//4-imprimir o vetor com valores aleatórios
int[] vetor = new int[1000];

Random RNG = new Random();

for (int i = 0; i < vetor.Length; i++)
{
    vetor[i] = RNG.Next(1, 10000);
}

for (int i = 0; i < vetor.Length - 1; i++)
{
    for (int j = 0; j < vetor.Length - i - 1; j++)
    {
        if (vetor[j] > vetor[j + 1])
        {
            // Troca os elementos
            int temp = vetor[j];
            vetor[j] = vetor[j + 1];
            vetor[j + 1] = temp;
        }
    }
}

for (int i = 0; i < vetor.Length; i++)
{
    Console.Write(vetor[i] + " ");
}