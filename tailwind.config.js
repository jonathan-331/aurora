/**
 * Tailwind configuration — color values mirror /src/styles/tokens.ts.
 * If you update a color, update tokens.ts first, then reflect it here.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aurora: {
          // Text
          body:          '#000000',   // TEXT_BODY
          'on-dark':     '#FFFFFF',   // TEXT_ON_DARK
          label:         '#363636',   // TEXT_LABEL
          hint:          '#A6A6A6',   // TEXT_HINT

          // Links & interactive
          link:               '#3864CD',  // LINK
          'link-hover':       '#314170',  // LINK_HOVER
          'link-active':      '#4877E0',  // LINK_ACTIVE
          'link-visited':     '#5F8EEE',  // LINK_VISITED
          'link-disabled':    '#BCBCBC',  // LINK_DISABLED
          'btn-sec-hover':    '#F3F3F3',  // BTN_SEC_HOVER

          // Investment table
          'tbl-header':       '#127A6A',  // TBL_HEADER_BG
          'tbl-header-sort':  '#20A490',  // TBL_HEADER_SORT
          'tbl-header-sep':   '#58BBAC',  // TBL_HEADER_SEP
          'tbl-row-alt':      '#F8F8F8',  // TBL_ROW_ALT

          // Organization section dividers
          'org-section':        '#0B3C38',  // ORG_SECTION
          'org-section-hover':  '#127A6A',  // ORG_SECTION_HOVER
          'org-section-active': '#20A490',  // ORG_SECTION_ACTIVE

          // Backgrounds & layout
          hero:             '#014979',  // BG_HERO — unified dark header zone
          'bg-wide':        '#F3F3F3',  // BG_WIDE
          'bg-content':     '#FFFFFF',  // BG_CONTENT
          'bg-main':        '#E9E9E9',  // BG_MAIN
          separator:        '#A6A6A6',  // BG_SEPARATOR
          padding:          '#D2D2D2',  // BG_PADDING
          'popover-header': '#E9E9E9',  // BG_POPOVER_HDR
          popover:          '#F8F8F8',  // BG_POPOVER

          // Status labels
          'status-active':   '#D2EDE9',  // STATUS_ACTIVE_BG
          'status-progress': '#FEEBC7',  // STATUS_PROGRESS_BG
          'status-closed':   '#E9E9E9',  // STATUS_CLOSED_BG

          // ASF indicators
          'asf-yes':     '#20A490',  // ASF_YES
          'asf-no':      '#CD5638',  // ASF_NO
          'asf-partial': '#EDBF68',  // ASF_PARTIAL
          'asf-na':      '#8F8F8F',  // ASF_NA

          // Confirmation
          confirm: '#58BBAC',  // CONFIRM_ICON
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
