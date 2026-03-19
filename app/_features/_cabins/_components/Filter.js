"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter({ item }) {
  // Questo hook ci consente di leggere i parametri di ricerca dall'URL
  const serachParams = useSearchParams();
  // Questo hook ci consente di navigare programmaticamente tra le pagine modificando l'URL
  const router = useRouter();
  // Questo hook ci consente di ottenere il percorso corrente dell'URL
  const pathname = usePathname();

  const activeFilter = serachParams.get("discount") || "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(serachParams.toString());
    params.set("discount", filter);
    router.replace(`${pathname}?${params}`, { scroll: false });
  }
  return (
    <button
      key={item.name}
      onClick={() => handleFilter(item.value)}
      className={
        activeFilter === item.value
          ? "text-indigo-600 dark:text-indigo-400"
          : "text-gray-700 dark:text-gray-300"
      }
    >
      {item.name}
    </button>
  );
}

export default Filter;
