int[] vetor = new int[1000];

Random RNG = new Random();

for (int i = 0; i < vetor.Length; i++)
{
    vetor[i] = RNG.Next(1, 10000);
}

Array.Sort(vetor);

for (int i = 0; i < vetor.Length; i++)
{
    Console.Write(vetor[i] + " ");
}