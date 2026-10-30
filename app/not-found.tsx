import { Arrow, Button } from "@/components/Button";
import { SiteChrome } from "@/components/SiteChrome";

/** One 404 page for both languages (static hosting serves a single 404.html). */
export default function NotFound() {
  return (
    <SiteChrome locale="en">
      <div className="wrap py-28">
        <p className="slate">Error 404 · Reel missing</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,7vw,5rem)]">This page isn&apos;t in the programme.</h1>
        <p lang="ko" className="mt-6 text-xl text-paper/80">찾으시는 페이지가 없습니다.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to the festival <Arrow /></Button>
          <Button href="/ko/" variant="ghost"><span lang="ko">한국어 홈으로</span></Button>
        </div>
      </div>
    </SiteChrome>
  );
}
