import type { Tag } from '../../../types'

interface TagListProps {
  tags: Tag[]
  limit?: number
}

export function TagList({ tags, limit = 999 }: TagListProps) {
  const visible = tags.slice(0, limit)
  const overflow = tags.length - visible.length

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 items-center">
      {visible.map((tag) => (
        <span
          key={tag.label}
          className={`flex items-center gap-1.5 text-xs ${
            tag.matched === 'matched'
              ? 'text-aurora-label'
              : 'text-aurora-hint'
          }`}
        >
          <span
            className={`shrink-0 w-1.5 h-1.5 rounded-full ${
              tag.matched === 'matched' ? 'bg-aurora-confirm' : 'bg-aurora-separator'
            }`}
          />
          {tag.label}
        </span>
      ))}
      {overflow > 0 && (
        <span className="text-xs text-aurora-hint">+{overflow} more</span>
      )}
    </div>
  )
}
