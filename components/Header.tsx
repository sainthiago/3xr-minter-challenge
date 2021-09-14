import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import BN from "bn.js";
import { Decimal } from "decimal.js";
import { MetadataField, Network } from "mintbase";
import { Contract } from "near-api-js";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Euler, Vector3 } from "three";
import { TNft } from "../constants/types/nft.type";
import { useWallet } from "../services/providers/MintbaseWalletContext";
import ProgressBar from "./Form/Components/ProgressBar";
import Stepper from "./Form/Components/Stepper";

const assetsPlaces = [
  {
    position: new Vector3(-5.6, 1.5, 5),
    rotation: new Euler(0, Math.PI / 2, 0),
  },
  {
    position: new Vector3(-5.6, 1.5, 3),
    rotation: new Euler(0, Math.PI / 2, 0),
  },
  {
    position: new Vector3(-5.6, 1.5, 1),
    rotation: new Euler(0, Math.PI / 2, 0),
  },
  {
    position: new Vector3(-5.6, 1.5, -1),
    rotation: new Euler(0, Math.PI / 2, 0),
  },
  {
    position: new Vector3(-5.6, 1.5, -3),
    rotation: new Euler(0, Math.PI / 2, 0),
  },
  {
    position: new Vector3(5, 1.5, 6.65),
    rotation: new Euler(0, Math.PI, 0),
  },
  {
    position: new Vector3(3, 1.5, 6.65),
    rotation: new Euler(0, Math.PI, 0),
  },
  {
    position: new Vector3(1, 1.5, 6.65),
    rotation: new Euler(0, Math.PI, 0),
  },
  {
    position: new Vector3(-1, 1.5, 6.65),
    rotation: new Euler(0, Math.PI, 0),
  },
  {
    position: new Vector3(-3, 1.5, 6.65),
    rotation: new Euler(0, Math.PI, 0),
  },
  {
    position: new Vector3(8.3, 1.5, -6),
    rotation: new Euler(0, -Math.PI / 2, 0),
  },
  {
    position: new Vector3(8.3, 1.5, -4),
    rotation: new Euler(0, -Math.PI / 2, 0),
  },
  {
    position: new Vector3(8.3, 1.5, -2),
    rotation: new Euler(0, -Math.PI / 2, 0),
  },
  {
    position: new Vector3(8.3, 1.5, 0),
    rotation: new Euler(0, -Math.PI / 2, 0),
  },
  {
    position: new Vector3(8.3, 1.5, 2),
    rotation: new Euler(0, -Math.PI / 2, 0),
  },
  {
    position: new Vector3(8.3, 1.5, 0),
    rotation: new Euler(0, -Math.PI / 2, 0),
  },
  {
    position: new Vector3(-3, 1.5, -7.2),
    rotation: new Euler(0, 0, 0),
  },
  {
    position: new Vector3(-1, 1.5, -7.2),
    rotation: new Euler(0, 0, 0),
  },
  {
    position: new Vector3(2, 1.5, -7.2),
    rotation: new Euler(0, 0, 0),
  },
  {
    position: new Vector3(4, 1.5, -7.2),
    rotation: new Euler(0, 0, 0),
  },
  {
    position: new Vector3(6, 1.5, -7.2),
    rotation: new Euler(0, 0, 0),
  },
];

const Header = ({ stepId, steps }: { stepId: string; steps: any }) => {
  const router = useRouter();
  const { wallet, isConnected, details } = useWallet();
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const defaultValues = {
    title: "",
    description: "",
    file: null,
    daoAddress: "vr-challenge.sputnikv2.testnet",
    nfts: [],
    galleryTemplate: "",
    skyColor: "#000000",
    wallColor: "",
    galleryQtd: 1,
  };

  const currentStep = steps.find((step: any) => step.id === stepId);

  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, reset, trigger, getValues } = methods;

  const image: any = getValues("file");
  const title = getValues("title");
  const description = getValues("description");
  const amount = getValues("galleryQtd");
  const nfts = getValues("nfts");
  const skyColor = getValues("skyColor");

  const previous = (e: any) => {
    e.preventDefault();
    router.push(currentStep.previousStep);
  };
  const next = async (e: any) => {
    e.preventDefault();
    const isStepValid = await trigger();

    if (isStepValid) router.push(currentStep.nextStep);
  };

  const calculateRoyalties = () => {
    let royaltiesObj: any = {};

    nfts.forEach((nft: TNft) => {
      const royalties = nft.thing.tokens[0].royaltys ?? [];
      const minter = nft.thing.tokens[0].minter;

      const hasRoyalties = royalties.length > 0;

      if (hasRoyalties) {
        royalties.forEach((royalty: any) => {
          if (royaltiesObj[royalty.account]) {
            royaltiesObj[royalty.account] += royalty.percent;
          } else {
            royaltiesObj[royalty.account] = royalty.percent;
          }
        });
      } else {
        if (royaltiesObj[minter]) {
          royaltiesObj[minter] += 100;
        } else {
          royaltiesObj[minter] = 100;
        }
      }

      const numberAccounts = Object.keys(royaltiesObj).length;
      const percentPerAccount = (9500 / numberAccounts).toFixed(0);

      Object.keys(royaltiesObj).forEach((account) => {
        royaltiesObj[account] = Number(percentPerAccount);
      });
    });

    const beforeCutTotal: any = Object.values(royaltiesObj).reduce(
      (acc, curr) => Number(acc) + Number(curr)
    );

    royaltiesObj["vr-challenge.testnet"] = Number(
      (10000 - beforeCutTotal).toFixed(0)
    );

    return royaltiesObj;
  };

  const createProposal = async () => {
    setIsMinting(true);

    if (!(wallet?.minter && image)) return;

    if (image) {
      const { data: fileUploadResult, error: fileError } =
        await wallet.minter.uploadField(MetadataField.Media, image[0]);

      if (fileError) {
        console.error(fileError);
        return;
      }
    }

    const external_space = [
      {
        trait_type: "external_space",
        display_type: "External Space",
        value:
          "https://ipfs.infura.io/ipfs/QmSvCQE52LCykoHVX6jLy3JVkgo8xa2jeGWZLsdzPiF81z",
      },
    ];
    const gallery_nfts = [
      {
        trait_type: "gallery_nfts",
        display_type: "NFT Gallery",
        value: nfts.map((nft: TNft) => nft.thing?.id),
      },
    ];

    const asset_places = [
      {
        trait_type: "asset_places",
        display_type: "Asset Places",
        value: assetsPlaces,
      },
    ];

    const colors = [
      {
        trait_type: "space_colors",
        display_type: "Colors",
        value: {
          skyColor: skyColor,
        },
      },
    ];

    wallet.minter.setMetadata({
      title: title,
      description: description,
      [MetadataField.External_url]: `https://3xr.space`,
      extra: [...gallery_nfts, ...external_space, ...colors, ...asset_places],
    });

    setIsMinting(false);

    // wallet.mint(1, data.store, undefined, undefined, undefined)

    if (!wallet.activeAccount) return;

    const royalties = calculateRoyalties();

    const { data: metadataId } = await wallet.minter.getMetadataId();

    const mint = {
      owner_id: details.accountId,
      metadata: {
        reference: metadataId,
        extra: "custom-3xr-gallery",
      },
      num_to_mint: Number(amount),
      royalty_args: {
        split_between: royalties,
        percentage: 1000,
      },
      split_owners: null,
    };

    const contract = new Contract(
      // @ts-ignore
      wallet.activeWallet?.account(),
      "vr-challenge.sputnikv2.testnet",
      {
        viewMethods: ["get_greeting"],
        changeMethods: ["add_proposal"],
      }
    );

    const deposit = new Decimal(0.1);
    const depositYokto = deposit.mul(1000000000000000000000000).toFixed();

    // @ts-ignore
    contract.add_proposal(
      {
        proposal: {
          description: `Proposal to mint the "${title}" 3XR gallery
          |
          |
          Preview: https://${
            wallet?.networkName === Network.testnet ? "testnet" : "mainnet"
          }.3xr.space/custom/${metadataId}/?preview=true
          |
          |
          Gallery: https://${
            wallet?.networkName === Network.testnet ? "testnet" : "mainnet"
          }.3xr.space/custom/${metadataId}:vrchallenge.mintspace2.testnet`,
          kind: {
            FunctionCall: {
              receiver_id: "vrchallenge.mintspace2.testnet",
              actions: [
                {
                  method_name: "nft_batch_mint",
                  args: Buffer.from(
                    JSON.stringify(mint)
                      .replaceAll('^"', "")
                      .replaceAll('"^', "")
                  ).toString("base64"),
                  deposit: depositYokto,
                  gas: "150000000000000",
                },
              ],
            },
          },
        },
      },
      new BN("200000000000000"),
      new BN("1000000000000000000000000")
    );
  };

  return (
    <>
      <header className="font-nunito w-full bg-smoothPrimary">
        <div className="container mx-auto max-w-8xl flex justify-between items-center">
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
            {currentStep.id === "5" ? (
              <button
                className="inline-block no-underline text-white text-sm py-2 px-3 hover:bg-gray-500 rounded"
                onClick={createProposal}
              >
                {isMinting ? "Creating..." : "Create NFT Proposal"}
              </button>
            ) : (
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
      {isConnected && currentStep.id !== "4" && (
        <div className="sticky md:absolute top-24 right-8 text-right">
          <p className="text-sm py-2 px-3 text-white">
            Hi, {wallet?.activeAccount?.accountId}
          </p>
        </div>
      )}
    </>
  );
};

export default Header;
