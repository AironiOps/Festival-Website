import { PrivacyView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "privacy");

export default function Page() {
  return <PrivacyView locale="ko" />;
}
