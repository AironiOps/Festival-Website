import { FaqView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "faq");

export default function Page() {
  return <FaqView locale="en" />;
}
