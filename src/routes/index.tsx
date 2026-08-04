import { createFileRoute } from "@tanstack/react-router";
import { CivicNav } from "@/components/civic/CivicNav";
import { Hero } from "@/components/civic/Hero";
import { Manifesto } from "@/components/civic/Manifesto";
import { InvisibleLayer } from "@/components/civic/InvisibleLayer";
import { EditorialInsert } from "@/components/civic/EditorialInsert";
import { ChapterIndex } from "@/components/civic/ChapterIndex";
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
        <EditorialInsert lines={["Infrastructure", "is information."]} attribution="Phase II — The System" tone="deep" />
        <ChapterIndex />

      </main>
      <CivicFooter />
    </>
  );
}
