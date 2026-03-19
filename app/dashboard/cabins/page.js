import Header from "@/app/_features/_cabins/_components/Header";
import CabinList from "@/app/_features/_cabins/_components/CabinList";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

async function Page({ searchParams }) {
  const params = await searchParams;
  const filter = params?.discount || "all";
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner text={"Loading cabins..."} />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </>
  );
}

// il prop key in suspense serve per ricaricare il componente quando cambia la prop filter

export default Page;
