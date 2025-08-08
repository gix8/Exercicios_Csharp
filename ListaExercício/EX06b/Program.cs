int[] vetor = new int[1000];

Random RNG = new Random();

for (int i = 0; i < vetor.Length; i++)
{
    vetor[i] = RNG.Next(1, 10000);
}

static void Bubblesort(int[] vetor)
{
    for (int i = 0; i < vetor.Length - 1; i++)
    {
        for (int j = 0; j < vetor.Length - i - 1; j++)
        {
            if (vetor[j] > vetor[j + 1])
            {
                int temp = vetor[j];
                vetor[j] = vetor[j + 1];
                vetor[j + 1] = temp;
            }
        }
    }
}

Bubblesort(vetor);

for (int i = 0; i < vetor.Length; i++)
{
    Console.Write(vetor[i] + " ");
}