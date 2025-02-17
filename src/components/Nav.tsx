// import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  //   const router = useRouter();

  return (
    <nav className="fixed top-0 bg-white w-full gap-4 p-4 mb-10 shadow-md flex ">
      <Link href="/">Home</Link>
      <Link href="/items/1">Update Item</Link>
      <Link href="/items">Items</Link>
      <Link href="/shelters">Add Shelter</Link>
      <Link href="/animals">Add Animal</Link>
      <Link href="/foods">Add Food</Link>
    </nav>
  );
};

export default Navbar;
