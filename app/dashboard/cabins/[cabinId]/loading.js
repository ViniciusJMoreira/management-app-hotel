import Spinner from "@/app/_components/Spinner";

function loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="font-normal text-sm tracking-wide text-gray-900 dark:text-gray-300">
        Loading cabin...
      </p>
    </div>
  );
}

export default loading;
