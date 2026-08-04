import { createFileRoute } from "@tanstack/react-router";
import { CivicNav } from "@/components/civic/CivicNav";
import { CivicIntelligence } from "@/components/civic/CivicIntelligence";
import { ChapterHeader, ChapterFootLink } from "@/components/civic/ChapterHeader";
import { CivicFooter } from "@/components/civic/CivicFooter";

const TITLE = "Civic Intelligence — Solena Civic";
const DESCRIPTION =
  "Citizen trust, communication health and accessibility, measured and published the way public infrastructure is measured.";

export const Route = createFileRoute("/intelligence")({
  component: IntelligencePage,
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

function IntelligencePage() {
  return (
    <>
      <CivicNav alwaysVisible />
      <main>
        <ChapterHeader
          eyebrow="Chapter Four — Knowledge"
          title="Design is governance made visible."
          intro="Institutional memory made answerable: the distance between intention and experience, observed continuously."
        />
        <CivicIntelligence />
        <ChapterFootLink to="/atlas" label="The Civic Atlas" />
      </main>
      <CivicFooter />
    </>
  );
}
