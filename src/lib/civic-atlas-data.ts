export type AtlasLayer =
  | "identity"
  | "communication"
  | "infrastructure"
  | "experience"
  | "technology"
  | "culture"
  | "localization"
  | "trust"
  | "campaign"
  | "knowledge";

export const ATLAS_LAYERS: { id: AtlasLayer; label: string; note: string }[] = [
  { id: "identity", label: "Identity", note: "The signature of the state, applied without variance." },
  { id: "communication", label: "Communication", note: "How a nation speaks to the people inside it." },
  { id: "infrastructure", label: "Infrastructure", note: "The physical grammar of public life." },
  { id: "experience", label: "Experience", note: "Every place a citizen is asked to stand." },
  { id: "technology", label: "Technology", note: "Services that behave the way they promise to." },
  { id: "culture", label: "Culture", note: "Memory kept in public custody." },
  { id: "localization", label: "Localization", note: "One institution, many mother tongues." },
  { id: "trust", label: "Trust", note: "The distance between intention and experience." },
  { id: "campaign", label: "Campaign", note: "Persuasion without condescension." },
  { id: "knowledge", label: "Knowledge", note: "Institutional memory made answerable." },
];

export type AtlasNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  scale: 1 | 2 | 3;
  layers: AtlasLayer[];
  note: string;
};

/** Coordinates are authored inside a 1200 × 760 civic plane. */
export const ATLAS_NODES: AtlasNode[] = [
  { id: "national", label: "National Government", x: 600, y: 372, scale: 3, layers: ["identity", "trust", "communication"], note: "The centre from which every other system inherits its tone." },
  { id: "ministries", label: "Ministries", x: 452, y: 268, scale: 2, layers: ["identity", "communication", "knowledge"], note: "Twenty-two voices asked to sound like one institution." },
  { id: "counties", label: "County Governments", x: 760, y: 262, scale: 2, layers: ["localization", "experience", "identity"], note: "Where national intention becomes a street a person walks on." },
  { id: "authorities", label: "Authorities", x: 372, y: 452, scale: 2, layers: ["identity", "trust"], note: "Regulators whose credibility is carried by their design." },
  { id: "health", label: "Health", x: 300, y: 172, scale: 2, layers: ["experience", "campaign", "communication"], note: "Hospitals, clinics, emergency lines, vaccination programmes." },
  { id: "hospitals", label: "Hospitals", x: 172, y: 246, scale: 1, layers: ["experience", "identity"], note: "Wayfinding written for people who are frightened." },
  { id: "emergency", label: "Emergency Response", x: 190, y: 118, scale: 1, layers: ["communication", "campaign", "trust"], note: "Language that must work on the worst day of a life." },
  { id: "education", label: "Education", x: 862, y: 150, scale: 2, layers: ["knowledge", "culture", "communication"], note: "Curriculum, campuses, credentials, public literacy." },
  { id: "infrastructure", label: "Infrastructure", x: 604, y: 168, scale: 2, layers: ["infrastructure", "experience"], note: "Roads, rail, water, power — read before they are used." },
  { id: "transport", label: "Transport", x: 700, y: 92, scale: 1, layers: ["infrastructure", "experience", "identity"], note: "Fleets, terminals, timetables, signage systems." },
  { id: "water", label: "Water", x: 470, y: 110, scale: 1, layers: ["infrastructure", "trust"], note: "The most political utility in any country." },
  { id: "energy", label: "Energy", x: 360, y: 78, scale: 1, layers: ["infrastructure", "technology"], note: "Grids explained to the households that depend on them." },
  { id: "justice", label: "Justice", x: 246, y: 560, scale: 2, layers: ["trust", "identity", "knowledge"], note: "Courts, records, rights, procedure made legible." },
  { id: "tax", label: "Revenue & Tax", x: 400, y: 640, scale: 2, layers: ["communication", "trust", "technology"], note: "Compliance is a design problem before it is a legal one." },
  { id: "identityreg", label: "Civil Registration", x: 552, y: 560, scale: 2, layers: ["identity", "technology", "trust"], note: "Birth, name, citizenship — the first public document." },
  { id: "digital", label: "Digital Government", x: 700, y: 470, scale: 3, layers: ["technology", "experience", "knowledge"], note: "Portals, dashboards, permits, payments, open data, AI." },
  { id: "gis", label: "GIS & Open Data", x: 880, y: 540, scale: 1, layers: ["technology", "knowledge"], note: "The country described in coordinates and released publicly." },
  { id: "housing", label: "Housing & Planning", x: 900, y: 400, scale: 1, layers: ["infrastructure", "experience", "localization"], note: "Settlements planned with the people who will live in them." },
  { id: "environment", label: "Environment", x: 1004, y: 300, scale: 2, layers: ["campaign", "culture", "knowledge"], note: "Conservation communicated as belonging, not restriction." },
  { id: "agriculture", label: "Agriculture", x: 1060, y: 452, scale: 1, layers: ["localization", "campaign"], note: "Extension services translated into fourteen languages." },
  { id: "tourism", label: "Tourism", x: 1080, y: 176, scale: 2, layers: ["identity", "campaign", "culture"], note: "A nation introducing itself before anyone arrives." },
  { id: "museums", label: "Museums & Archives", x: 940, y: 656, scale: 1, layers: ["culture", "knowledge"], note: "Records designed to be read a century from now." },
  { id: "embassies", label: "Embassies", x: 700, y: 690, scale: 2, layers: ["identity", "localization", "communication"], note: "The country, abroad, in a single room." },
  { id: "investment", label: "Investment Promotion", x: 560, y: 700, scale: 1, layers: ["campaign", "identity"], note: "Capital arrives where clarity already lives." },
  { id: "development", label: "Development Agencies", x: 150, y: 400, scale: 2, layers: ["localization", "knowledge", "trust"], note: "Global programmes made recognisably local." },
  { id: "ngos", label: "NGOs", x: 130, y: 640, scale: 1, layers: ["localization", "campaign"], note: "Field communication that survives no connectivity." },
  { id: "insurance", label: "Insurance", x: 246, y: 700, scale: 1, layers: ["trust", "communication", "localization"], note: "Products explained until they are actually understood." },
];

export const ATLAS_EDGES: [string, string][] = [
  ["national", "ministries"], ["national", "counties"], ["national", "authorities"], ["national", "digital"],
  ["national", "identityreg"], ["national", "embassies"], ["national", "justice"], ["national", "infrastructure"],
  ["ministries", "health"], ["ministries", "education"], ["ministries", "infrastructure"], ["ministries", "water"],
  ["ministries", "energy"], ["ministries", "environment"], ["ministries", "tax"],
  ["health", "hospitals"], ["health", "emergency"], ["health", "digital"],
  ["counties", "housing"], ["counties", "transport"], ["counties", "agriculture"], ["counties", "environment"],
  ["counties", "gis"], ["counties", "education"],
  ["infrastructure", "transport"], ["infrastructure", "water"], ["infrastructure", "energy"], ["infrastructure", "housing"],
  ["digital", "gis"], ["digital", "tax"], ["digital", "identityreg"], ["digital", "housing"], ["digital", "museums"],
  ["justice", "identityreg"], ["justice", "tax"], ["justice", "authorities"],
  ["authorities", "insurance"], ["authorities", "development"], ["authorities", "environment"],
  ["development", "ngos"], ["development", "insurance"], ["development", "counties"],
  ["embassies", "tourism"], ["embassies", "investment"], ["embassies", "development"],
  ["tourism", "environment"], ["tourism", "museums"], ["tourism", "transport"],
  ["education", "museums"],
  ["insurance", "ngos"], ["investment", "tax"], ["agriculture", "environment"], ["museums", "embassies"],
];

export const NODE_BY_ID = new Map(ATLAS_NODES.map((n) => [n.id, n]));

export function neighboursOf(id: string): Set<string> {
  const set = new Set<string>([id]);
  for (const [a, b] of ATLAS_EDGES) {
    if (a === id) set.add(b);
    if (b === id) set.add(a);
  }
  return set;
}
