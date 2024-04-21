interface UserDetailDto {
  id: number;
  name: string;
  books: {
    past: Past[];
    present: Present[];
  };
}

interface Past {
  name: string;
  userScore: number;
}

interface Present {
  name: string;
}

export { UserDetailDto, Past, Present };
