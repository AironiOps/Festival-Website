import { DatesView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "dates");

export default function Page() {
  return <DatesView locale="en" />;
}
