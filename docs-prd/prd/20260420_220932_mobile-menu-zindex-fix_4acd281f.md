# PRD — 모바일 메뉴 z-index · 오버레이 개선

| 항목 | 내용 |
|------|------|
| 작성일 | 2026-04-20 |
| 작성자 | ryan-papa |
| 상태 | Draft |
| 우선순위 | High (UX 차단 버그) |

## 배경

- 모바일 화면에서 상단 좌측 햄버거 메뉴 클릭 시, 사이드바 드로어가 다른 콘텐츠 **뒤에 렌더** 되어 메뉴 항목 클릭 불가.
- 원인 추정: [`src/css/custom.css:411`](../../src/css/custom.css) `.navbar-sidebar` 에 `z-index` 미지정, 기본 스택 컨텍스트보다 낮게 깔림.

## 목표

| # | 목표 |
|:-:|------|
| G1 | 모든 모바일 viewport에서 메뉴가 최상단에 노출·클릭 가능 |
| G2 | 메뉴 외부 영역 클릭 시 자동 닫힘 (backdrop 오버레이) |
| G3 | ESC 키로 닫힘 |
| G4 | 메뉴 항목 클릭 시 자동 닫힘 |

## 범위

### In
- `.navbar-sidebar` / `.navbar-sidebar__backdrop` z-index · 오버레이 CSS
- 닫힘 동작 JS (필요 시 `src/theme/` swizzle 또는 경량 스크립트)
- Playwright 모바일 E2E + axe 접근성 테스트

### Out
- 네비게이션 전면 리디자인
- 애니메이션·터치 제스처 커스텀
- 데스크톱 레이아웃 변경

## 상세 요구사항

| ID | 항목 | 내용 |
|:--:|------|------|
| R1 | z-index | `.navbar-sidebar` ≥ `var(--ifm-z-index-fixed)` 이상, backdrop 은 그 바로 아래 |
| R2 | backdrop | 반투명 레이어(`rgba(0,0,0,0.5)`), 클릭 시 메뉴 닫힘 |
| R3 | ESC | `keydown` Escape → 메뉴 닫힘 |
| R4 | 항목 클릭 | `.navbar-sidebar .menu__link` 클릭 → 페이지 이동 + 메뉴 닫힘 |
| R5 | 접근성 | axe 위반 0건, 포커스 트랩 유지 |

## 테스트 플랜

| 케이스 | 도구 | 기대 |
|-------|------|------|
| 모바일 viewport에서 햄버거 클릭 → 메뉴 최상단 노출 | Playwright (iPhone 12) | pass |
| backdrop 클릭 → 닫힘 | Playwright | pass |
| ESC 키 → 닫힘 | Playwright | pass |
| 메뉴 항목 클릭 → 이동 + 닫힘 | Playwright | pass |
| 접근성 위반 | axe | 0건 |
| 빌드 통과 | `npm run build` | pass |

## 리스크

| 리스크 | 완화 |
|-------|------|
| Docusaurus 내부 CSS 변수 변경으로 z-index 깨짐 | 고정값 fallback + 회고 기록 |
| swizzle 범위 확대 | 최소 swizzle, 가능하면 순수 CSS + 전역 JS 훅으로 처리 |
