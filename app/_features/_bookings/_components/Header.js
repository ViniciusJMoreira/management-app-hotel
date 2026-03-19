// import Link from "next/link";
// import Filter from "./Filter";
// import { PlusIcon } from "@heroicons/react/20/solid";

// const navigation = [
//   { name: "Must Recent", value: "must-recent" },
//   { name: "Checked out", value: "checked-out" },
//   { name: "Checked in", value: "checked-in" },
//   { name: "Confirmed", value: "confirmed" },
//   { name: "Unconfirmed", value: "unconfirmed" },
// ];

// export default function Header() {
//   return (
//     <header className="border-b border-gray-200 dark:border-white/10 pb-4 sm:pb-6">
//       <div className="flex flex-wrap items-center gap-6 sm:flex-nowrap">
//         <h1 className="text-base/7 font-semibold text-gray-900 dark:text-white">
//           Cabins
//         </h1>
//         <div className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7 dark:sm:border-white/10">
//           {navigation.map((item) => (
//             <Filter key={item.value} item={item} />
//           ))}
//         </div>
//         <Link
//           href="/dashboard/cabins/new-cabin"
//           className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
//         >
//           <PlusIcon aria-hidden="true" className="-ml-1.5 size-5" />
//           New Cabin
//         </Link>
//       </div>
//     </header>
//   );
// }
"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { BarsArrowUpIcon } from "@heroicons/react/20/solid";

const filters = [
  { name: "Must Recent", value: "must-recent", current: true },
  { name: "Checked out", value: "checked-out" },
  { name: "Checked in", value: "checked-in" },
  { name: "Confirmed", value: "confirmed" },
  { name: "Unconfirmed", value: "unconfirmed" },
];

const sortOptions = [
  { name: "Most Popular", href: "#" },
  { name: "Best Rating", href: "#" },
  { name: "Newest", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <div className="relative border-b border-gray-200 pb-5 sm:pb-0 dark:border-white/10">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Recent Bookings
        </h3>
        <div className="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton
              type="button"
              className="flex shrink-0 items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:hover:bg-white/20 dark:focus:outline-indigo-500"
            >
              <ChevronDownIcon
                aria-hidden="true"
                className="-ml-0.5 size-4 text-gray-400"
              />
              Sort
            </MenuButton>
            <MenuItems
              transition
              className="absolute left-0 md:right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            >
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option}>
                    <a
                      href={option.href}
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                    >
                      {option.name}
                    </a>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:hidden">
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            defaultValue={filters.find((tab) => tab.current).name}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-white"
          >
            {filters.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
          />
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {filters.map((tab) => (
              <button
                key={tab.name}
                aria-current={tab.current ? "page" : undefined}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-white",
                  "border-b-2 px-1 pb-4 text-sm font-medium whitespace-nowrap",
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
