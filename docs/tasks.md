# Tasks: AI Guide 위키 전환

**PRD:** `20260416_145353_ai-guide-wiki_b3c1e9ce`
**통합 브랜치:** `feat/wiki-migration`

## 태스크 목록

| ID | 설명 | 매핑 | 의존성 | 상태 |
|----|------|------|--------|------|
| T-01 | Docusaurus 3.x 프로젝트 초기 셋업 (npx create-docusaurus) | F-01 | — | Done |
| T-02 | 카테고리 트리 설계 + 사이드바 구조 (`sidebars.js`) | F-02 | T-01 | Done |
| T-03 | 토스 스타일 커스텀 테마 (CSS 변수, 색상, 폰트, 다크모드) | F-03 | T-01 | Done |
| T-04 | 반응형 레이아웃 검증 + 모바일 사이드바 | F-07 | T-03 | Done |
| T-05 | 기존 16개 MDX 콘텐츠 마이그레이션 (프론트매터 변환 + 카테고리 재배치) | F-04 | T-02 | Done |
| T-06 | 콘텐츠 보강 (주요 8개 문서 최신화 + 배경지식 보강) | F-04 | T-05 | Done |
| T-07 | 난이도 표시 컴포넌트 (프론트매터 `level` 기반 뱃지) | F-06 | T-03 | Done |
| T-08 | 로컬 검색 플러그인 설치 + 설정 | F-05 | T-05 | Done |
| T-09 | GitHub Actions CI/CD + GitHub Pages 배포 | F-08 | T-01 | Done |
| T-10 | README 업데이트 (위키 전환 반영) | — | T-09 | Done |

## 브랜치 전략

```
main
  └── feat/wiki-migration              ← 통합 브랜치
       ├── feat/T-01-docusaurus-setup
       ├── feat/T-02-category-sidebar
       ├── feat/T-03-toss-theme
       ├── feat/T-04-responsive
       ├── feat/T-05-content-migration
       ├── feat/T-06-content-enhancement
       ├── feat/T-07-difficulty-badge
       ├── feat/T-08-local-search
       ├── feat/T-09-ci-cd
       └── feat/T-10-readme
```

## 의존성 그래프

```
T-01 ─┬─ T-02 ─── T-05 ─── T-06
      │            │
      ├─ T-03 ─┬─ T-04     T-08
      │         └─ T-07
      └─ T-09 ─── T-10
```

## F-XX → T-XX 매핑 검증

| F-XX | T-XX | 커버 |
|------|------|:----:|
| F-01 | T-01 | ✓ |
| F-02 | T-02 | ✓ |
| F-03 | T-03 | ✓ |
| F-04 | T-05, T-06 | ✓ |
| F-05 | T-08 | ✓ |
| F-06 | T-07 | ✓ |
| F-07 | T-04 | ✓ |
| F-08 | T-09 | ✓ |
| F-09 | Phase 2 | — |

**참고:** F-09(콘텐츠 자동 추가 워크플로우)는 Phase 2로 분리. 현재 스코프는 위키 프레임워크 전환 + 콘텐츠 마이그레이션에 집중.
