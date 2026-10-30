import { CategoriesView } from "@/views/Pages";
import { pageMeta } from "@/views/meta";

export const metadata = pageMeta("en", "categories");

export default function Page() {
  return <CategoriesView locale="en" />;
}
