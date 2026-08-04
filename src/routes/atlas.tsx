import { createFileRoute } from "@tanstack/react-router";
import { CivicNav } from "@/components/civic/CivicNav";
import { CivicAtlas } from "@/components/civic/CivicAtlas";
import { ChapterHeader, ChapterFootLink } from "@/components/civic/ChapterHeader";
import { CivicFooter } from "@/components/civic/CivicFooter";

const TITLE = "The Civic Atlas — Solena Civic";
const DESCRIPTION =
  "An interactive atlas of national institutions: ministries, health, justice, digital government and the ten institutional layers that connect them.";

export const Route = createFileRoute("/atlas")({
  component: AtlasPage,
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

function AtlasPage() {
  return (
    <>
      <CivicNav alwaysVisible />
      <main>
        <ChapterHeader
          eyebrow="Chapter One — The System"
          title="Governments are ecosystems."
          intro="Every institution a citizen touches belongs to one connected network. Select a system to see everything it quietly holds together."
        />
        <CivicAtlas />
        <ChapterFootLink to="/practices" label="The Practices" />
      </main>
      <CivicFooter />
    </>
  );
}
