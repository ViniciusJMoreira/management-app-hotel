import Navigation from "@/app/_components/Navigation";

export default function Dashboard({ children }) {
  return (
    <>
      <Navigation />
      <main className="bg-gray-100 dark:bg-gray-900 py-10 min-h-screen lg:pl-60 xl:pl-72">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl">{children}</div>
      </main>
    </>
  );
}
