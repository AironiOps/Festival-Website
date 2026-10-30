import { TermsView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "terms");

export default function Page() {
  return <TermsView locale="ko" />;
}
