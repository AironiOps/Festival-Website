import { FaqView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "faq");

export default function Page() {
  return <FaqView locale="ko" />;
}
