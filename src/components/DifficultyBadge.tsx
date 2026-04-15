import React from 'react';

type DifficultyLevel = '입문' | '초급' | '중급' | '고급';

interface DifficultyBadgeProps {
  level: DifficultyLevel;
}

const levelConfig: Record<DifficultyLevel, { color: string; bg: string; darkBg: string }> = {
  입문: { color: '#1B873F', bg: '#E6F4EA', darkBg: 'rgba(27, 135, 63, 0.2)' },
  초급: { color: '#1B6CE3', bg: '#E8F0FE', darkBg: 'rgba(27, 108, 227, 0.2)' },
  중급: { color: '#D97706', bg: '#FFF3E0', darkBg: 'rgba(217, 119, 6, 0.2)' },
  고급: { color: '#DC2626', bg: '#FEE2E2', darkBg: 'rgba(220, 38, 38, 0.2)' },
};

export default function DifficultyBadge({ level }: DifficultyBadgeProps): React.ReactElement | null {
  const config = levelConfig[level];
  if (!config) return null;

  return (
    <span
      className="difficulty-badge"
      data-level={level}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 10px',
        borderRadius: '12px',
        fontSize: '0.8125rem',
        fontWeight: 600,
        lineHeight: '1.5',
        letterSpacing: '-0.01em',
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.color}20`,
        whiteSpace: 'nowrap',
      }}
    >
      {level}
    </span>
  );
}
