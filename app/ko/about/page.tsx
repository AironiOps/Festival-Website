import { AboutView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "about");

export default function Page() {
  return <AboutView locale="ko" />;
}
