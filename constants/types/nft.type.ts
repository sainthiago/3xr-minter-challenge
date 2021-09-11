export type TNft = {
  animation_type: string;
  description: string;
  id: string;
  media: string;
  media_type: string;
  title: string;
  __typename: string;
  thing: {
    id: string;
    memo: string;
    __typename: string;
    tokens: {
      minter: string;
      royaltyPercent: number;
      royaltys: {
        account: string;
        percent: number;
        __typename: string;
      }[];
      __typename: string;
    }[];
  };
};
