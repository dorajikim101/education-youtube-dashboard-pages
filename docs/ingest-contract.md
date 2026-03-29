# ingest-contract

## 목적
실제 유튜브 수집 파이프라인이 이 프론트 프로토타입에 데이터를 꽂을 때 필요한 최소 JSON 구조를 정의한다.

## MVP 응답 구조
```json
{
  "headlines": [
    {
      "id": "video-or-headline-id",
      "headline": "고1 수학, 선행보다 시험지 적응력이 더 중요하다는 주장 확산",
      "dek": "최근 여러 채널에서 ...",
      "channel": "입시인사이트랩",
      "publishedAt": "2026-03-27",
      "tags": ["고1", "수학", "내신", "변화"],
      "followed": true,
      "youtubeUrl": "https://www.youtube.com/watch?v=abc123",
      "scores": {
        "fresh": 82,
        "valid": 77,
        "heat": 88,
        "controversy": 54
      },
      "featuredReason": "최근 내신 전략 변화 설명력이 높고 실제 적용도가 큰 영상",
      "claims": [
        {
          "title": "학교 시험 유형 적응이 선행량보다 점수 차이를 더 만든다",
          "summary": "학교별 출제 스타일 차이가 커서 ...",
          "target": "고1 일반고 중상위권",
          "timestamp": "03:24",
          "seconds": 204,
          "evidence": "최근 3개 학교 시험지 비교 사례 제시",
          "conflict": "상위권 특목고 준비군은 선행량이 중요하다는 반론"
        }
      ]
    }
  ],
  "marketSignals": [
    {
      "title": "최근 급상승 키워드",
      "items": ["시험지 적응력", "순공시간 구조화"]
    }
  ]
}
```

## 메모
- seconds는 반드시 숫자 보관
- timestamp는 화면 표시용
- tags는 프론트 필터와 연결되도록 표준어 사용
- claims는 3~5개 권장
