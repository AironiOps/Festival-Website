import { DatesView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "dates");

export default function Page() {
  return <DatesView locale="ko" />;
}
