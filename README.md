# AI Guide

AI/ML 종합 위키 — 인공지능의 기초 개념부터 최신 엔지니어링 기법까지 체계적으로 정리한 한국어 학습 자료.

## 주요 기능

- 7개 대분류 카테고리 체계 (AI 기초, 발전사, 모델, 엔지니어링, 도구, 학습/추론, 응용)
- 난이도 뱃지 (입문/초급/중급/고급)
- 로컬 검색 (한국어/영어)
- 다크모드 지원
- GitHub Pages 자동 배포

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Docusaurus 3.10 |
| 콘텐츠 | MDX |
| 스타일 | CSS Modules + 커스텀 테마 |
| 검색 | @easyops-cn/docusaurus-search-local |
| 배포 | GitHub Pages + GitHub Actions |
| 언어 | 한국어 전용 |

## 프로젝트 구조

```
ai-guide/
├── docs/                  # 위키 콘텐츠
│   ├── ai-basics/         # AI 기초 (4개 문서)
│   ├── ai-history/        # AI 발전사 (4개 문서)
│   ├── models/            # 모델 & 아키텍처
│   ├── engineering/       # 엔지니어링 기법 (4개 문서)
│   ├── tools/             # 도구 & 플랫폼 (4개 문서)
│   ├── training/          # 학습 & 추론
│   └── applications/      # 응용 분야
├── src/
│   ├── components/        # React 컴포넌트 (DifficultyBadge 등)
│   ├── css/custom.css     # 토스 스타일 커스텀 테마
│   ├── pages/             # 홈 리다이렉트 (→ /docs/ai-basics/)
│   └── theme/             # Docusaurus 테마 오버라이드
├── static/                # 정적 파일 (이미지, 파비콘)
├── docusaurus.config.ts   # Docusaurus 설정
├── sidebars.ts            # 사이드바 설정
└── package.json
```

## 시작하기

### 전제조건

- Node.js 20+
- npm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build

# 빌드 결과물 로컬 확인
npm run serve
```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 → GitHub Pages 배포를 수행합니다.

- CI: `push`/`PR` 시 빌드 검증
- Deploy: `main` push 시 자동 배포

라이브 URL: https://ryan-papa.github.io/ai-guide/

## 라이선스

MIT
