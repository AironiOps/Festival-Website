import { HomeView } from "@/views/Home";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "home");

export default function Page() {
  return <HomeView locale="ko" />;
}
