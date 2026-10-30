import { CategoriesView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("ko", "categories");

export default function Page() {
  return <CategoriesView locale="ko" />;
}
