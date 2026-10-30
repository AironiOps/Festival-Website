import { pending, type Copy } from "../types";
import type { about as aboutEn, festival as festivalEn, heroImage as heroEn } from "../festival";
import { heroImage as heroImageEn } from "../festival";

/** Korean festival identity and site-wide text. Mirrors content/festival.ts. */
export const festival: typeof festivalEn = {
  name: "WAiFF 서울 2027",
  wordmark: { lead: "WAiFF", trail: "서울 2027" },
  longName: "세계 AI 영화제 서울 2027",
  city: "서울",
  tagline: "인공지능으로 만든 영화를 위한 국제 경쟁 영화제.",
  description:
    "세계 AI 영화제 서울 2027은 AI 도구로 작품을 만든 전 세계 영화인의 출품을 기다립니다. 출품작은 예심 심사위원단과 본심 심사위원단이 시청하고 평가하며, 수상작은 서울에서 발표됩니다.",
  organiser: pending("주최 기관은 법률 검토 후 확정됩니다.") as Copy,
  contactEmail: pending("공식 문의 이메일 주소는 확정 후 안내합니다.") as Copy,
  copyrightHolder: "WAiFF Seoul",
  copyrightYear: 2026,
};

export const about: typeof aboutEn = {
  mission: pending("영화제 미션은 추후 게시됩니다.") as Copy,
  sections: [
    {
      heading: "AI로 만들고, 영화로 평가합니다",
      body:
        "이 영화제는 이미지, 사운드, 편집, 각본 등 제작 과정에서 인공지능이 실질적인 역할을 한 영화를 위한 자리입니다. 심사는 스크린에 담긴 결과물로 이루어지며, 어떤 도구를 썼는지보다 완성도와 이야기, 의도를 중요하게 봅니다.",
    },
    {
      heading: "모든 국가에 열려 있습니다",
      body: "전 세계 어디에서나 출품할 수 있습니다. 출품자는 출품 신청서에 거주 국가를 기재합니다.",
    },
    {
      heading: "심사",
      body:
        "예심 심사위원단이 접수된 작품을 순차적으로 시청하고 공개된 기준에 따라 평가합니다. 본선 진출작은 본심 심사위원단이 심사해 수상작을 결정합니다. 심사위원은 평가하는 동안 제작자가 누구인지 알 수 없습니다.",
    },
    {
      heading: "서울",
      body: "시상은 서울에서 열리는 영화제에서 진행됩니다. 프로그램, 장소, 티켓 정보는 확정되는 대로 이곳에 게시됩니다.",
    },
  ],
  objectives: pending("영화제 목표는 추후 게시됩니다.") as Copy,
};

export const heroImage: typeof heroEn = {
  ...heroImageEn,
  alt: "노을 진 옥상에서 어깨 너머로 뒤돌아보는 젊은 여성과 남성. 뒤로 도시의 고층 빌딩이 보인다.",
  credit: "AI 생성 이미지",
};
