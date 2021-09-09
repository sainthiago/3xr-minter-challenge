export const useTokenType = (nft): string => {
  if (nft.animation_type) {
    if (nft.media_type.includes("audio")) {
      return "Audio";
    } else if (nft.media_type.includes("video")) {
      return "Video";
    } else if (nft.media_type.includes("application")) {
      return "Application";
    } else {
      return "Model";
    }
  } else {
    return "Image";
  }
};
