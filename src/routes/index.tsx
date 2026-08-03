import { createFileRoute } from "@tanstack/react-router";
import { CivicNav } from "@/components/civic/CivicNav";
import { Hero } from "@/components/civic/Hero";
import { Manifesto } from "@/components/civic/Manifesto";
import { InvisibleLayer } from "@/components/civic/InvisibleLayer";
import { PublicMemory } from "@/components/civic/PublicMemory";
import { Practice } from "@/components/civic/Practice";
import { CivicAtlas } from "@/components/civic/CivicAtlas";
import { EditorialInsert } from "@/components/civic/EditorialInsert";
import { PracticeLandscapes } from "@/components/civic/PracticeLandscapes";
import { Localization } from "@/components/civic/Localization";
import { CampaignSystems } from "@/components/civic/CampaignSystems";
import { CivicIntelligence } from "@/components/civic/CivicIntelligence";
import { CivicFooter } from "@/components/civic/CivicFooter";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const TITLE = "Solena Civic — Public trust is designed";
const DESCRIPTION =
  "Solena Civic designs the systems through which governments, institutions and citizens experience one another: identity, communication, wayfinding, digital government and citizen experience.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Solena Civic",
          description: DESCRIPTION,
          url: "/",
        }),
      },
    ],
  }),
});

function Index() {
  useSmoothScroll();

  return (
    <>
      <CivicNav />
      <main>
        <Hero />
        <Manifesto />
        <InvisibleLayer />
        <PublicMemory />
        <Practice />
        <EditorialInsert lines={["Infrastructure", "is information."]} attribution="Phase II — The System" tone="deep" />
        <CivicAtlas />
        <EditorialInsert lines={["Every institution communicates.", "Even when silent."]} />
        <PracticeLandscapes />
        <EditorialInsert lines={["Trust travels", "through systems."]} tone="deep" />
        <Localization />
        <CampaignSystems />
        <EditorialInsert lines={["Design is governance", "made visible."]} tone="deep" />
        <CivicIntelligence />
        <EditorialInsert lines={["Citizens remember experiences.", "Not policies."]} />
      </main>
      <CivicFooter />
    </>
  );
}
