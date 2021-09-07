import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SummaryCard from "../Components/SummaryCard";

const GallerySummary = () => {
  const { getValues } = useFormContext();
  const [file, setFile] = useState<string>("");

  const image = getValues("file");
  const title = getValues("title");
  const description = getValues("description");
  const amount = getValues("galleryQtd");
  const nfts = getValues("nfts");
  const skyColor = getValues("skyColor");

  useEffect(() => {
    if (!image || image?.length < 1) return;
    setFile(window.URL.createObjectURL(image[0]));
  }, [image]);

  return (
    <>
      <SummaryCard
        imageUrl={file}
        title={title}
        description={description}
        nfts={nfts}
        amount={amount}
        skyColor={skyColor}
      />
    </>
  );
};

export default GallerySummary;
