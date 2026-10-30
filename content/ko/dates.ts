import type { FestivalDate } from "../dates";
import { dates as en } from "../dates";

/** Korean labels for content/dates.ts. Dates and status come from the English file, so edit dates there only. */
const ko: Record<FestivalDate["key"], { label: string; detail?: string }> = {
  open: { label: "접수 시작", detail: "출품 신청서가 열립니다." },
  review: { label: "예심", detail: "12월부터 접수되는 대로 순차적으로 심사합니다." },
  close: { label: "접수 마감", detail: "출품 마지막 날입니다." },
  shortlist: { label: "본선 진출작 발표" },
  winners: { label: "수상작 발표" },
  festival: { label: "서울 영화제 개최" },
};

export const dates: FestivalDate[] = en.map((d) => ({ ...d, label: ko[d.key].label, detail: d.detail ? ko[d.key].detail ?? d.detail : undefined }));
