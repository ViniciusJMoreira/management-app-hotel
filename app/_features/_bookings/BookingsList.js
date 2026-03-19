"use client";
import Header from "./_components/Header";
import Button from "../../_components/Button";
import { useBookings } from "./useBookings";
import { formatCurrency } from "@/app/_lib/helpers";
import { format } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const status = {
  unconfirmed: {
    textColor: "text-blue-700 dark:text-blue-300",
    step: 0,
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  "checked-in": {
    textColor: "text-green-700 dark:text-green-300",
    step: 1,
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  "checked-out": {
    textColor: "text-red-700 dark:text-red-300",
    step: 2,
    bgColor: "bg-red-100 dark:bg-red-950",
  },
};

export default function BookingsList() {
  const { bookings } = useBookings();

  return (
    <div>
      <Header />
      <div className="mt-8 space-y-8">
        {bookings?.map((booking) => (
          <div
            className="text-gray-700 bg-white shadow-xs border-gray-100 pr-6 sm:rounded-lg sm:border xl:pr-8 dark:text-white dark:bg-white/5 dark:border-gray-700 dark:shadow-none text-red"
            key={booking.id}
          >
            <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 xl:gap-x-8">
              <div className="relative sm:col-span-4 md:col-span-4 md:row-span-2 md:row-end-2">
                <span
                  className={`absolute right-3 top-3 inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-medium uppercase  tracking-wide ${status[booking.status]?.bgColor} ${status[booking.status]?.textColor}`}
                >
                  {booking.cabins.name}
                </span>
                <img
                  alt={`Cabin-${booking.cabins.name}`}
                  src={booking.cabins.image}
                  className="aspect-square w-full h-full rounded-l-lg bg-gray-50 object-cover inset-0"
                />
              </div>
              <div className="flex flex-col justify-center gap-y-8 sm:col-span-12 md:my-6 md:col-span-8 md:row-span-2 md:row-end-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <img
                      alt=""
                      src={booking.guests.imageUrl}
                      className={`size-18 px-1 py-1 rounded-full outline-2 -outline-offset-1 outline-${status[booking.status]?.textColor}`}
                    />
                    <div>
                      <h3 className="text-base/7 font-semibold tracking-tight">
                        {booking.guests.fullName}
                      </h3>
                      <p className="text-xs font-medium font-bold text-gray-300">
                        {booking.guests.email}
                      </p>
                    </div>
                  </div>
                  <div className="tracking-tight text-end flex flex-col">
                    <p className="text-lg font-semibold">
                      {formatCurrency(booking.totalPrice)}
                    </p>
                    <p className="text-xs italic text-gray-300">
                      VISA ***.***.562
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-3.5 hidden grid-cols-2 font-medium uppercase tracking-wide sm:grid">
                    <div>
                      {format(new Date(booking.startDate), "MMM,dd, yyyy")}
                    </div>
                    <div className="text-right">
                      {format(new Date(booking.endDate), "MMM,dd, yyyy")}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-full bg-gray-200">
                    <div
                      style={{
                        width: `calc((${status[booking.status]?.step ?? 0} * 3 + 1) / 7 * 100%)`,
                      }}
                      className={`h-2 rounded-full ${status[booking.status]?.bgColor}`}
                    />
                  </div>
                  <div className="mt-3.5 hidden grid-cols-3 font-medium uppercase text-gray-100 sm:grid">
                    <div
                      className={`text-${status[booking.status]?.textColor}`}
                    >
                      Confirmed
                    </div>
                    <div
                      className={classNames(
                        status[booking.status]?.step > 0
                          ? `text-${status[booking.status]?.textColor}`
                          : "",
                        "text-center",
                      )}
                    >
                      Checked-in
                    </div>
                    <div
                      className={classNames(
                        status[booking.status]?.step > 1
                          ? `text-${status[booking.status]?.textColor}`
                          : "",
                        "text-right",
                      )}
                    >
                      Checked-out
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button href={`/bookings/${booking.id}`}>
                    Manage Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
