export type User = {
  id: string;
  name: string;
  username?: string;
  bio?: string;
  avatar?: string;
  email: string;
  password?: string;
  provider: string;
  visits: number;
  cover?: string;
  links?: Link[];
  cards?: Card[];
};

export type Link = {
  id: string;
  user_id: string;
  name: string;
  url: string;
  logo?: string;
  clicks: number;
};

export type Card = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  url: string;
  image?: string;
  clicks: number;
};

export type CloudinaryResponseType = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: number;
};
