import type { CaseSlug } from "@/content/types";
import { GridSplit } from "./GridSplit";
import { QantiPipeline } from "./QantiPipeline";
import { SsoSequence } from "./SsoSequence";
import { TileServing } from "./TileServing";

export function caseDiagram(slug: CaseSlug, variant: "preview" | "full") {
  switch (slug) {
    case "qanti":
      return <QantiPipeline variant={variant} />;
    case "sso":
      return <SsoSequence variant={variant} />;
    case "sectra-grid":
      return <GridSplit variant={variant} />;
    case "tile-serving":
      return <TileServing variant={variant} />;
  }
}
