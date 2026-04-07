import { useState, useRef, useEffect } from 'react'
import { CONFIRM_ICON } from '../../styles/tokens'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const WELCOME: Message = {
  role: 'assistant',
  text: "Hi! I can help you explore the Gates Foundation portfolio. Ask me about investments, partner organizations, focus areas, geographies, or staff. For example: \"What investments are active in East Africa?\" or \"Which organizations work on vaccine delivery?\"",
}

function getSimulatedResponse(input: string): string {
  const q = input.toLowerCase()

  if (q.includes('east africa') || q.includes('kenya') || q.includes('ethiopia') || q.includes('tanzania')) {
    return "The Foundation has a strong presence in East Africa — Kenya leads with 18 investments and $83.4M in approved funding. Ethiopia follows with 12 investments ($47.2M), and Tanzania has 11 ($52.1M). Key focus areas there include agricultural development, maternal health, financial inclusion, and girls' education. Would you like to filter the portfolio to show only East Africa investments?"
  }
  if (q.includes('vaccine') || q.includes('immunization') || q.includes('gavi')) {
    return "Vaccine delivery is one of the Foundation's flagship areas under Global Health. The GAVI Alliance investment (INV-2022-03155) is the largest single grant at $75M, supporting immunization systems across 18 low-income countries. The Vaccine Delivery managing team sits within Global Health. Shall I show you all vaccine-related investments?"
  }
  if (q.includes('digital finance') || q.includes('mobile money') || q.includes('fintech') || q.includes('financial inclusion')) {
    return "Financial Services for the Poor is a major program area, with significant investment in digital finance and mobile money — particularly for smallholder farmers in Sub-Saharan Africa. The largest current investment is a $14.8M grant to Innovations for Poverty Action (INV-2023-04872) targeting Kenya, Tanzania, and Ethiopia. Want to see all FSP-related investments?"
  }
  if (q.includes('nigeria') || q.includes('west africa')) {
    return "Nigeria is the Foundation's most-invested country in West Africa with 22 investments totaling $156.8M — primarily in maternal health, vaccine delivery, and agricultural development. The Society for Family Health Nigeria is a key partner (INV-2022-04011, $17.6M) focused on obstetric care quality across 120 primary health centers."
  }
  if (q.includes('india') || q.includes('bangladesh') || q.includes('south asia')) {
    return "South Asia is a major focus geography. India has the most investments in the region — 31 investments totaling $284.6M — spanning WASH, nutrition, financial inclusion, and health systems. Bangladesh has 14 investments ($67.3M) with WaterAid's sanitation scale-up being a notable active grant. Pakistan has 9 investments ($43.2M)."
  }
  if (q.includes('gender') || q.includes('women') || q.includes('girls') || q.includes('education')) {
    return "Gender Equality is a Program Division with 47 investments totaling $312M. Work spans women's economic empowerment, girls' education, and reproductive health. The Mastercard Foundation tertiary education program in East Africa (INV-2021-02916, $22.4M) is a strong example — supporting university enrollment for girls from underserved communities in Uganda, Rwanda, and Burundi."
  }
  if (q.includes('active') || q.includes('status') || q.includes('in process') || q.includes('closed')) {
    return "In the current prototype data, the portfolio has investments across four statuses: Active (the majority), In Process (recently approved or under negotiation), Closed (completed), and Pending (awaiting approval). You can filter by status using the Investment Statuses filter in the sidebar on the Search page."
  }
  if (q.includes('how many') || q.includes('total') || q.includes('count') || q.includes('much')) {
    return "In aggregate, the Aurora prototype covers 425+ active investments, 1,200+ partner organizations across 28 countries, with approximately $4.9B in total committed funding. The largest program areas by volume are Global Health ($1.87B) and U.S. Program ($634M)."
  }
  if (q.includes('division') || q.includes('team') || q.includes('program')) {
    return "The Foundation has 6 Program Divisions — Gender Equality, Global Development, Global Growth & Opportunity, Global Health, Global Policy & Advocacy, and U.S. Program — and 7 Operational Divisions including Business Operations, Communications, Legal, and People. You can explore all divisions in the Divisions view."
  }
  if (q.includes('wash') || q.includes('water') || q.includes('sanitation')) {
    return "Water, Sanitation & Hygiene (WASH) investments are managed by the WASH team within Global Development. The current active grant is a $9.2M WaterAid program in Bangladesh and India (INV-2023-05100), focused on eliminating open defecation through behavior-change programming and latrine construction."
  }

  return "I can see your question is about the Gates Foundation portfolio. In this prototype, I have information about investments, organizations, geographies, focus areas, and divisions. Try asking about a specific country (e.g., \"Kenya\"), focus area (e.g., \"vaccine delivery\"), or investment status. For a full text search, use the Search tab above."
}

export function AiChatPanel() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const text = input.trim()
    if (!text) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setIsTyping(true)

    setTimeout(() => {
      const response = getSimulatedResponse(text)
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: 'assistant', text: response }])
    }, 900 + Math.random() * 600)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full min-h-[520px]">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="shrink-0 w-7 h-7 rounded-full bg-aurora-org-section flex items-center justify-center mt-0.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1L7.3 4H11L8.5 6L9.5 9.5L6 7.5L2.5 9.5L3.5 6L1 4H4.7L6 1Z" fill={CONFIRM_ICON} />
                </svg>
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-aurora-link text-aurora-on-dark rounded-tr-sm'
                  : 'bg-aurora-bg-wide text-aurora-body rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="shrink-0 w-7 h-7 rounded-full bg-aurora-org-section flex items-center justify-center mt-0.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1L7.3 4H11L8.5 6L9.5 9.5L6 7.5L2.5 9.5L3.5 6L1 4H4.7L6 1Z" fill={CONFIRM_ICON} />
              </svg>
            </div>
            <div className="bg-aurora-bg-wide rounded-xl rounded-tl-sm px-4 py-3">
              <span className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-hint animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-hint animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-hint animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="pt-4 border-t border-aurora-separator">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about investments, countries, teams, or focus areas…"
            rows={2}
            className="flex-1 resize-none px-3 py-2.5 text-sm text-aurora-body placeholder-aurora-hint bg-aurora-bg-wide border border-aurora-separator rounded-lg outline-none focus:ring-2 focus:ring-aurora-link/30 focus:border-aurora-link transition-all leading-relaxed"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-aurora-tbl-header hover:bg-aurora-tbl-header-sort disabled:bg-aurora-separator disabled:cursor-not-allowed text-aurora-on-dark text-sm font-medium rounded-lg transition-colors self-end"
          >
            Send
          </button>
        </div>
        <p className="text-[10px] text-aurora-hint mt-2">
          Ask questions in plain English · AI responses are simulated for prototype purposes
        </p>
      </div>
    </div>
  )
}
