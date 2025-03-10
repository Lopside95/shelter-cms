import Image from "next/image";
import NotFound from "../../public/icons/NotFound";
import DogIconDemo from "@/components/DogIconDemo";

export default function Custom404() {
  console.log("404 page");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">
        The page you are looking for does not exist.
      </p>
      <p className="mt-2 text-lg">
        Please check the URL or return to the home page.
      </p>
      <div className="w-1/2 h-auto mt-6"></div>
    </div>
  );
}

{
  /* <video
  src="/404-animation.webm"
  // alt="404 Animation"
  width={2000}
  height={2000}
  className="mt-6 w-1/2 h-auto"
  autoPlay
  loop
  muted
/> */
}

{
  /* <Image
  src="/404-animation.webm"
  alt="404 Animation"
  width={500}
  height={500}
  className="mt-6 w-1/2 h-auto"
/> */
}

{
  /* <a href="/" className="mt-6 text-blue-500 hover:underline">
  Go back home
</a> */
}
