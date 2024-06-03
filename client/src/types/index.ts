export type User = {
  id: string;
  name: string;
  username?: string;
  bio?: string;
  avatar?: string;
  email: string;
  password?: string;
  provider: string;
}

export type Link = {
  id: string;
  user_id: string;
  name: string;
  url: string;
  logo?: string;
}

export type Card = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
}