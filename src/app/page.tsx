"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PawPrint, BarChart, Share2, Utensils } from "lucide-react";
import { api } from "./trpc/client";
import Navbar from "@/components/Nav";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState, useEffect } from "react";
import FeatureCard from "@/components/FeatureCard";

const LandingPage = () => {
  // const [shelters, setShelters] = useState();

  const shelters = api.shelters.getOnlyShelters.useQuery();
  // const fetchData = async () => {

  //   console.log("res", res);
  // };

  console.log("shelters", shelters.data);

  return (
    // <TRPCProvider>
    //   <HydrateClient>
    //     <Navbar />
    //     <ErrorBoundary fallback={<div>Something went wrong</div>}>
    //       <Suspense fallback={<div>Loading...</div>}>
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#impact"
          >
            Impact
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline Food Distribution for Animal Shelters
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Efficiently manage and distribute food resources across
                  multiple animal shelters with our intuitive CMS.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BarChart className="h-10 w-10" />}
                title="Inventory Tracking"
                description="Real-time monitoring of food supplies across all connected shelters."
              />
              <FeatureCard
                icon={<Share2 className="h-10 w-10" />}
                title="Resource Sharing"
                description="Facilitate easy sharing of surplus food between shelters."
              />
              <FeatureCard
                icon={<Utensils className="h-10 w-10" />}
                title="Meal Planning"
                description="Optimize meal plans based on available resources and animal needs."
              />
            </div>
          </div>
        </section>
        <section id="impact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Making a Difference
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our CMS has helped hundreds of animal shelters optimize their
                  food distribution, resulting in better care for animals and
                  reduced waste.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                    30%
                  </div>
                  <p className="text-xl">Reduction in food waste</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                    50+
                  </div>
                  <p className="text-xl">Shelters connected</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    1000s
                  </div>
                  <p className="text-xl">Animals better fed</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Optimize Your Shelter&apos;s Food Management?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Get in touch with us to learn how ShelterShare CMS can help
                  your animal shelter.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ShelterShare CMS. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
    //       </Suspense>
    //     </ErrorBoundary>
    //   </HydrateClient>
    // </TRPCProvider>
  );
};

export default LandingPage;
