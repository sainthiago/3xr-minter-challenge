import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
const PreviewComponent = dynamic(import("../Components/Preview"), {
  ssr: false,
});

const GalleryPreview = () => {
  const { getValues } = useFormContext();

  const nfts = getValues("nfts");
  const skyColor = getValues("skyColor");

  return <PreviewComponent nfts={nfts} skyColor={skyColor} />;
};

export default GalleryPreview;
