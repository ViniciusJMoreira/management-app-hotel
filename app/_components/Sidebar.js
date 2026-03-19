"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  ChartBarIcon,
  HomeModernIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
  {
    name: "Cabins",
    href: "/dashboard/cabins",
    icon: HomeModernIcon,
    current: false,
  },
  { name: "Bookings", href: "/dashboard/bookings", icon: FolderIcon },
  { name: "Calendar", href: "#", icon: CalendarIcon },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "#", icon: ChartPieIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="relative flex grow flex-col gap-y-5 overflow-y-auto no-scrollbar bg-white px-6 pb-4 dark:bg-gray-900 dark:ring dark:ring-white/10 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-black/10">
              <div className="relative flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="/logo-light.png"
                  className="h-10 w-auto dark:hidden"
                />
                <img
                  alt="Your Company"
                  src="/logo-dark.png"
                  className="h-10 w-auto not-dark:hidden"
                />
              </div>
              <nav className="relative flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.href === pathname
                                ? "bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white"
                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.href === pathname
                                  ? "text-indigo-600 dark:text-white"
                                  : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white",
                                "size-6 shrink-0",
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                      <Cog6ToothIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/* Static sidebar for desktop */}
      <div className="hidden bg-gray-900 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col xl:w-72">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto no-scrollbar border-r border-gray-200 bg-gray-100 px-6 pb-4 dark:border-white/10 dark:bg-black/10">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="/logo-light.png"
              className="h-10 w-auto dark:hidden"
            />
            <img
              alt="Your Company"
              src="/logo-dark.png"
              className="h-10 w-auto not-dark:hidden"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.href === pathname
                            ? "bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.href === pathname
                              ? "text-indigo-600 dark:text-white"
                              : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white",
                            "size-6 shrink-0",
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white"
                  />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
