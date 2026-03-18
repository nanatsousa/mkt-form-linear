import { useState } from "react";

const TEAM_ID = "a23bdfd3-35e8-4cf6-90ff-cb1c1da09833"; // Marketing

const AREAS = [
  "Comercial / Vendas", "Produto", "Tecnologia / Engineering", "Customer Experience",
  "Finance / FinOps", "People / RH", "Operations", "Growth", "Executives / CEO",
  "Parceiros / Partnerships", "Outro"
];

const DEMAND_TYPES = [
  { value: "evento",   label: "🎪 Evento & Experiência",    color: "#f97316" },
  { value: "design",   label: "🎨 Design / Peça Gráfica",   color: "#8b5cf6" },
  { value: "video",    label: "🎬 Vídeo",                    color: "#ef4444" },
  { value: "lp",       label: "🌐 Landing Page",             color: "#3b82f6" },
  { value: "brinde",   label: "🎁 Brinde / Material Físico", color: "#f59e0b" },
  { value: "conteudo", label: "✍️ Conteúdo / Copy",          color: "#10b981" },
  { value: "midia",    label: "📢 Mídia Paga / Anúncio",     color: "#06b6d4" },
  { value: "outro",    label: "📋 Outro",                    color: "#6b7280" },
];

const FORMATS = {
  design:   ["Post Feed (1080x1080)", "Story / Reels (1080x1920)", "Banner Web", "Apresentação", "Email Marketing", "Card / Flyer", "Impresso (Banner, Rollup, Cartaz)", "Outdoor / Banner Físico", "Outro"],
  video:    ["Reels / TikTok (vertical)", "YouTube (horizontal)", "Story animado", "Vídeo institucional", "Motion / GIF", "Outro"],
  lp:       ["Landing Page de Captação", "Página de Evento", "Hotsite Campanha", "Outro"],
  brinde:   ["Camiseta", "Caneca / Squeeze", "Kit de Onboarding", "Brinde Personalizado", "Outro"],
  evento:   ["Presencial", "Online / Webinar", "Híbrido"],
  midia:    ["Meta Ads", "Google Ads", "LinkedIn Ads", "YouTube Ads", "Outro"],
  conteudo: ["Post Redes Sociais", "Email Marketing", "Blog / Artigo", "Roteiro de Vídeo", "Apresentação", "Outro"],
  outro:    ["Outro"],
};

const EVENT_MATERIALS = [
  "Design / Artes", "Vídeo / Cobertura", "Landing Page / Inscrições",
  "E-mail Marketing", "Mídia Paga", "Material Impresso", "Brindes", "Social Media / Conteúdo"
];

const PRIORITIES = [
  { value: "4", label: "Baixa",   color: "#6b7280", icon: "↓" },
  { value: "3", label: "Normal",  color: "#3b82f6", icon: "→" },
  { value: "2", label: "Alta",    color: "#f59e0b", icon: "↑" },
  { value: "1", label: "Urgente", color: "#ef4444", icon: "⚡" },
];

/* ─── small UI helpers ──────────────────────────────────────────────────── */

function StepIndicator({ step, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: i < step ? "#f97316" : i === step ? "#fff" : "transparent",
            border: `2px solid ${i < step ? "#f97316" : i === step ? "#f97316" : "#374151"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700,
            color: i < step ? "#fff" : i === step ? "#f97316" : "#6b7280",
            transition: "all 0.3s",
          }}>
            {i < step ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div style={{ width: 40, height: 2, background: i < step ? "#f97316" : "#1f2937", transition: "all 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, required, hint, children, error }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>
        {label} {required && <span style={{ color: "#f97316" }}>*</span>}
      </label>
      {hint && <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8, marginTop: -4 }}>{hint}</p>}
      {children}
      {error && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 6 }}>⚠ {error}</p>}
    </div>
  );
}

const baseInput = {
  width: "100%", background: "#111827", border: "1px solid #1f2937",
  borderRadius: 8, padding: "12px 16px", color: "#f9fafb", fontSize: 14,
  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box", fontFamily: "inherit",
};
const focusStyle = { borderColor: "#f97316", boxShadow: "0 0 0 3px rgba(249,115,22,0.15)" };

function Input({ value, onChange, placeholder, type = "text", min }) {
  const [f, setF] = useState(false);
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} min={min}
      style={{ ...baseInput, ...(f ? focusStyle : {}) }}
      onFocus={() => setF(true)} onBlur={() => setF(false)} />
  );
}

function Textarea({ value, onChange, placeholder, rows = 4 }) {
  const [f, setF] = useState(false);
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      style={{ ...baseInput, resize: "vertical", lineHeight: 1.6, ...(f ? focusStyle : {}) }}
      onFocus={() => setF(true)} onBlur={() => setF(false)} />
  );
}

function Select({ value, onChange, options, placeholder }) {
  const [f, setF] = useState(false);
  return (
    <select value={value} onChange={onChange}
      style={{ ...baseInput, appearance: "none", cursor: "pointer", ...(f ? focusStyle : {}) }}
      onFocus={() => setF(true)} onBlur={() => setF(false)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={typeof o === "string" ? o : o.value} value={typeof o === "string" ? o : o.value}>
          {typeof o === "string" ? o : o.label}
        </option>
      ))}
    </select>
  );
}

function DemandTypeSelector({ value, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
      {DEMAND_TYPES.map(dt => (
        <button key={dt.value} onClick={() => onChange(dt.value)} style={{
          padding: "14px 16px", borderRadius: 10,
          border: `2px solid ${value === dt.value ? dt.color : "#1f2937"}`,
          background: value === dt.value ? `${dt.color}18` : "#111827",
          color: value === dt.value ? dt.color : "#9ca3af",
          fontWeight: value === dt.value ? 700 : 500,
          fontSize: 14, cursor: "pointer", textAlign: "left",
          transition: "all 0.2s", fontFamily: "inherit",
        }}>
          {dt.label}
        </button>
      ))}
    </div>
  );
}

function PrioritySelector({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {PRIORITIES.map(p => (
        <button key={p.value} onClick={() => onChange(p.value)} style={{
          flex: 1, padding: "10px", borderRadius: 8,
          border: `2px solid ${value === p.value ? p.color : "#1f2937"}`,
          background: value === p.value ? `${p.color}18` : "#111827",
          color: value === p.value ? p.color : "#6b7280",
          fontWeight: 600, fontSize: 13, cursor: "pointer",
          transition: "all 0.2s", fontFamily: "inherit",
        }}>
          {p.icon} {p.label}
        </button>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, selected, onChange }) {
  const toggle = (opt) => {
    const next = selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt];
    onChange(next);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map(opt => (
        <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)}
            style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer" }} />
          <span style={{ color: "#d1d5db", fontSize: 14 }}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function SuccessScreen({ issueId, onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", animation: "fadeIn 0.5s ease" }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#f9fafb", marginBottom: 12 }}>
        Demanda enviada com sucesso!
      </h2>
      <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 8 }}>
        Sua solicitação foi criada no Linear no time de Marketing.
      </p>
      {issueId && (
        <div style={{
          display: "inline-block", margin: "16px 0", padding: "10px 20px",
          background: "#f9741618", border: "1px solid #f97316", borderRadius: 8,
          color: "#f97316", fontWeight: 700, fontSize: 15,
        }}>
          📌 {issueId}
        </div>
      )}
      <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
        O time de Marketing vai analisar a demanda na próxima reunião semanal de sprint
        e você será notificado sobre a priorização.
      </p>
      <button onClick={onReset} style={{
        background: "#f97316", color: "#fff", border: "none", borderRadius: 8,
        padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
      }}>
        + Nova Solicitação
      </button>
    </div>
  );
}

/* ─── main form ─────────────────────────────────────────────────────────── */

const emptyForm = {
  nome: "", email: "", area: "",
  tipoDemanda: "", titulo: "", prioridade: "3",
  formato: "", briefing: "", resultado: "", dataEntrega: "", linkReferencia: "",
  // evento only
  dataEvento: "", localEvento: "", qtdParticipantes: "", budget: "", midiaKit: "",
  materiaisEvento: [],
};

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdId, setCreatedId] = useState("");

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e && e.target ? e.target.value : e }));
  const isEvento = form.tipoDemanda === "evento";
  const totalSteps = isEvento ? 4 : 3;

  const STEPS = [
    { title: "Identificação",          subtitle: "Quem está solicitando?" },
    { title: "Tipo de Demanda",        subtitle: "O que você precisa?" },
    { title: isEvento ? "Informações do Evento" : "Detalhes e Briefing", subtitle: isEvento ? "Dados do evento" : "Conte mais sobre a entrega" },
    ...(isEvento ? [{ title: "Briefing & Resultado", subtitle: "Expectativas e objetivo" }] : []),
  ];

  function validate() {
    const e = {};
    if (step === 0) {
      if (!form.nome.trim()) e.nome = "Nome obrigatório";
      if (!form.area)        e.area = "Selecione a área";
    }
    if (step === 1) {
      if (!form.tipoDemanda)   e.tipoDemanda = "Selecione o tipo de demanda";
      if (!form.titulo.trim()) e.titulo = "Título obrigatório";
    }
    if (step === 2 && isEvento) {
      if (!form.dataEvento) e.dataEvento = "Data do evento obrigatória";
    }
    if ((step === 2 && !isEvento) || (step === 3 && isEvento)) {
      if (!form.briefing.trim()) e.briefing = "Briefing obrigatório";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() { if (validate()) { setStep(s => s + 1); window.scrollTo(0, 0); } }
  function back() { setStep(s => s - 1); window.scrollTo(0, 0); }

  function buildDescription() {
    const dt = DEMAND_TYPES.find(d => d.value === form.tipoDemanda);
    let md = `## 📋 Solicitação de Demanda — Marketing\n\n`;
    md += `| Campo | Informação |\n|---|---|\n`;
    md += `| **Solicitante** | ${form.nome} |\n`;
    if (form.email) md += `| **E-mail** | ${form.email} |\n`;
    md += `| **Área** | ${form.area} |\n`;
    md += `| **Tipo de Demanda** | ${dt?.label || form.tipoDemanda} |\n`;
    if (form.formato) md += `| **Formato** | ${form.formato} |\n`;
    if (form.dataEntrega) md += `| **Data de Entrega Ideal** | ${form.dataEntrega} |\n`;

    if (isEvento) {
      md += `\n---\n\n## 🎪 Informações do Evento\n\n`;
      md += `| Campo | Informação |\n|---|---|\n`;
      if (form.dataEvento)       md += `| **Data do Evento** | ${form.dataEvento} |\n`;
      if (form.localEvento)      md += `| **Local / Formato** | ${form.localEvento} |\n`;
      if (form.qtdParticipantes) md += `| **Qtd. Participantes** | ${form.qtdParticipantes} |\n`;
      if (form.budget)           md += `| **Budget** | ${form.budget} |\n`;
      if (form.midiaKit)         md += `| **Mídia Kit / Referência** | ${form.midiaKit} |\n`;
      if (form.materiaisEvento?.length) {
        md += `\n---\n\n## 📦 Materiais Necessários para o Evento\n\n`;
        form.materiaisEvento.forEach(m => { md += `- ${m}\n`; });
      }
    }

    if (form.briefing) {
      md += `\n---\n\n## 📝 Briefing\n\n${form.briefing}\n`;
    }
    if (form.resultado) {
      md += `\n---\n\n## 🎯 Resultado Esperado\n\n${form.resultado}\n`;
    }
    if (form.linkReferencia) {
      md += `\n---\n\n## 🔗 Referências\n\n${form.linkReferencia}\n`;
    }

    md += `\n---\n\n> ⏳ *Aguardando priorização na reunião semanal de sprint do time de Marketing.*`;
    return md;
  }

  async function submit() {
    if (!validate()) return;
    setLoading(true);
    try {
      const dt = DEMAND_TYPES.find(d => d.value === form.tipoDemanda);
      const title = `[${form.area}] ${form.titulo}`;

      const body = JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You create Linear issues via MCP. When asked, call save_issue with the exact parameters provided. After creation, output ONLY a JSON object like: {"identifier":"MKT-42","url":"https://linear.app/..."} — no markdown, no extra text.`,
        messages: [{
          role: "user",
          content: `Create a Linear issue:
title: ${title}
team: ${TEAM_ID}
state: 688f2b87-9398-4e36-9e30-ae267fba0d68
priority: ${parseInt(form.prioridade)}
description: ${buildDescription()}
${form.dataEntrega ? `dueDate: ${form.dataEntrega}` : ""}

After creating, reply ONLY with JSON: {"identifier":"...","url":"..."}`
        }],
        mcp_servers: [{ type: "url", url: "https://mcp.linear.app/mcp", name: "linear-mcp" }],
      });

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await res.json();
      let identifier = "";

      for (const block of data.content || []) {
        if (block.type === "mcp_tool_result") {
          try {
            const parsed = JSON.parse(block.content?.[0]?.text || "{}");
            identifier = parsed.identifier || parsed.id || "";
          } catch {}
        }
        if (block.type === "text") {
          const m = block.text.match(/[A-Z]+-\d+/);
          if (m) identifier = m[0];
          try {
            const p = JSON.parse(block.text.trim());
            if (p.identifier) identifier = p.identifier;
          } catch {}
        }
      }

      setCreatedId(identifier);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar para o Linear. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setForm(emptyForm);
    setStep(0);
    setSuccess(false);
    setCreatedId("");
    setErrors({});
  }

  const formatOptions = FORMATS[form.tipoDemanda] || [];
  const cur = STEPS[step];

  return (
    <div style={{
      minHeight: "100vh", background: "#030712",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "40px 20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #030712; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .card { animation: fadeIn 0.35s ease; }
        input::placeholder, textarea::placeholder { color: #4b5563 !important; }
        select option { background: #111827; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor:pointer; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 620 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#f9741610", border: "1px solid #f9741630",
          borderRadius: 100, padding: "6px 16px", marginBottom: 20,
        }}>
          <span style={{ fontSize: 16 }}>📣</span>
          <span style={{ color: "#f97316", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>SOLICITAÇÃO DE DEMANDA</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#f9fafb", marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Central de Pedidos<br />
          <span style={{ color: "#f97316" }}>Marketing</span>
        </h1>
        <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.65 }}>
          Todas as solicitações são registradas automaticamente no Linear<br />
          e priorizadas na sprint semanal do time.
        </p>
      </div>

      {/* Card */}
      <div className="card" key={step} style={{
        width: "100%", maxWidth: 700, background: "#0a0f1a",
        border: "1px solid #1f2937", borderRadius: 16, padding: "40px 48px",
        position: "relative",
      }}>
        {/* top accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, #f97316, #fb923c, #fbbf24)",
          borderRadius: "16px 16px 0 0",
        }} />

        {success ? <SuccessScreen issueId={createdId} onReset={reset} /> : (
          <>
            <StepIndicator step={step} total={totalSteps} />

            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f9fafb", marginBottom: 4 }}>{cur.title}</h2>
              <p style={{ color: "#6b7280", fontSize: 14 }}>{cur.subtitle}</p>
            </div>

            {/* ── Step 0: Identificação ── */}
            {step === 0 && <>
              <Field label="Seu Nome" required error={errors.nome}>
                <Input value={form.nome} onChange={set("nome")} placeholder="Ex: João Silva" />
              </Field>
              <Field label="E-mail" hint="Para receber atualizações sobre sua demanda">
                <Input type="email" value={form.email} onChange={set("email")} placeholder="joao@empresa.com" />
              </Field>
              <Field label="Área Responsável" required error={errors.area}>
                <Select value={form.area} onChange={set("area")} options={AREAS} placeholder="Selecione a área..." />
              </Field>
            </>}

            {/* ── Step 1: Tipo de Demanda ── */}
            {step === 1 && <>
              <Field label="Tipo de Entrega" required error={errors.tipoDemanda}>
                <DemandTypeSelector value={form.tipoDemanda} onChange={v => setForm(f => ({ ...f, tipoDemanda: v, formato: "", materiaisEvento: [] }))} />
              </Field>
              <div style={{ marginTop: 24 }} />
              <Field label="Título da Demanda" required hint="Um nome claro e objetivo para a entrega" error={errors.titulo}>
                <Input value={form.titulo} onChange={set("titulo")} placeholder="Ex: Banner Semana do Consumidor - Instagram" />
              </Field>
              <Field label="Prioridade">
                <PrioritySelector value={form.prioridade} onChange={v => setForm(f => ({ ...f, prioridade: v }))} />
              </Field>
            </>}

            {/* ── Step 2: Evento ── */}
            {step === 2 && isEvento && <>
              <Field label="Data do Evento" required error={errors.dataEvento}>
                <Input type="date" value={form.dataEvento} onChange={set("dataEvento")} />
              </Field>
              <Field label="Local / Formato">
                <Select value={form.localEvento} onChange={set("localEvento")}
                  options={["Presencial", "Online / Webinar", "Híbrido"]} placeholder="Selecione o formato..." />
              </Field>
              <Field label="Quantidade de Participantes">
                <Input type="number" value={form.qtdParticipantes} onChange={set("qtdParticipantes")} placeholder="Ex: 150" min="1" />
              </Field>
              <Field label="Budget Disponível" hint="Inclua moeda e valor aproximado">
                <Input value={form.budget} onChange={set("budget")} placeholder="Ex: R$ 15.000" />
              </Field>
              <Field label="Mídia Kit / Link de Referência" hint="Cole links do evento, patrocinadores ou materiais de referência">
                <Textarea rows={3} value={form.midiaKit} onChange={set("midiaKit")} placeholder="https://..." />
              </Field>
              <Field label="Data de Entrega Ideal dos Materiais" hint="Quando você precisa das entregas de marketing?">
                <Input type="date" value={form.dataEntrega} onChange={set("dataEntrega")} />
              </Field>
            </>}

            {/* ── Step 2: Não-Evento ── */}
            {step === 2 && !isEvento && <>
              {formatOptions.length > 0 && (
                <Field label="Formato do Material">
                  <Select value={form.formato} onChange={set("formato")} options={formatOptions} placeholder="Selecione o formato..." />
                </Field>
              )}
              <Field label="Briefing" required hint="Descreva com detalhes o que você precisa — quanto mais contexto, melhor a entrega" error={errors.briefing}>
                <Textarea rows={6} value={form.briefing} onChange={set("briefing")}
                  placeholder="Ex: Precisamos de um post para o Instagram anunciando a promoção de Black Friday com desconto de 30%. Público: creators com até 1k seguidores. Tom: animado e urgente." />
              </Field>
              <Field label="Resultado Esperado" hint="O que você espera alcançar com essa entrega?">
                <Textarea rows={3} value={form.resultado} onChange={set("resultado")}
                  placeholder="Ex: Gerar 500 novos cadastros, aumentar engajamento em 20%..." />
              </Field>
              <Field label="Data de Entrega Ideal" hint="Será avaliado pelo time de Marketing conforme a sprint">
                <Input type="date" value={form.dataEntrega} onChange={set("dataEntrega")} />
              </Field>
              <Field label="Links de Referência" hint="Exemplos, inspirações, documentos relevantes">
                <Textarea rows={2} value={form.linkReferencia} onChange={set("linkReferencia")} placeholder="https://..." />
              </Field>
            </>}

            {/* ── Step 3: Briefing Evento ── */}
            {step === 3 && isEvento && <>
              <Field label="Materiais Necessários para o Evento" hint="Selecione tudo que o evento precisa">
                <CheckboxGroup
                  options={EVENT_MATERIALS}
                  selected={form.materiaisEvento}
                  onChange={v => setForm(f => ({ ...f, materiaisEvento: v }))}
                />
              </Field>
              <div style={{ marginTop: 8 }} />
              <Field label="Briefing do Evento" required hint="Descreva o evento, público-alvo, objetivos e qualquer detalhe relevante" error={errors.briefing}>
                <Textarea rows={6} value={form.briefing} onChange={set("briefing")}
                  placeholder="Ex: Workshop de criadores de conteúdo focado em monetização. Público: creators de nicho lifestyle com até 10k seguidores. Objetivo: aumentar adoção da plataforma em 15% no segmento..." />
              </Field>
              <Field label="Resultado Esperado">
                <Textarea rows={3} value={form.resultado} onChange={set("resultado")}
                  placeholder="Ex: 200 novos usuários ativados, 50 contratos fechados no evento, NPS acima de 8..." />
              </Field>
            </>}

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, gap: 12 }}>
              {step > 0
                ? <button onClick={back} style={{ padding: "12px 24px", borderRadius: 8, border: "1px solid #1f2937", background: "transparent", color: "#9ca3af", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>← Voltar</button>
                : <div />
              }
              {step < totalSteps - 1
                ? <button onClick={next} style={{ padding: "12px 32px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(249,115,22,0.3)" }}>Continuar →</button>
                : <button onClick={submit} disabled={loading} style={{ padding: "12px 32px", borderRadius: 8, border: "none", background: loading ? "#374151" : "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: loading ? "none" : "0 4px 14px rgba(249,115,22,0.3)", display: "flex", alignItems: "center", gap: 8 }}>
                    {loading ? <><span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>⟳</span> Enviando...</> : "📤 Enviar para o Linear"}
                  </button>
              }
            </div>
          </>
        )}
      </div>

      {!success && (
        <p style={{ color: "#1f2937", fontSize: 12, marginTop: 24, textAlign: "center" }}>
          Demandas priorizadas semanalmente pelo time de Marketing · Integrado com Linear
        </p>
      )}
    </div>
  );
}
