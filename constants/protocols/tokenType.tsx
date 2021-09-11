import { TNft } from "../types/nft.type";

export const useTokenType = (nft: TNft): string => {
  if (nft.animation_type) {
    if (nft.animation_type.includes("audio")) {
      return "Audio";
    } else if (nft.animation_type.includes("video")) {
      return "Video";
    } else if (nft.animation_type.includes("application")) {
      return "Application";
    } else {
      return "3D Model";
    }
  } else {
    return "Image";
  }
};
