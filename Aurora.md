{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww15300\viewh12100\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # Aurora \'97 Gates Foundation Knowledge Management Search\
\
## What This Is\
Aurora is a search and discovery web application for the Bill & Melinda Gates Foundation's Knowledge Management initiative. It enables foundation staff to explore investments, organizations, and people \'97 aggregated from two primary sources: INVEST (investment database) and the Insight Strategy Library. These sources will not be available for this prototype.\
\
## Primary Users\
- Investment owners\
- Grant coordinators\
- Foundation staff involved in grantmaking decisions\
\
## Tech Stack\
- **Frontend:** React 18 + TypeScript + Vite\
- **Styling:** Tailwind CSS\
- **Backend (future):** Azure AI Search\
- **State management:** React Context or Zustand (keep it simple)\
\
## Core Features (v1 Prototype)\
1. Search bar (at first, there will not be typeahead/autocomplete, but hoping for future)\
2. Results will have Investments, Organizations, Foundation Staff, Strategy Documents, which will be separated into categories with a limited number on one screen with the option to select only one type of result\
3. Faceted filtering (by entity type, topic area, region, etc.)\
4. Result cards with key metadata per entity type\
5. Empty/no-results state with helpful messaging\
6. Loading and error states\
\
## Design Principles\
- Trust and clarity over cleverness \'97 users rely on this for grant decisions\
- Search results should feel comprehensive but scannable\
- Avoid overwhelming users: progressive disclosure for detail\
- Accessible (WCAG 2.1 AA target)\
\
## Coding Conventions\
- Functional components only, no class components\
- Custom hooks for data-fetching logic\
- Co-locate component styles using Tailwind utility classes\
- All data fetching abstracted into a `/services` layer so Azure AI Search can be swapped in later\
- Use mock data during prototype phase \'97 keep mocks in `/src/mocks`\
\
## What to Avoid\
- Don't build auth yet \'97 assume the user is authenticated\
- Don't hardcode any real PII or sensitive grant data in mocks\
- Don't over-engineer state management early\
\
## Color System\
TEXT\
- Default body text: #000000\
- Text on dark backgrounds: #FFFFFF\
- Labels and subheaders: #363636\
- Hint/placeholder text: #A6A6A6\
\
LINKS & INTERACTIVE ELEMENTS\
- Default link/button color: #3864CD\
- Hover state: #314170\
- Active/clicked state: #4877E0\
- Visited state: #5F8EEE\
- Disabled state: #BCBCBC\
- Secondary button rest: #FFFFFF\
- Secondary button hover: #F3F3F3\
- Secondary button active: #FFFFFF\
- Secondary button active accent: #3864CD\
- Secondary button disabled: #BCBCBC\
\
TABLES (Investment)\
- Column header background: #127A6A\
- Sorted column header background: #20A490\
- Column header separator and hover: #58BBAC\
- Header text and icons: #FFFFFF\
- Alternate row background: #F8F8F8\
- Table row separator lines: #A6A6A6\
\
ORGANIZATION PAGE\
- Data section divider background: #0B3C38\
- Data section divider hover: #127A6A\
- Data section divider active: #20A490\
\
BACKGROUNDS & LAYOUT\
- Site background (wider than 1920px): #F3F3F3\
- Reading/content area background: #FFFFFF\
- Main site background (1920px and under): #E9E9E9\
- Main nav background: linear-gradient(#5A9C97, #20A490, #014979, #5A89A8)\
- Separator lines: #A6A6A6\
- Padding between white sections: #D2D2D2\
- Section header underline: linear-gradient(#20A490, #FFFFFF)\
- Popover header background: #E9E9E9\
- Popover main background: #F8F8F8\
\
STATUS LABELS (Investment Results)\
- Active status background: #D2EDE9\
- In Progress status background: #FEEBC7\
- Closed status background: #E9E9E9\
- Area of Special Focus \'97 Yes: #20A490\
- Area of Special Focus \'97 No: #CD5638\
- Area of Special Focus \'97 Partial: #EDBF68\
- Area of Special Focus \'97 N/A: #8F8F8F\
- Confirmation icon color: #58BBAC\
\pard\pardeftab720\partightenfactor0
\cf0 \
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0
\cf0 ```\
\
---\
\
**Your first Claude Code prompt** (paste this to kick off the session):\
```\
I'm building Aurora, a search and discovery tool for the Gates Foundation. \
Read Aurora.md for full context.\
\
For this session, scaffold a React + TypeScript + Vite project and build a \
prototype search UI with the following:\
\
1. A top navigation bar with the Aurora name/logo placeholder\
2. A prominent search bar (hero-style) with a placeholder input\
3. A results area below that renders mock data across five tabs or sections: \
   All, Investments, Organizations, Foundation Staff and Strategy Documents\
4. Create realistic mock data in /src/mocks \'97 5-8 results per entity type. \
   Investments should have: title, AI-generated short summary, organization name, number of subawardees (if any), Grant or contract indicator with status, investment ID, start date, approved investment amount, foundation staff owner, foundation managing team, associated metadata tags with indication of which were matched.  \
   Organizations should have: name, count of active/in-process/close investments, partner type (primary or subawardee), organization location, link(s) to source(s), associated metadata tags with indication of which were matched. \
   Foundation Staff should have: image of person, name, title, department, total associated investments with a breakdown of investments they are owner/secondary ower/coordinator, expertise areas, associated metadata tags with indication of which were matched. \
   Strategy Documents should have: title, division, chair meeting dat, source, AI-generated summary. \
5. Basic filter sidebar with checkboxes for entity type and region\
6. A result card component per entity type\
\
Use Tailwind CSS for styling. Keep the aesthetic clean, professional, and \
trustworthy \'97 this is an internal enterprise tool for high-stakes decisions.\
Do not wire up any real API yet \'97 all data comes from mocks.\
\
Visual reference materials from the SharePoint pilot are in /reference. \
Use these as inspiration for layout and information hierarchy, but modernize the design.}