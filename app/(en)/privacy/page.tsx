import { PrivacyView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "privacy");

export default function Page() {
  return <PrivacyView locale="en" />;
}
