interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

const ranker = <RankItem>(items: RankItem[], rank: (value: RankItem) => number): RankItem[] => {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
};

interface Pokemon {
  name: string;
  hp: number;
}

const pokemon: Pokemon[] = [
  { name: 'Pikachu', hp: 100 },
  { name: 'Bulbasaur', hp: 20 },
];

const ranks = ranker(pokemon, ({ hp }) => hp);
console.log(ranks);
