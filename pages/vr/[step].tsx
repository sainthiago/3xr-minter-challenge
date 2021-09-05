import { useRouter } from "next/router";
import GalleryBasicInfo from "../../components/Form/Steps/GalleryBasicInfo";
import GalleryDetails from "../../components/Form/Steps/GalleryDetails";
import Header from "../../components/Header";

const steps = [
  {
    id: "1",
    nextStep: "2",
    previousStep: null,
    title: "Basic Info",
    formComponent: <GalleryBasicInfo />,
  },
  {
    id: "2",
    nextStep: "3",
    previousStep: "1",
    title: "Details",
    formComponent: <GalleryDetails />,
  },
] as {
  nextStep: string | null;
  previousStep: string | null;
  title: string;
  id: string;
  formComponent: JSX.Element | null;
}[];

const Home = () => {
  const router = useRouter();

  const { step: stepId } = router.query as { step: string };

  if (!stepId) return null;

  const currentStep = steps.find((step) => step.id === stepId);

  return (
    <div className="bg-primary min-h-screen">
      <Header stepId={stepId} steps={steps} />
    </div>
  );
};

export default Home;
