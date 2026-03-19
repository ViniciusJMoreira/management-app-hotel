import Image from "next/image";
import { formatCurrency } from "@/app/_lib/helpers";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { name, image, regularPrice, discount, maxCapacity, isoccupied } =
    cabin;
  return (
    <li
      key={name}
      className="relative flex justify-between gap-x-6 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:border-gray-400 dark:border-white/10 dark:bg-gray-900/50 dark:shadow-none dark:focus-within:outline-indigo-500 dark:hover:border-white/25"
    >
      <div className="flex min-w-0 gap-x-4">
        {
          <div className="relative size-12">
            <Image
              alt={`Cabin-${name}`}
              src={image}
              fill
              className="object-cover rounded-lg bg-white ring-1 ring-gray-900/10 dark:bg-gray-700 dark:ring-white/10"
            />
          </div>
        }
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900 dark:text-white">
            <Link href={`/dashboard/cabins/${cabin.id}`}>
              <span className="absolute inset-x-0 -top-px bottom-0" />
              {name}
            </Link>
          </p>
          <p className="inline-flex items-center gap-x-1.5 text-xs font-normal text-gray-500 dark:text-gray-400">
            <svg
              viewBox="0 0 6 6"
              aria-hidden="true"
              className={`size-1.5 ${
                isoccupied
                  ? "fill-gray-500 dark:fill-gray-400"
                  : "fill-green-500 dark:fill-green-400"
              } `}
            >
              <circle r={3} cx={3} cy={3} />
            </svg>
            {isoccupied ? "Occupied" : "Avaible"}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-4">
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm/6 text-gray-900 dark:text-white font-bold">
            {formatCurrency(regularPrice)}{" "}
            {discount > 0 && (
              <span className="italic font-normal text-[10px] text-gray-500 dark:text-gray-400">
                / {formatCurrency(discount)}
              </span>
            )}
          </p>
          <p className="mt-1 font-normal text-xs/5 text-gray-500 dark:text-gray-400">
            <span className="font-bold">{maxCapacity}</span> Guests
          </p>
        </div>
        <ChevronRightIcon
          aria-hidden="true"
          className="size-5 flex-none text-gray-400 dark:text-gray-500"
        />
      </div>
    </li>
  );
}

export default CabinCard;
