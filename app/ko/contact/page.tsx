import { ContactView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "contact");

export default function Page() {
  return <ContactView locale="ko" />;
}
