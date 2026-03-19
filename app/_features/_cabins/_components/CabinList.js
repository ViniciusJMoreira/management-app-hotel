import { getCabins } from "../apiCabins";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins = cabins;

  if (filter === "with-discount")
    displayedCabins = cabins.filter((cabin) => cabin.discount > 0);

  if (filter === "no-discount")
    displayedCabins = cabins.filter((cabin) => cabin.discount === 0);

  return (
    <div>
      <ul
        role="list"
        className="mt-5 space-y-2 divide-y divide-gray-100 dark:divide-white/5"
      >
        {displayedCabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </ul>
    </div>
  );
}

export default CabinList;
