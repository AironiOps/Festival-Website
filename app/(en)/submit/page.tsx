import { SubmitView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "submit");

export default function Page() {
  return <SubmitView locale="en" />;
}
