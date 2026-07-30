import AuraDentalLanding from "./components/AuraDentalLanding";
import { sanityFetch } from "@/sanity/lib/live";
import type { SanityService } from "./components/AuraDentalLanding";

async function getServices() {
  const { data } = await sanityFetch({ query: `*[_type == "service"]` });
  return data as SanityService[];
}

async function getHero() {
  const { data } = await sanityFetch({ query: `*[_type == "hero"] | order(_updatedAt desc)[0]` });
  return data as unknown as Parameters<typeof AuraDentalLanding>[0]["sanityHero"];
}

export default async function Home() {
  const services = await getServices();
  const hero = await getHero();
  return <AuraDentalLanding sanityServices={services} sanityHero={hero} />;
}