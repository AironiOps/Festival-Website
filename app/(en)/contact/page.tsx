import { ContactView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "contact");

export default function Page() {
  return <ContactView locale="en" />;
}
