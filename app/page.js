import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h2>Welcome to The Management Wild Oasis App.</h2>
      <Link href="/dashboard">Go to Cabins Dashboard</Link>
    </main>
  );
}
