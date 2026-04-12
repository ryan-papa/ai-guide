# AI Guide

AI 기본 개념부터 Claude Code 활용까지, 단계별로 학습하는 정적 가이드 사이트.

[![CI](https://github.com/ryan-papa/ai-guide/actions/workflows/ci.yml/badge.svg)](https://github.com/ryan-papa/ai-guide/actions/workflows/ci.yml)
[![Deploy](https://github.com/ryan-papa/ai-guide/actions/workflows/deploy.yml/badge.svg)](https://github.com/ryan-papa/ai-guide/actions/workflows/deploy.yml)

## 특징

- **4개 카테고리, 16개 글** — 입문부터 고급까지 난이도별 콘텐츠
- **다크모드** — 시스템 설정 연동 자동 전환
- **Pagefind 검색** — 빌드 시 생성되는 정적 전문 검색
- **MDX** — 마크다운 + JSX 컴포넌트 조합
- **Claude CLI 배치 생성** — `scripts/generate-content.sh`로 콘텐츠 일괄 생성

## 데모

👉 **[https://ryan-papa.github.io/ai-guide/](https://ryan-papa.github.io/ai-guide/)**

## Quick Start

### 전제조건

- Node.js 18+
- npm 9+

### 설치 및 실행

```bash
git clone https://github.com/ryan-papa/ai-guide.git
cd ai-guide
npm install
npm run dev        # http://localhost:4321/ai-guide/
```

### 빌드

```bash
npm run build      # Astro 빌드 + Pagefind 인덱스 생성
npm run preview    # 빌드 결과 미리보기
```

## 콘텐츠 구조

| 카테고리 | 슬러그 | 글 수 | 내용 |
|---------|--------|:-----:|------|
| AI 기초 | `ai-basics` | 4 | AI란 무엇인가, 머신러닝, 딥러닝, LLM |
| AI 발전사 | `ai-history` | 4 | AI 타임라인, 신경망 혁명, 트랜스포머, 현대 AI 모델 |
| 엔지니어링 기법 | `engineering` | 4 | 프롬프트, 컨텍스트, 하네스, 에이전틱 엔지니어링 |
| Claude Code 도구 | `claude-code` | 4 | Claude Code 소개, MCP/커넥터, 스킬/플러그인, 에이전트 |

## 프로젝트 구조

```
ai-guide/
├── src/
│   ├── content/           # MDX 콘텐츠 (카테고리별 디렉터리)
│   │   ├── ai-basics/
│   │   ├── ai-history/
│   │   ├── engineering/
│   │   ├── claude-code/
│   │   └── config.ts      # 콘텐츠 스키마 정의
│   ├── components/        # Astro 컴포넌트
│   ├── layouts/           # 레이아웃
│   ├── pages/             # 라우팅
│   └── styles/            # 글로벌 스타일
├── scripts/               # 콘텐츠 생성 스크립트
├── public/                # 정적 에셋
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 개발 환경

| 도구 | 버전 |
|------|------|
| Astro | 4.16+ |
| Tailwind CSS | 3.4+ |
| MDX | 3.1+ |
| Pagefind | 1.1+ |
| remark-gfm | 4.0+ |

코드 하이라이팅은 Shiki `github-dark` 테마를 사용한다.

## 콘텐츠 추가 방법

1. 해당 카테고리 디렉터리에 `.mdx` 파일 생성:

```bash
touch src/content/ai-basics/new-topic.mdx
```

2. 프론트매터 작성:

```yaml
---
title: "새 주제"
description: "한 줄 설명"
order: 5
category: "ai-basics"
level: "초급"
tags: ["AI", "기초"]
publishedAt: 2026-04-11
---
```

3. `level`은 `입문 | 초급 | 중급 | 고급` 중 선택.
4. `order`로 카테고리 내 정렬 순서를 지정.
5. `draft: true`로 설정하면 빌드에서 제외.

### Claude CLI 배치 생성

```bash
bash scripts/generate-content.sh
```

## 기여 가이드

1. 이 저장소를 포크한다.
2. 기능 브랜치를 생성한다: `git checkout -b feat/new-topic`
3. 변경 사항을 커밋한다: `git commit -m "feat: add new topic"`
4. 브랜치를 푸시한다: `git push origin feat/new-topic`
5. Pull Request를 생성한다.

PR 제출 전 `npm run build`가 정상 완료되는지 확인한다.

## 라이선스

MIT
