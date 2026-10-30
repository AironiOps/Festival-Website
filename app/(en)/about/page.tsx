import { AboutView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "about");

export default function Page() {
  return <AboutView locale="en" />;
}
