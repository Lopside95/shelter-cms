import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <img src="/Dog_Icon.svg" alt="404" />
      {/* <Image src="404.svg" width={500} height={500} alt="404 Animation" />; */}
    </div>
  );
};

export default NotFound;

{
  /* <svg
  width="300"
  height="300"
  viewBox="0 0 300 300"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  stroke="black"
  strokeWidth="5"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path
    d="M90 150 Q150 50, 210 150 Q210 230, 90 230 Q90 150, 90 150 Z"
    fill="white"
  />

  <path
    d="M60 140 Q30 100, 60 50 Q90 20, 90 100 Q90 140, 60 140 Z"
    fill="white"
  />
  <path
    d="M240 140 Q270 100, 240 50 Q210 20, 210 100 Q210 140, 240 140 Z"
    fill="white"
  />

  <circle cx="120" cy="130" r="25" fill="white" stroke="black" />
  <circle cx="180" cy="130" r="25" fill="white" stroke="black" />
  <circle cx="120" cy="130" r="12" fill="black" />
  <circle cx="180" cy="130" r="12" fill="black" />

  <path
    d="M130 190 Q150 210, 170 190 Q170 215, 130 215 Q130 190, 130 190 Z"
    fill="black"
  />
</svg>; */
}
