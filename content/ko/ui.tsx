import type { LinkComp, UI } from "../ui";

/** Korean interface text. Same keys as content/ui.tsx. */
export const ui: UI = {
  chrome: {
    skip: "본문으로 건너뛰기",
    testBar: "테스트 사이트 · 비공개 · 확정되지 않은 내용",
    home: "홈",
    submitShort: "출품",
    submitLong: "작품 출품하기",
    menu: "메뉴",
    close: "닫기",
    language: "언어",
    mainNav: "주 메뉴",
    footerFestival: "영화제",
    footerLegal: "약관 및 정책",
    footerPeople: "심사위원 · 스태프",
    rights: "모든 권리 보유.",
    zone: "서울 · KST UTC+9",
    pending: "확정 전",
  },
  links: {
    juryRoom: "심사위원실 (Jury Room)",
    juryNote: "초청된 심사위원 전용입니다. 컴퓨터나 태블릿을 이용해 주세요. 휴대전화는 지원되지 않습니다.",
    staff: "스태프 로그인",
    newTab: " (새 탭에서 열림)",
    staffNewTab: " (Team Center, 새 탭에서 열림)",
    notConfigured: "링크 미설정",
    englishOnly: "심사위원실과 스태프 화면은 영어로 제공됩니다.",
  },
  home: {
    call: "작품 공모",
    heroLines: ["세계 AI", "영화제"],
    keyFacts: "주요 정보",
    factOpen: "접수 시작",
    factClose: "접수 마감",
    factFestival: "영화제",
    factOpenTo: "참가 대상",
    allCountries: "전 세계",
    tba: "추후 공지",
    factsNote: "모든 일정은 잠정적이며 서울 시간 기준입니다.",
    explore: "영화제 둘러보기",
    festivalLabel: "영화제",
    festivalHeading: (
      <>
        AI로 만든 영화, <em className="text-celadon">영화로서 평가합니다.</em>
      </>
    ),
    pillars: [
      ["국제 공모", "전 세계 어디에서나 출품할 수 있습니다. 언어와 장르에 제한이 없습니다."],
      ["8개 부문", "광고와 뮤직비디오부터 장편 영화, 마이크로 시리즈, 세로형 콘텐츠까지."],
      ["블라인드 심사", "예심 심사위원단과 본심 심사위원단이 제작자를 모르는 상태에서 작품을 평가합니다."],
    ],
    categoriesLabel: "공모 부문",
    allCategories: "부문별 자세히 보기 →",
    enterLabel: "출품 방법",
    enterHeading: "YouTube나 Vimeo에 올리고, 링크를 보내 주세요.",
    enterBody:
      "작품은 출품자 본인의 채널에 그대로 둡니다. 출품 신청서에 인적 사항, 작품 링크, 동의 사항을 입력하면 이후 절차는 영화제가 진행합니다.",
    readSteps: "절차 보기",
  },
  about: {
    title: "영화제 소개",
    slate: "영화제 소개",
    mission: "미션",
    scene: "장면",
    objectives: "목표",
    organiser: "주최",
  },
  categories: {
    title: "공모 부문",
    slate: (n: number) => `${n}개 경쟁 부문`,
    lede: "작품은 한 부문에만 출품할 수 있으며, 부문마다 별도의 상이 있습니다.",
    cat: "부문",
    pendingDescription: "부문 설명은 승인 후 게시됩니다.",
    formNameLabel: "신청서 표기",
    footnote:
      "선택할 수 있는 부문은 출품 신청서에 표시됩니다. 이 페이지와 신청서 내용이 다를 경우 신청서와 출품 약관이 우선합니다.",
  },
  howToEnter: {
    title: "출품 방법",
    slate: "출품 안내",
    lede: "네 단계로 진행됩니다. 작품은 출품자의 YouTube 또는 Vimeo 채널에 그대로 두며, 이 웹사이트는 출품작을 호스팅하거나 저장하지 않습니다.",
    take: (i: number, n: number) => `단계 ${i} / ${n}`,
    steps: (A: LinkComp) => [
      {
        t: "참가 자격 확인",
        b: (
          <>
            <A href="/terms/">출품 약관</A>과 <A href="/categories/">공모 부문</A>을 확인해 주세요. 만 14세 이상이면 어느 국가에서나
            출품할 수 있습니다. 만 19세 미만은 부모 또는 법정대리인의 동의가 필요합니다.
          </>
        ),
      },
      {
        t: "작품과 링크 준비",
        b: (
          <>
            완성된 작품을 YouTube에 <strong>일부 공개(unlisted)</strong> 동영상으로 올리거나 Vimeo에 올려 주세요. 로그인하지 않은 시크릿
            창에서 링크가 재생되는지 확인하고, 심사 기간 동안 링크를 변경하거나 삭제하지 마세요.
          </>
        ),
      },
      {
        t: "출품 신청서 작성",
        b: (
          <>
            <A href="/submit/">작품 출품하기</A> 페이지로 이동하세요. 신청서에는 인적 사항, 거주 국가, 작품 정보와 링크, 동의 사항을
            입력합니다. 입력한 내용은 영화제의 신청서 서비스 제공업체로 바로 전송됩니다.
          </>
        ),
      },
      {
        t: "접수 확인",
        b: (
          <>
            제출하면 화면에 접수 확인 메시지가 표시됩니다. 추가로 필요한 사항이 있으면 영화제가 입력하신 이메일 주소로 연락드립니다.
          </>
        ),
      },
    ],
    linksLabel: "상영 링크",
    links: [
      "YouTube와 Vimeo 링크만 받습니다. 파일 공유 서비스나 다운로드 링크는 받지 않습니다.",
      "심사위원은 영화제 전용 플레이어로 작품을 시청하며, 채널명과 제목이 가려져 블라인드 심사가 유지됩니다.",
    ],
    linksPending: "상영 링크의 최종 기술 요건(해상도, 러닝타임, 자막)은 확정 후 안내합니다.",
  },
  submit: {
    title: "작품 출품하기",
    description: "공식 출품 신청서로 작품을 출품하세요.",
    slate: "공식 출품 신청서",
    lede: "YouTube 또는 Vimeo 링크를 준비해 주세요.",
    eligibilityLabel: "참가 자격 · 요약",
    eligibility: [
      "모든 국가의 창작자가 출품할 수 있습니다.",
      "만 14세 미만은 출품할 수 없습니다.",
      "만 14세 이상 만 19세 미만은 출품이 진행되기 전에 부모 또는 법정대리인의 동의가 필요합니다.",
    ],
    summaryOnly: (A: LinkComp) => (
      <>
        요약입니다. <A href="/terms/">출품 약관</A>이 우선하며, 최종 문구는 승인 절차 중입니다.
      </>
    ),
    beforeLabel: "시작하기 전에",
    before: (A: LinkComp) => (
      <>
        <A href="/terms/">출품 약관</A>과 <A href="/privacy/">개인정보처리방침</A>을 읽어 주세요. 제출하신 내용을 영화제가 어떻게
        이용하는지 안내되어 있습니다.
      </>
    ),
    helpLabel: "도움이 필요하신가요?",
    readFaq: "자주 묻는 질문 보기",
    closed: (A: LinkComp) => (
      <>
        신청서에 접수 마감으로 표시되면 현재 출품을 받지 않는 기간입니다. <A href="/dates/">주요 일정</A>을 확인해 주세요.
      </>
    ),
    formHeading: "출품 신청서",
    formSlate: "공식 출품 신청서",
    formIntro: "신청서는 이 페이지 위에 패널로 열립니다. 언제든 닫고 이 페이지로 돌아올 수 있습니다.",
    formButton: "출품 신청서 열기",
    formRegion: "작품 출품 신청서",
    formLanguageNote: "출품 신청서는 현재 영어로 제공됩니다. 한국어 신청서는 준비 중입니다.",
    noscript: "출품 신청서를 이용하려면 JavaScript가 필요합니다.",
    openDirect: "신청서 바로 열기",
    footnote: "신청서는 Fillout이 제공합니다. 입력한 내용은 영화제로 바로 전송되며, 이 웹사이트는 내용을 보거나 저장하지 않습니다.",
    placeholderTitle: "연동 대기",
    placeholderBody: "이 빌드에는 출품 신청서가 연결되어 있지 않습니다. NEXT_PUBLIC_FILLOUT_FORM_ID에 원본 신청서 ID를 설정하세요.",
  },
  faq: {
    title: "자주 묻는 질문",
    slate: "FAQ",
    heading: "자주 묻는 질문",
    lede: "간단한 답변입니다. 답변과 출품 약관이 다를 경우 출품 약관이 우선합니다.",
    stuck: (A: LinkComp) => (
      <>
        더 궁금한 점이 있으신가요? <A href="/contact/">영화제에 문의하기</A>
      </>
    ),
  },
  dates: {
    title: "주요 일정",
    slate: "일정 · 서울 시간(KST)",
    lede: "‘잠정’으로 표시된 일정은 변경될 수 있습니다. 확정된 일정은 이곳에 게시됩니다.",
    allTba: "일정은 추후 공지됩니다.",
    provisional: "잠정",
    tba: "추후 공지",
    ongoing: "진행 중",
  },
  lab: {
    title: "랩",
    slate: "워크숍 · 마스터클래스",
    how: "예약 방법",
    step: (i: number) => `${i}단계`,
    book: "세션 예약",
    privacy: (A: LinkComp) => (
      <>
        예약 정보는 영화제 <A href="/privacy/">개인정보처리방침</A>에 따라 처리됩니다. 작품 출품은 별도 절차이니{" "}
        <A href="/submit/">작품 출품하기</A>를 참고하세요.
      </>
    ),
    footnote: "예약 신청서는 Zite(Fillout)가 제공하며 영화제 예약 기록에 저장됩니다. 이 웹사이트는 입력한 내용을 보거나 저장하지 않습니다.",
    embedSlate: "무료 · 선착순 · 마감 시 대기자 등록",
    embedIntro: "예약 신청서는 이 페이지 위에 패널로 열립니다. 언제든 닫고 이 페이지로 돌아올 수 있습니다.",
    button: "랩 세션 예약하기",
    region: "랩 워크숍 예약",
    openNewTab: "새 탭에서 열기",
    closePanel: "예약 신청서 닫기",
    frameTitle: "WAiFF Lab 워크숍 예약 신청서",
    openForm: "예약 신청서 열기",
    soonTitle: "예약 오픈 예정",
    soonBody: "첫 워크숍이 발표되면 이곳에 예약 신청서가 표시됩니다.",
    formLanguageNote: "예약 신청서는 현재 영어로 제공됩니다. 한국어 신청서는 준비 중입니다.",
  },
  contact: {
    title: "문의",
    slate: "문의",
    heading: "문의하기",
    lede: "출품, 제출하신 작품, 영화제에 관한 문의를 받습니다.",
    email: "이메일",
    noFiles: "작품 파일은 이메일로 보내지 마시고 YouTube 또는 Vimeo 링크를 이용해 주세요.",
    jurors: "심사위원",
  },
  legal: {
    lastUpdated: (d: string) => `최종 업데이트 ${d}`,
    draft: "초안 구성",
    outlineOnly:
      "이 페이지는 목차만 보여 줍니다. 법률 검토를 거쳐 승인된 본문이 이곳에 게시될 예정이며, 현재 이 페이지의 내용은 구속력이 없습니다.",
    contents: "목차",
    sectionPending: "승인된 본문 게시 예정.",
    translationNote: "영문본과 국문본 중 어느 쪽이 우선하는지는 승인된 본문에서 정합니다.",
  },
};
