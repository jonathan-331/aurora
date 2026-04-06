import { type AnchorHTMLAttributes } from 'react'

type ExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>

/**
 * Use this for all outbound links. Enforces new-tab behavior and
 * prevents the opener from accessing the Aurora window.
 */
export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
