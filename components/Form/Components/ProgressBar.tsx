const ProgressBar = ({ stepId }: { stepId: string }) => {
  const getStepWidth = (): string => {
    return `${(Number(stepId) / 5) * 100}%`;
  };
  return (
    <>
      <div className="flex items-center w-full">
        <div className="w-full bg-smoothAccent">
          <div
            className=" bg-accent text-xs leading-none h-2 text-center text-white"
            style={{ width: getStepWidth() }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
