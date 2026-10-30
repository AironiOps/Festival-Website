import { HowToEnterView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "how-to-enter");

export default function Page() {
  return <HowToEnterView locale="en" />;
}
