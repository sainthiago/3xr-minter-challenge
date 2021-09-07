import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useWallet } from "../services/providers/MintbaseWalletContext";
import ProgressBar from "./Form/Components/ProgressBar";
import Stepper from "./Form/Components/Stepper";

const Header = ({ stepId, steps }: { stepId: string; steps: any }) => {
  const router = useRouter();
  const { wallet, isConnected, details } = useWallet();

  const defaultValues = {
    title: "",
    description: "",
    file: null,
    daoAddress: "vr-challenge.sputnikv2.testnet",
    nfts: [],
    galleryTemplate: "",
    skyColor: "#000000",
    galleryQtd: 1,
  };

  const currentStep = steps.find((step) => step.id === stepId);

  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    mode: "onChange",
  });

  const { trigger } = methods;

  const previous = (e) => {
    e.preventDefault();
    router.push(currentStep.previousStep);
  };
  const next = async (e) => {
    e.preventDefault();
    const isStepValid = await trigger();

    if (isStepValid) router.push(currentStep.nextStep);
  };

  return (
    <>
      <header className="font-nunito w-full bg-smoothPrimary">
        <div className="container mx-auto max-w-8xl md:flex justify-between items-center">
          <div className="w-40 flex">
            {currentStep.id !== "1" && (
              <button
                className="inline-block no-underline text-white text-sm py-2 px-3 hover:bg-gray-500 disabled:bg-gray-400 rounded"
                disabled={!currentStep.previousStep}
                onClick={previous}
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
              </button>
            )}
          </div>

          <Stepper currentStep={currentStep} />

          <div className="w-40 flex justify-end">
            {currentStep.id !== "4" && (
              <button
                className="inline-block no-underline text-white text-sm py-2 px-3 hover:bg-gray-500 rounded"
                disabled={!currentStep.nextStep}
                onClick={next}
              >
                <ArrowRightIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
              </button>
            )}
          </div>
        </div>

        <ProgressBar stepId={stepId} />
      </header>
      <FormProvider {...methods}>
        <form>{currentStep?.formComponent}</form>
      </FormProvider>
      {isConnected && currentStep.id !== "3" && (
        <div className="absolute bottom-8 right-8">
          <p className="text-sm py-2 px-3 text-white">
            Hi, {wallet?.activeAccount?.accountId}
          </p>
        </div>
      )}
    </>
  );
};

export default Header;
