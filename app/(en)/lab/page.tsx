import { LabView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "lab");

export default function Page() {
  return <LabView locale="en" />;
}
