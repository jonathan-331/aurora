/**
 * Aurora Design System — Color Tokens
 *
 * Single source of truth for all color values.
 * Tailwind utility classes in tailwind.config.js mirror these constants.
 * Import these directly when you need values that can't be expressed as
 * Tailwind utilities (e.g. gradients, SVG attributes, inline styles).
 */

// ── Text ─────────────────────────────────────────────────────────────────────

export const TEXT_BODY        = '#000000'  // Default body text
export const TEXT_ON_DARK     = '#FFFFFF'  // Text on dark backgrounds
export const TEXT_LABEL       = '#363636'  // Labels and subheaders
export const TEXT_HINT        = '#A6A6A6'  // Hint / placeholder text

// ── Links & Interactive Elements ─────────────────────────────────────────────

export const LINK             = '#3864CD'  // Default link / button color
export const LINK_HOVER       = '#314170'  // Hover state
export const LINK_ACTIVE      = '#4877E0'  // Active / clicked state
export const LINK_VISITED     = '#5F8EEE'  // Visited state
export const LINK_DISABLED    = '#BCBCBC'  // Disabled state

export const BTN_SEC_REST     = '#FFFFFF'  // Secondary button rest
export const BTN_SEC_HOVER    = '#F3F3F3'  // Secondary button hover
export const BTN_SEC_ACTIVE   = '#FFFFFF'  // Secondary button active bg
export const BTN_SEC_ACCENT   = '#3864CD'  // Secondary button active accent
export const BTN_SEC_DISABLED = '#BCBCBC'  // Secondary button disabled

// ── Investment Table ──────────────────────────────────────────────────────────

export const TBL_HEADER_BG    = '#127A6A'  // Column header background
export const TBL_HEADER_SORT  = '#20A490'  // Sorted column header background
export const TBL_HEADER_SEP   = '#58BBAC'  // Column header separator and hover
export const TBL_HEADER_TEXT  = '#FFFFFF'  // Header text and icons
export const TBL_ROW_ALT      = '#F8F8F8'  // Alternate row background
export const TBL_ROW_SEP      = '#A6A6A6'  // Table row separator lines

// ── Organization Page ─────────────────────────────────────────────────────────

export const ORG_SECTION      = '#0B3C38'  // Data section divider background
export const ORG_SECTION_HOVER   = '#127A6A'  // Data section divider hover
export const ORG_SECTION_ACTIVE  = '#20A490'  // Data section divider active

// ── Backgrounds & Layout ──────────────────────────────────────────────────────

export const BG_HERO          = '#014979'  // Unified header zone (nav + search hero)
export const BG_WIDE          = '#F3F3F3'  // Site background (wider than 1920px)
export const BG_CONTENT       = '#FFFFFF'  // Reading / content area background
export const BG_MAIN          = '#E9E9E9'  // Main site background (≤1920px)
export const BG_SEPARATOR     = '#A6A6A6'  // Separator lines
export const BG_PADDING       = '#D2D2D2'  // Padding between white sections
export const BG_POPOVER_HDR   = '#E9E9E9'  // Popover header background
export const BG_POPOVER       = '#F8F8F8'  // Popover main background

// ── Gradients (use as inline `style` or `background` — cannot be Tailwind utilities) ──

export const GRADIENT_NAV =
  'linear-gradient(to bottom, #5A9C97, #20A490, #014979, #5A89A8)'

export const GRADIENT_SECTION_UNDERLINE =
  'linear-gradient(to bottom, #20A490, #FFFFFF)'

// ── Status Labels (Investment Results) ───────────────────────────────────────

export const STATUS_ACTIVE_BG    = '#D2EDE9'  // Active status background
export const STATUS_PROGRESS_BG  = '#FEEBC7'  // In Progress status background
export const STATUS_CLOSED_BG    = '#E9E9E9'  // Closed status background

export const ASF_YES     = '#20A490'  // Area of Special Focus — Yes
export const ASF_NO      = '#CD5638'  // Area of Special Focus — No
export const ASF_PARTIAL = '#EDBF68'  // Area of Special Focus — Partial
export const ASF_NA      = '#8F8F8F'  // Area of Special Focus — N/A

export const CONFIRM_ICON = '#58BBAC'  // Confirmation icon color
