import AuraDentalLanding from "./components/AuraDentalLanding";
import { client } from "@/sanity/lib/client";

async function getServices() {
  const services = await client.fetch(`*[_type == "service"]`);
  return services;
}

async function getHero() {
  const hero = await client.fetch(`*[_type == "hero"] | order(_updatedAt desc)[0]`)
  return hero
}

export default async function Home() {
  const services = await getServices();
  const hero = await getHero();
  return <AuraDentalLanding sanityServices={services} sanityHero={hero} />;
}