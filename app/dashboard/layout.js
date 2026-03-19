import Dashboard from "@/app/_features/_dashboard/_components/Dashboard";
import ToasterProvider from "../_components/ToasterContext";

export default function AppLayout({ children }) {
  return (
    <>
      <ToasterProvider />
      <Dashboard>{children}</Dashboard>
    </>
  );
}
