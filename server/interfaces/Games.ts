interface Games {
  name: string;
  description: string;
  downloadName: string;
  image: {
    icon: string;
    banner: string;
    title?: string;
  };
  publisher: string;
  developer: string;
  tags: string[];
  platforms: string[];
  price: number | "free";
  verified: boolean;
}

export { Games };
