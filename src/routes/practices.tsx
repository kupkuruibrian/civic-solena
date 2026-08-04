import { createFileRoute } from "@tanstack/react-router";
import { CivicNav } from "@/components/civic/CivicNav";
import { Practice } from "@/components/civic/Practice";
import { PublicMemory } from "@/components/civic/PublicMemory";
import { PracticeLandscapes } from "@/components/civic/PracticeLandscapes";
import { ChapterHeader, ChapterFootLink } from "@/components/civic/ChapterHeader";
import { CivicFooter } from "@/components/civic/CivicFooter";

const TITLE = "The Practices — Solena Civic";
const DESCRIPTION =
  "Institutional identity, civic communication, digital government and environmental experience — the four landscapes of Solena Civic practice.";

export const Route = createFileRoute("/practices")({
  component: PracticesPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PracticesPage() {
  return (
    <>
      <CivicNav alwaysVisible />
      <main>
        <ChapterHeader
          eyebrow="Chapter Two — The Practices"
          title="Each practice is a landscape, not a service."
          intro="Eleven disciplines, gathered into four landscapes that a state can actually govern."
        />
        <PracticeLandscapes />
        <Practice />
        <PublicMemory />
        <ChapterFootLink to="/systems" label="Systems in Public" />
      </main>
      <CivicFooter />
    </>
  );
}
