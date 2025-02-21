// import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "./ui/button";
import { PawPrint } from "lucide-react";

const Navbar = () => {
  //   const router = useRouter();

  return (
    <nav className="fixed top-0 bg-white w-full gap-10 py-3 shadow-md flex  items-center">
      <Link className="flex items-center justify-center pl-5" href="/">
        <PawPrint className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">ShelterShare</span>
      </Link>
      <Link href="/">Home</Link>
      <Link href="/items">Items</Link>
      <Link href="/shelters">Shelters</Link>
    </nav>
  );
};

export default Navbar;
