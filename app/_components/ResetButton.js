function ResetButton({ onReset }) {
  return (
    <button
      type="reset"
      onClick={onReset}
      className="cursor-pointer ml-auto inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
    >
      Reset
    </button>
  );
}

export default ResetButton;
