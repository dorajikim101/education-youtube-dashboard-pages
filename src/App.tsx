import { useMemo, useState } from 'react'
import { filters, headlines, marketSignals } from './data'

function scoreTone(value: number) {
  if (value >= 80) return 'strong'
  if (value >= 65) return 'mid'
  return 'soft'
}

export default function App() {
  const [selectedId, setSelectedId] = useState(headlines[0].id)
  const [sort, setSort] = useState(filters.sort[0])
  const [grade, setGrade] = useState('전체')
  const [subject, setSubject] = useState('전체')
  const [topic, setTopic] = useState<string | null>(null)
  const [followedOnly, setFollowedOnly] = useState(false)

  const filtered = useMemo(() => {
    const next = headlines.filter((item) => {
      const gradeOk = grade === '전체' || item.tags.includes(`대상:${grade}`) || item.tags.includes(grade)
      const subjectOk = subject === '전체' || item.tags.includes(subject)
      const topicOk = !topic || item.tags.includes(topic)
      const followOk = !followedOnly || item.followed
      return gradeOk && subjectOk && topicOk && followOk
    })

    const sorted = [...next]
    const sorter = {
      중요도순: (a: typeof headlines[number], b: typeof headlines[number]) => b.scores.heat - a.scores.heat,
      최신순: (a: typeof headlines[number], b: typeof headlines[number]) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      급상승순: (a: typeof headlines[number], b: typeof headlines[number]) => b.scores.fresh - a.scores.fresh,
      신뢰도순: (a: typeof headlines[number], b: typeof headlines[number]) => b.scores.valid - a.scores.valid,
      논쟁도순: (a: typeof headlines[number], b: typeof headlines[number]) => b.scores.controversy - a.scores.controversy,
    }[sort]

    sorted.sort(sorter)
    return sorted
  }, [sort, grade, subject, topic, followedOnly])

  const featured = headlines.filter((item) => item.featuredReason).slice(0, 2)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Education YouTube Intelligence</p>
          <h1>교육 유튜브 인텔 대시보드</h1>
          <p className="subcopy">업데이트된 주제를 뉴스 헤드라인처럼 훑고, 관심 있는 카드를 눌러 바로 아래에서 핵심 주장과 타임스탬프를 확인하는 GitHub Pages 프로토타입.</p>
        </div>
      </header>

      <section className="toolbar card">
        <div className="filters-row">
          <label>
            정렬
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {filters.sort.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            학년
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              {filters.grades.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            과목
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              {filters.subjects.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="checkbox">
            <input type="checkbox" checked={followedOnly} onChange={(e) => setFollowedOnly(e.target.checked)} />
            팔로우 채널만 보기
          </label>
        </div>
        <div className="tag-row">
          {filters.topics.map((item) => (
            <button
              key={item}
              className={`tag-button ${topic === item ? 'active' : ''}`}
              onClick={() => setTopic(topic === item ? null : item)}
            >
              #{item}
            </button>
          ))}
        </div>
      </section>

      <main className="layout expanded-layout">
        <section className="feed-column">
          <div className="section-title-row">
            <h2>업데이트된 주제</h2>
            <span>{filtered.length}건</span>
          </div>

          <div className="feed-list">
            {filtered.map((item) => {
              const expanded = selectedId === item.id
              return (
                <article key={item.id} className={`headline-card card ${expanded ? 'selected' : ''}`}>
                  <div
                    className="headline-button"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedId(expanded ? '' : item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedId(expanded ? '' : item.id)
                      }
                    }}
                  >
                    <div className="headline-topline">
                      <span>{item.channel}</span>
                      <span>{item.publishedAt}</span>
                    </div>
                    <div className="headline-main-row">
                      <div>
                        <h3>{item.headline}</h3>
                        <p>{item.dek}</p>
                      </div>
                      <span className="expand-indicator">{expanded ? '−' : '+'}</span>
                    </div>
                    <div className="tag-row compact">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      {item.followed ? <span className="follow-pill">팔로우</span> : null}
                    </div>
                    <div className="score-row">
                      <span className={`score ${scoreTone(item.scores.fresh)}`}>Fresh {item.scores.fresh}</span>
                      <span className={`score ${scoreTone(item.scores.valid)}`}>Valid {item.scores.valid}</span>
                      <span className={`score ${scoreTone(item.scores.heat)}`}>Heat {item.scores.heat}</span>
                    </div>
                  </div>

                  {expanded ? (
                    <div className="expanded-panel">
                      <div className="expanded-top">
                        <div className="detail-meta">
                          <span>Controversy {item.scores.controversy}</span>
                          <span>핵심 주장 {item.claims.length}개</span>
                        </div>
                        <a className="video-link" href={item.youtubeUrl} target="_blank" rel="noreferrer">
                          영상 열기
                        </a>
                      </div>

                      <div className="claims-list in-card">
                        {item.claims.map((claim, index) => (
                          <article key={claim.title} className="claim-card">
                            <div className="claim-order">0{index + 1}</div>
                            <div className="claim-body">
                              <h4>{claim.title}</h4>
                              <p>{claim.summary}</p>
                              <div className="claim-meta">
                                <a href={`${item.youtubeUrl}&t=${claim.seconds}s`} target="_blank" rel="noreferrer">
                                  {claim.timestamp}부터 보기
                                </a>
                              </div>
                              <div className="evidence-box">
                                <strong>근거</strong>
                                <p>{claim.evidence}</p>
                                {claim.conflict ? (
                                  <p className="conflict"><strong>충돌 주장</strong> {claim.conflict}</p>
                                ) : null}
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>

        <aside className="side-column">
          <section className="featured-wrap">
            <div className="section-title-row">
              <h2>주목할 만한 영상</h2>
              <span>상단 고정</span>
            </div>
            <div className="featured-list">
              {featured.map((item) => (
                <article key={item.id} className="featured-card card">
                  <div className="thumb">▶</div>
                  <div>
                    <h3>{item.headline}</h3>
                    <p>{item.featuredReason}</p>
                    <div className="score-row">
                      <span className={`score ${scoreTone(item.scores.fresh)}`}>Fresh {item.scores.fresh}</span>
                      <span className={`score ${scoreTone(item.scores.valid)}`}>Valid {item.scores.valid}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="signal-grid">
            {marketSignals.map((signal) => (
              <article key={signal.title} className="signal-card card">
                <h3>{signal.title}</h3>
                <div className="tag-row compact">
                  {signal.items.map((item) => (
                    <span key={item} className="tag ghost">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </aside>
      </main>
    </div>
  )
}
