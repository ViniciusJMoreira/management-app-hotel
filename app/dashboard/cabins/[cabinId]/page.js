import Spinner from "@/app/_components/Spinner";
import EditCabinForm from "@/app/_features/_cabins/_components/EditCabinForm";
import { getCabin, getCabins } from "@/app/_features/_cabins/apiCabins";

// A funcao generateMetadata gera os metadados dinamicos para cada pagina de cabana
export async function generateMetadata({ params }) {
  const routeParams = await params;
  // recuperando os dados da cabana usando a funcao getCabin
  const { name } = await getCabin(routeParams.cabinId);
  return {
    title: `Cabin ${name}`,
    description: `Discover Cabin ${name} - your perfect getaway in the Dolomites. Enjoy stunning views, cozy interiors, and unforgettable experiences.`,
  };
}

// A funcao generateStaticParams gera as rotas estaticas para todas as cabanas
export async function generateStaticParams() {
  const cabins = await getCabins();
  // recuperando a lista de cabanas usando a funcao getCabins
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  // e retornando um array de objetos com os ids das cabanas
  return ids;
}

async function Page({ params }) {
  const param = await params;
  const cabin = await getCabin(param.cabinId);

  return <EditCabinForm cabin={cabin} />;
}

export default Page;
