import { createFileRoute } from "@tanstack/react-router";
import { CivicNav } from "@/components/civic/CivicNav";
import { Localization } from "@/components/civic/Localization";
import { CampaignSystems } from "@/components/civic/CampaignSystems";
import { ChapterHeader, ChapterFootLink } from "@/components/civic/ChapterHeader";
import { CivicFooter } from "@/components/civic/CivicFooter";

const TITLE = "Systems in Public — Solena Civic";
const DESCRIPTION =
  "Localization into Kenyan contexts and the public campaign systems — vaccination, tax, elections — that carry a nation's attention.";

export const Route = createFileRoute("/systems")({
  component: SystemsPage,
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

function SystemsPage() {
  return (
    <>
      <CivicNav alwaysVisible />
      <main>
        <ChapterHeader
          eyebrow="Chapter Three — Systems in Public"
          title="Trust travels through systems."
          intro="One institution, many mother tongues — and the campaigns through which a country speaks to itself."
        />
        <Localization />
        <CampaignSystems />
        <ChapterFootLink to="/intelligence" label="Civic Intelligence" />
      </main>
      <CivicFooter />
    </>
  );
}
