import { Link } from 'react-router-dom'
import { mockStaffProfiles } from '../../mocks/staffProfiles'

const nameToId = new Map(mockStaffProfiles.map((s) => [s.name, s.id]))

interface StaffNameLinkProps {
  name: string
  className?: string
}

export function StaffNameLink({ name, className = '' }: StaffNameLinkProps) {
  const id = nameToId.get(name)
  if (id) {
    return (
      <Link to={`/staff/${id}`} className={`text-aurora-link hover:text-aurora-link-hover transition-colors ${className}`}>
        {name}
      </Link>
    )
  }
  return <span className={className}>{name}</span>
}
