import { string } from "yup";

export type NFTGallery = {
  imageUrl: string;
  title: string;
  description: string;
  nfts: any[];
  amount: number;
  skyColor: string;
  daoAddress: string;
};
