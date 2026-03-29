export type ScoreSet = {
  fresh: number
  valid: number
  heat: number
  controversy: number
}

export type Claim = {
  title: string
  summary: string
  target: string
  timestamp: string
  seconds: number
  evidence: string
  conflict?: string
}

export type HeadlineItem = {
  id: string
  headline: string
  dek: string
  channel: string
  publishedAt: string
  tags: string[]
  followed: boolean
  scores: ScoreSet
  featuredReason?: string
  claims: Claim[]
}

export const filters = {
  sort: ['중요도순', '최신순', '급상승순', '신뢰도순', '논쟁도순'],
  grades: ['전체', '중등', '고1', '고2', '고3', 'N수', 'IB'],
  subjects: ['전체', '수학', '영어', '국어', '입시전략', 'IB'],
  topics: ['내신', '수능', '생기부', '순공시간', '독학', 'IB교육', '변화', '논쟁'],
}

export const headlines: HeadlineItem[] = [
  {
    id: '1',
    headline: '고1 수학, 선행보다 시험지 적응력이 더 중요하다는 주장 확산',
    dek: '최근 교육 채널들에서 선행량 자체보다 학교별 시험 유형 적응이 실제 점수 차이를 만든다는 설명이 반복된다.',
    channel: '입시인사이트랩',
    publishedAt: '2026-03-27',
    tags: ['고1', '수학', '내신', '변화'],
    followed: true,
    scores: { fresh: 82, valid: 77, heat: 88, controversy: 54 },
    featuredReason: '최근 내신 전략 변화 설명력이 높고 실제 적용도가 큰 영상',
    claims: [
      {
        title: '학교 시험 유형 적응이 선행량보다 점수 차이를 더 만든다',
        summary: '학교별 출제 스타일 차이가 커서 진도 선행만으로는 상위권 유지가 어렵다는 주장.',
        target: '고1 일반고 중상위권',
        timestamp: '03:24',
        seconds: 204,
        evidence: '최근 3개 학교 시험지를 비교하면 킬러 유형이 다르다는 사례 제시.',
        conflict: '상위권 특목고 준비군은 여전히 선행량이 중요하다는 반론 존재.',
      },
      {
        title: '오답노트보다 시험지 복원 훈련이 더 효율적일 수 있다',
        summary: '틀린 문제를 길게 분석하는 것보다 실제 시험지 맥락을 다시 재현하는 방식이 효과적이라는 설명.',
        target: '고1 내신 준비 학생',
        timestamp: '08:11',
        seconds: 491,
        evidence: '최근 중간고사 대비 루틴 예시를 통해 설명.',
      },
      {
        title: '내신 수학은 범위 제한형이라 개념량보다 패턴 대응력이 중요하다',
        summary: '개념의 폭보다 자주 반복되는 문제 구조에 익숙해지는 것이 성적에 직접 연결된다는 주장.',
        target: '고1 수학 내신',
        timestamp: '12:40',
        seconds: 760,
        evidence: '학교 시험 변형 패턴 4종을 예로 듦.',
      },
    ],
  },
  {
    id: '2',
    headline: '순공시간 숫자보다 과목 전환 구조가 중요하다는 조언 증가',
    dek: '긴 공부시간 인증보다 집중 구간 설계와 과목 전환 루틴이 실제 성과를 더 좌우한다는 의견이 늘고 있다.',
    channel: '혼공전략채널',
    publishedAt: '2026-03-28',
    tags: ['고2', '독학', '순공시간', '논쟁'],
    followed: true,
    scores: { fresh: 76, valid: 73, heat: 80, controversy: 71 },
    featuredReason: '학생들이 가장 자주 오해하는 순공시간 담론을 잘 정리함',
    claims: [
      {
        title: '순공시간 총량보다 끊기는 지점을 설계해야 한다',
        summary: '10시간 공부보다 90분 집중-회복 루틴이 더 중요하다는 주장.',
        target: '독학 수험생',
        timestamp: '02:18',
        seconds: 138,
        evidence: '공부기록표 예시와 함께 설명.',
      },
      {
        title: '과목 전환 실패가 체감 공부량 하락의 주원인이다',
        summary: '수학에서 영어로 넘어갈 때 회복 시간을 설계하지 않으면 루틴이 무너진다는 설명.',
        target: '고2~N수',
        timestamp: '06:52',
        seconds: 412,
        evidence: '집중 붕괴 패턴 3가지를 비교.',
      },
      {
        title: '긴 공부시간 인증은 정보가 아니라 압박으로 작동할 수 있다',
        summary: '시간 자체보다 구조를 봐야 한다는 경고성 주장.',
        target: 'SNS 학습정보 소비자',
        timestamp: '10:03',
        seconds: 603,
        evidence: '학습 불안 사례 언급.',
      },
    ],
  },
  {
    id: '3',
    headline: 'IB 영어는 암기보다 글쓰기 구조 훈련이 체감 성과를 가른다는 해석',
    dek: 'IB 관련 채널들에서 읽기량 자체보다 논지 구성과 서술 구조 훈련이 성적 차이를 만든다는 설명이 반복된다.',
    channel: 'IB Compass',
    publishedAt: '2026-03-26',
    tags: ['IB', '영어', 'IB교육'],
    followed: false,
    scores: { fresh: 84, valid: 80, heat: 62, controversy: 44 },
    featuredReason: 'IB 관심층에게 실질적 전략을 제시하는 드문 영상',
    claims: [
      {
        title: 'IB 영어는 읽기량보다 논증 구조가 성적에 직접적이다',
        summary: '좋은 답안은 많이 읽는 것보다 구조를 반복 훈련한 학생에게서 나온다는 주장.',
        target: 'IB 영어 학생',
        timestamp: '04:15',
        seconds: 255,
        evidence: '실제 에세이 비교 예시.',
      },
      {
        title: '교사 피드백을 문장 단위보다 구조 단위로 저장해야 한다',
        summary: '표현 수정보다 구조 패턴 라이브러리가 더 중요하다는 설명.',
        target: 'IB essay 작성자',
        timestamp: '09:41',
        seconds: 581,
        evidence: '피드백 재활용 사례 제시.',
      },
      {
        title: '암기형 접근은 초반 안정감은 주지만 상위권 확장성은 낮다',
        summary: '문장 템플릿만 외우는 방식의 한계를 지적.',
        target: 'IB 중상위권',
        timestamp: '13:08',
        seconds: 788,
        evidence: '고득점 답안 구조 분석.',
      },
    ],
  },
]
