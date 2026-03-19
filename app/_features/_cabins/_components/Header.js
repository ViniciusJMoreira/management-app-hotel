import Link from "next/link";
import Filter from "./Filter";
import { PlusIcon } from "@heroicons/react/20/solid";

const navigation = [
  { name: "No Discount", value: "no-discount" },
  { name: "With Discount", value: "with-discount" },
  { name: "All Cabins", value: "all" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-white/10 pb-4 sm:pb-6">
      <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap">
        <h1 className="text-base/7 font-semibold text-gray-900 dark:text-white">
          Cabins
        </h1>
        <div className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7 dark:sm:border-white/10">
          {navigation.map((item) => (
            <Filter key={item.value} item={item} />
          ))}
        </div>
        <Link
          href="/dashboard/cabins/new-cabin"
          className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          <PlusIcon aria-hidden="true" className="-ml-1.5 size-5" />
          New Cabin
        </Link>
      </div>
    </header>
  );
}
