#!/usr/bin/env bash
# generate-content.sh - Claude CLI로 MDX 콘텐츠를 배치 생성
# 사용법: bash scripts/generate-content.sh [카테고리] [주제]
# 예: bash scripts/generate-content.sh ai-basics "머신러닝이란"

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONTENT_DIR="$PROJECT_ROOT/src/content"

# --- 유효한 카테고리 목록 ---
VALID_CATEGORIES=("ai-basics" "ai-history" "engineering" "claude-code")

# --- 인자 검증 ---
if [[ $# -lt 2 ]]; then
  echo "사용법: bash scripts/generate-content.sh [카테고리] [주제]"
  echo "카테고리: ${VALID_CATEGORIES[*]}"
  echo "예: bash scripts/generate-content.sh ai-basics \"머신러닝이란\""
  exit 1
fi

CATEGORY="$1"
TOPIC="$2"

# 카테고리 유효성 검사
category_valid=false
for c in "${VALID_CATEGORIES[@]}"; do
  if [[ "$c" == "$CATEGORY" ]]; then
    category_valid=true
    break
  fi
done

if [[ "$category_valid" == false ]]; then
  echo "오류: 유효하지 않은 카테고리 '$CATEGORY'"
  echo "사용 가능한 카테고리: ${VALID_CATEGORIES[*]}"
  exit 1
fi

# --- 카테고리 디렉토리 생성 ---
CATEGORY_DIR="$CONTENT_DIR/$CATEGORY"
mkdir -p "$CATEGORY_DIR"

# --- 기존 파일 수 확인 (order 번호 결정) ---
existing_count=$(find "$CATEGORY_DIR" -name '*.mdx' -maxdepth 1 2>/dev/null | wc -l | tr -d ' ')
NEXT_ORDER=$((existing_count + 1))

# --- Claude CLI로 slug 생성 ---
echo "slug 생성 중..."
SLUG=$(claude -p "다음 한국어 주제를 영문 kebab-case slug로 변환해주세요. slug만 출력하세요. 다른 설명 없이 slug만 출력하세요. 예: 'AI란 무엇인가요' -> 'what-is-ai', '머신러닝이란' -> 'what-is-machine-learning'. 주제: $TOPIC" 2>/dev/null | tr -d '[:space:]')

if [[ -z "$SLUG" ]]; then
  echo "오류: slug 생성 실패"
  exit 1
fi

# slug 정리: 소문자, 허용 문자만
SLUG=$(echo "$SLUG" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

OUTPUT_FILE="$CATEGORY_DIR/$SLUG.mdx"

if [[ -f "$OUTPUT_FILE" ]]; then
  echo "오류: 파일이 이미 존재합니다 - $OUTPUT_FILE"
  exit 1
fi

echo "카테고리: $CATEGORY"
echo "주제: $TOPIC"
echo "slug: $SLUG"
echo "order: $NEXT_ORDER"
echo ""

# --- Claude CLI로 MDX 콘텐츠 생성 ---
echo "콘텐츠 생성 중..."

PROMPT=$(cat <<PROMPT_EOF
다음 조건에 맞는 MDX 콘텐츠를 생성해주세요.

주제: $TOPIC
카테고리: $CATEGORY
order: $NEXT_ORDER

요구사항:
1. 아래 frontmatter 형식을 정확히 따를 것 (YAML frontmatter)
2. 한국어로 작성
3. 전체 파일이 200줄 이하일 것
4. 교육용 가이드 톤으로 작성
5. 코드 블록이나 JSX 컴포넌트 없이 순수 Markdown 문법만 사용
6. frontmatter의 publishedAt은 2026-04-11로 설정

frontmatter 형식:
---
title: "제목"
description: "설명 (한 문장)"
order: $NEXT_ORDER
category: "$CATEGORY"
level: "입문"
tags: ["태그1", "태그2"]
draft: false
publishedAt: 2026-04-11
---

콘텐츠 구성:
- h1 제목으로 시작
- 개요/소개 단락
- 2~4개의 h2 섹션
- 각 섹션에 구체적인 설명과 예시
- 리스트, 볼드 등 활용
- 마지막에 "다음 단계" 또는 요약 섹션

frontmatter 포함 전체 MDX 파일 내용만 출력하세요. 다른 설명이나 코드펜스 없이 바로 --- 로 시작하세요.
PROMPT_EOF
)

CONTENT=$(claude -p "$PROMPT" 2>/dev/null)

if [[ -z "$CONTENT" ]]; then
  echo "오류: 콘텐츠 생성 실패"
  exit 1
fi

# --- 콘텐츠 검증 ---
line_count=$(echo "$CONTENT" | wc -l | tr -d ' ')
if [[ "$line_count" -gt 200 ]]; then
  echo "경고: 생성된 콘텐츠가 ${line_count}줄입니다. 200줄로 자릅니다."
  CONTENT=$(echo "$CONTENT" | head -200)
fi

# frontmatter 시작 확인
if [[ ! "$CONTENT" == ---* ]]; then
  echo "오류: 생성된 콘텐츠에 frontmatter가 없습니다."
  exit 1
fi

# --- 파일 저장 ---
echo "$CONTENT" > "$OUTPUT_FILE"
echo "파일 저장 완료: $OUTPUT_FILE"
echo "줄 수: $(wc -l < "$OUTPUT_FILE" | tr -d ' ')"
echo ""

# --- 빌드 테스트 ---
echo "빌드 테스트 실행 중..."
cd "$PROJECT_ROOT"

if npx astro build 2>&1; then
  echo ""
  echo "빌드 성공!"
else
  echo ""
  echo "오류: 빌드 실패. 생성된 파일을 확인해주세요: $OUTPUT_FILE"
  exit 1
fi

echo ""
echo "생성 완료: $OUTPUT_FILE"
