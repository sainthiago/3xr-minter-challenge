const Stepper = ({ currentStep }) => {
  return (
    <>
      <div className="w-3/6 m-auto text-center">
        <div className="mx-4 p-4">
          <div>
            <label className="text-xs text-white font-nunito">
              STEP {currentStep.id}
            </label>
          </div>
          <div>
            <p className="text-lg text-white font-nunito">
              {currentStep.title}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
