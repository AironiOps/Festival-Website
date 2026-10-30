import { SubmitView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "submit");

export default function Page() {
  return <SubmitView locale="ko" />;
}
