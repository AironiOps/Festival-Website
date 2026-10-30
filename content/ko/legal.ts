import type { LegalDoc } from "../legal";

/**
 * Korean legal page outlines. Counsel-approved Korean text goes into `body`.
 * A Korean privacy policy must meet the Personal Information Protection Act
 * (개인정보 보호법); counsel decides the final section list.
 */
export const privacyPolicy: LegalDoc = {
  title: "개인정보처리방침",
  approved: false,
  lastUpdated: null,
  intro: null,
  sections: [
    { heading: "운영 주체", body: null },
    { heading: "수집하는 개인정보 항목", body: null },
    { heading: "개인정보의 이용 목적", body: null },
    { heading: "개인정보 처리를 위탁하는 서비스", body: null },
    { heading: "출품 신청서(Fillout)", body: null },
    { heading: "영화제 기록 및 심사(Airtable, Make)", body: null },
    { heading: "이메일 발송(Resend)", body: null },
    { heading: "동영상 호스팅(YouTube, Vimeo)", body: null },
    { heading: "웹사이트 호스팅 및 기술 정보", body: null },
    { heading: "쿠키", body: null },
    { heading: "만 19세 미만 창작자", body: null },
    { heading: "랩 워크숍 예약", body: null },
    { heading: "개인정보 보유 기간", body: null },
    { heading: "정보주체의 권리", body: null },
    { heading: "개인정보의 국외 이전", body: null },
    { heading: "문의처 및 개인정보 보호책임자", body: null },
  ],
};

export const entryTerms: LegalDoc = {
  title: "출품 약관",
  approved: false,
  lastUpdated: null,
  intro: null,
  sections: [
    { heading: "주최자", body: null },
    { heading: "참가 자격", body: null },
    { heading: "만 19세 미만 창작자", body: null },
    { heading: "출품 가능 작품", body: null },
    { heading: "AI 및 제3자 저작물 사용", body: null },
    { heading: "공모 부문", body: null },
    { heading: "출품 방법", body: null },
    { heading: "상영 링크", body: null },
    { heading: "심사", body: null },
    { heading: "시상", body: null },
    { heading: "권리 및 이용 허락", body: null },
    { heading: "출품 철회 및 실격", body: null },
    { heading: "책임의 제한", body: null },
    { heading: "준거법", body: null },
  ],
};
