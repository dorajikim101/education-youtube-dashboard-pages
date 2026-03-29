# education-youtube-dashboard-pages

GitHub Pages에서 바로 볼 수 있는 **교육 유튜브 인텔 대시보드** 1차 프로토타입입니다.

## 목표
- 메인에 업데이트된 교육 유튜브 주제를 뉴스 헤드라인처럼 노출
- 오른쪽 상단에 주목할 만한 영상 카드 배치
- 헤드라인 클릭 시 핵심 주장 3~5개와 분:초 링크 확인
- Fresh / Valid / Heat / Controversy 개념을 화면에 반영

## 현재 범위
- React + Vite 정적 프론트
- mock data 기반
- 필터/정렬 UI
- 상세 claim 패널
- GitHub Pages 배포 가능 구조

## 실행
```bash
npm install
npm run dev
```

## 빌드
```bash
npm run build
```

## 다음 단계
- mock data를 실제 ingest 결과로 교체
- claim clustering / topic trend 반영
- 채널 팔로우 상태 저장
- `docs/ingest-contract.md` 기준으로 JSON feed 연결
