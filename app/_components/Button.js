import Link from "next/link";

function Button({ href, children }) {
  return (
    <Link
      href={href}
      className="cursor-pointer inline-flex justify-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 disabled:hover:bg-indigo-500 disabled:bg-indigo-900 disabled:dark:hover:bg-indigo-900"
    >
      {children}
    </Link>
  );
}

export default Button;
