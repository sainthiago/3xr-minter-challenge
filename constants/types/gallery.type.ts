export type TGalleryThing = {
  createdAt: string;
  id: string;
  metadata: {
    description: "Test description";
    media: "https://arweave.net/nCbb_1VBVtXZ03-hkgXaUHBvcxr6qX8ccxaGnSh88a8";
    title: "Test title";
    __typename: "metadata";
  };
  tokens_aggregate: {
    aggregate: {
      count: number;
      __typename: "tokens_aggregate_fields";
    };
    __typename: "tokens_aggregate";
  };
};
