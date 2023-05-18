interface Games {
  name: string;
  description: string;
  downloadName: string;
  image: {
    icon: string;
  };
  tags: string[];
  verified: boolean;
}

export { Games };
