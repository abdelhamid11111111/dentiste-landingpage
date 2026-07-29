import AuraDentalLanding from "./components/AuraDentalLanding";
import { client } from "@/sanity/lib/client";

async function getServices() {
  const services = await client.fetch(`*[_type == "service"]`);
  return services;
}

export default async function Home() {
  const services = await getServices();
  return <AuraDentalLanding sanityServices={services} />;
}