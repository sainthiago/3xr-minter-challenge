import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useFormContext } from "react-hook-form";
import { proxy } from "valtio";

const state = proxy({ skyColor: "#000000" });

const ColorPicker = () => {
  const [show, setShow] = useState(false);

  const { setValue, getValues } = useFormContext();

  const skyColor = getValues("skyColor");

  return (
    <div className="mb-4 flex gap-x-8 relative">
      <div>
        <div className="grid grid-cols-2 w-24 h-12 items-center mb-4">
          <div
            className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
            onClick={() => {
              setShow(true);
            }}
            style={{
              backgroundColor: state.skyColor,
            }}
          ></div>
          <div className="w-32 mx-2">
            <span className="block text-sm font-bold text-white">sky</span>
            <h1 className="text-white">{state.skyColor}</h1>
          </div>
          {show && (
            <div className="absolute z-10 shadow border rounded p-4 table bg-white mt-2 bottom-20">
              <HexColorPicker
                color={skyColor}
                onChange={(color) => {
                  state.skyColor = color;
                }}
              />
              <div className="mt-4 flex justify-around">
                <button
                  className="flex items-center justify-center h-12 px-6 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-lg lg:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  onClick={(event) => {
                    event.preventDefault();
                    setShow(false);
                    state.skyColor = skyColor;
                  }}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center justify-center h-12 px-6 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-lg lg:h-10 dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  onClick={(event) => {
                    event.preventDefault();

                    setValue("skyColor", state.skyColor);
                    setShow(false);
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
