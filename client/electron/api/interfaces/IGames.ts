export interface IGameInfo {
  games: Game[];
}

export interface Game {
  name: string;
  version: number;
  description: string;
  tags: string[];
  verified: boolean;
  developer: string;
  publisher: string;
  price: number;
  images: Image[];
  release_date: number;
}

export interface Image {
  variant: string;
  image: string;
}
