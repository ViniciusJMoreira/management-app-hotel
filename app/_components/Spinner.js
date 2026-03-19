import { DivideIcon } from "@heroicons/react/20/solid";

function Spinner({ text }) {
  return (
    <>
      <div className="spinner" />
      {text && (
        <p className="text-center font-normal text-sm tracking-wide text-gray-900 dark:text-gray-300">
          {text}
        </p>
      )}
    </>
  );
}

export default Spinner;
