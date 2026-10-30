import type { Category } from "../categories";
import { categories as en } from "../categories";

/**
 * Korean category names. `formName` is the English name shown on the entry
 * form, so Korean visitors can match the two while the form is in English.
 */
export const categoriesPendingNote = "부문별 설명, 러닝타임 제한, 부문별 세부 규정은 승인 절차 중입니다.";

const ko: Record<string, { name: string; award: string; note?: string }> = {
  advertisement: { name: "광고", award: "최우수 광고상" },
  "music-video": { name: "뮤직비디오", award: "최우수 뮤직비디오상" },
  "youth-film": {
    name: "청소년 제작 영화",
    award: "최우수 청소년 제작 영화상",
    note: "만 19세 미만 창작자가 만든 작품. 부모 또는 법정대리인의 동의가 필요합니다.",
  },
  "feature-film": { name: "장편 영화", award: "최우수 장편 영화상" },
  "micro-series": { name: "마이크로 시리즈", award: "최우수 마이크로 시리즈상" },
  "vertical-mobile": { name: "세로형·모바일 콘텐츠", award: "최우수 세로형·모바일 콘텐츠상" },
  "live-action-short": { name: "실사 단편 영화", award: "최우수 실사 단편 영화상" },
  "film-for-youth": { name: "청소년 관객 영화", award: "최우수 청소년 관객 영화상", note: "청소년 관객을 위해 만든 작품." },
};

export const categories: Category[] = en.map((c) => ({
  ...c,
  formName: c.name,
  name: ko[c.slug]?.name ?? c.name,
  award: ko[c.slug]?.award ?? c.award,
  note: ko[c.slug]?.note ?? c.note,
}));
