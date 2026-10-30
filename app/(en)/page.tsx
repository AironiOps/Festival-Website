import { HomeView } from "@/views/Home";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "home");

export default function Page() {
  return <HomeView locale="en" />;
}
