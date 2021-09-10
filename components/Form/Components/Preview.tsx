import { RemoteComponent } from "@paciolan/remote-component";
import {
  Background,
  Image as ImageVR,
  StandardEnvironment,
  useControlledProgress,
  useEnvironment,
} from "spacesvr";
import { Euler, Vector3 } from "three";

const url = "https://ipfs.infura.io/ipfs/QmSvCQE52LCykoHVX6jLy3JVkgo8xa2jeGWZLsdzPiF81z"; // prettier-ignore

const Model = (props: any) => <RemoteComponent url={url} {...props} />;

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

const PauseMenu = () => {
  const { paused, setPaused } = useEnvironment();

  const progress = useControlledProgress();

  const isLoading = progress < 100;

  if (isLoading) return null;

  return (
    <div className="w-full h-full absolute z-10 top-0 left-0">
      <div
        className={`w-full h-full relative top-0 left-0 bg-black ${
          paused ? "opacity-90" : "opacity-0"
        } overflow-auto flex flex-col items-center justify-center`}
      >
        <div
          className="font-nunito bg-white p-5 rounded cursor-pointer m-2"
          onClick={() => setPaused(!paused)}
        >
          Enter Preview
        </div>
        <div className="font-nunito text-white text-sm p-5 rounded m-2">
          (Press <span className="text-accent">ESC</span> to show cursor again)
        </div>
      </div>
    </div>
  );
};

const LoadingScreen = () => {
  const progress = useControlledProgress();

  return (
    <>
      {progress < 100 && (
        <div className="w-full h-full absolute z-50 top-0 left-0 bg-primary flex flex-col items-center justify-center align-middle text-white">
          <div className="font-nunito">Loading...</div>
        </div>
      )}
    </>
  );
};

const Preview = ({ nfts, skyColor }: { nfts?: any[]; skyColor: string }) => {
  const progress = useControlledProgress();

  if (progress < 100) return null;
  return (
    <StandardEnvironment
      loadingScreen={<LoadingScreen />}
      pauseMenu={<PauseMenu />}
    >
      <Model>
        {nfts?.map((nft, index) => {
          return (
            <ImageVR
              key={nft?.id}
              position={assetsPlaces[index].position}
              rotation={assetsPlaces[index].rotation}
              src={nft?.media}
            />
          );
        })}
      </Model>

      <ambientLight intensity={0.5} />
      <pointLight position={[3, 1, 0]} />

      <Background color={skyColor} />
    </StandardEnvironment>
  );
};
export default Preview;
