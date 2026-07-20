import { useState, useRef, useEffect } from "react";

const INITIAL_DATA = {
  name: "Shaade Oliveros-Tavares",
  title: "Senior Product Designer",
  contact: { location: "Raleigh, NC", email: "shaade.tavares@gmail.com", phone: "919-413-1420", website: "www.shaade.net" },
  summary: "Product Designer with 10+ years leading end-to-end design across enterprise SaaS and consumer products — often as the sole IC designer owning strategy, research, systems, and execution in parallel. Comfortable with ambiguity and shifting priorities; makes good calls with incomplete information and adapts when the ground shifts. Experienced designing across web and mobile in data-heavy, high-stakes workflows where clarity and accessible design aren't optional. Strong track record building design systems and driving measurable outcomes.",
  jobs: [
    {
      id: 1, title: "Director of Product Design (Sole Designer; IC Role)", company: "UserVoice",
      dateRange: "Feb 2022 – Mar 2025", subTitle: "Senior Product Designer", subDateRange: "Jan 2020 – Jan 2022",
      bullets: [
        { id: 1, label: "AI Reporting Suite (0→1)", body: "Defined success metrics and led design of an AI-powered reporting system synthesizing 27,000+ monthly data points into automated Impact Reports — cutting discovery time from half a day to ~60 seconds (~99% reduction). Anchored UserVoice's AI subscription tier; 25% of reports shared cross-team." },
        { id: 2, label: "Performance as UX", body: "Diagnosed and resolved a degraded enterprise admin experience caused by unconstrained data growth. Rebuilt the grid with a modular Figma component library and enforced a sub-1.0s performance ceiling — achieving ~90% adoption across product surfaces. Reframed performance as a first-class UX constraint." },
        { id: 3, label: "JTBD-Driven Workflow Redesign", body: "Led full research-to-launch redesign of a core idea management workflow using task analysis and JTBD framing — mapping current-state friction to define the new interaction model. Reduced workflow steps and improved task completion in usability testing, with no dedicated researcher." },
        { id: 4, label: "Transactional Safety Design", body: "Designed a bulk-action triage model for high-risk enterprise operations, creating a transactional safety buffer that improved user confidence and reduced error-related support tickets." },
        { id: 5, label: "Discovery & Research Programs", body: "Ran end-to-end UX research using Figma and Maze — user interviews, task analyses, field and contextual research, usability testing, quantitative feedback loops — turning insights into product direction across a multi-product portfolio." },
        { id: 6, label: "Cross-Functional & Exec Alignment", body: "Led cross-functional alignment with CEO and EPD leadership — documented design rationale, built consensus with executive stakeholders, and influenced product direction directly." },
      ]
    },
    {
      id: 2, title: "Product Designer", company: "Kaleido",
      dateRange: "Nov 2018 – Dec 2019", subTitle: "", subDateRange: "",
      bullets: [
        { id: 1, label: "Data Visualization & Engineering Partnership", body: "Embedded within engineering to design node health dashboards and admin interfaces for complex infrastructure, translating backend metrics into actionable, high-craft visualizations for technical users." },
      ]
    },
    {
      id: 3, title: "UX Strategist & Lead Designer", company: "Republic Wireless (a Bandwidth Company)",
      dateRange: "Sept 2017 – Nov 2018", subTitle: "UX Designer", subDateRange: "Dec 2013 – Sept 2016",
      bullets: [
        { id: 1, label: "Information Architecture & Conversion", body: "Redesigned site-wide IA and D2C buy-flows through iterative research and prototyping — achieving a 10x increase in funnel progression." },
        { id: 2, label: "Mobile App & Onboarding UX", body: "Designed the mobile setup app and onboarding flows for Relay (screen-free hardware) and Republic phones, grounded in field observation of real unboxing and plan-selection sessions. Translated high-anxiety activation into intuitive patterns — 30% reduction in support tickets." },
        { id: 3, label: "Design System", body: "Scaled a unified design system across web and Android, ensuring cross-platform visual consistency across a diverse product suite." },
      ]
    },
    {
      id: 4, title: "Web Designer", company: "NC State University",
      dateRange: "Jan 2011 – Nov 2013", subTitle: "", subDateRange: "",
      bullets: [
        { id: 1, label: "", body: "Designed and launched web experiences for multiple university colleges, balancing departmental identity with institutional brand standards and accessibility requirements." },
      ]
    },
  ],
  skillRows: [
    { id: 1, label: "Design & Craft", value: "Interaction Design, Information Architecture, Data Visualization, Dashboard Design, Low-Fidelity to High-Fidelity Prototyping, Responsive Design, Mobile UI (Android & Web), Accessible Design & WCAG Compliance" },
    { id: 2, label: "Research & Strategy", value: "End-to-End UX Research, Usability Testing, User Interviews, Task Analysis, Field & Contextual Research, JTBD Framing, Journey Mapping, Quantitative & Qualitative Analysis, Test & Learn Programs" },
    { id: 3, label: "Tools", value: "Figma (Expert — Design Systems, Prototyping, Component Libraries), Claude Code (AI-assisted Prototyping), Maze" },
    { id: 4, label: "Leadership & Process", value: "Cross-Functional Partnership, Stakeholder Communication, EPD & Executive Alignment, Agile / Shape Up, Consensus Building" },
    { id: 5, label: "Technical", value: "Design Systems Architecture, AI-Augmented UX, Systems Thinking, Agentic Product Design" },
  ],
  education: { degree: "B.A. in Graphic Design", school: "North Carolina State University, College of Design", years: "2005–2009" },
  certifications: [ { id: 1, name: "Behavioral Economics Bootcamp Certificate", issuer: "Irrational Labs", year: "Mar 2022" } ],
  community: [{ id: 1, role: "Director of Student Membership", org: "Triangle UXPA", dates: "2017–2020", body: "Facilitated career development programming connecting students to UX professionals; mentored aspiring designers and shared expertise at bootcamps and industry events." }],
  applications: []
};

const APP_STATUSES = ["Applied", "HR Interview", "Design Interview", "Case Study Interview", "Upcoming Interview", "Team Interview", "Final Round", "Rejected"];
const STATUS_COLORS = {
  "Applied":              { bg: "#DDE3ED", color: "#1E3A6E" },
  "HR Interview":         { bg: "#DBEAFE", color: "#1D4ED8" },
  "Design Interview":     { bg: "#EDE9FE", color: "#6D28D9" },
  "Case Study Interview": { bg: "#FEF3C7", color: "#92400E" },
  "Upcoming Interview":   { bg: "#CFFAFE", color: "#0E7490" },
  "Team Interview":       { bg: "#FFEDD5", color: "#C2410C" },
  "Final Round":          { bg: "#DCFCE7", color: "#166534" },
  "Rejected":             { bg: "#FFE4E6", color: "#9F1239" },
};

const T = {
  accent: "#D34F2F",
  dark: "#1C1C1E",
  mid: "#555558",
  light: "#909094",
  bg: "#F7F6F3",
  white: "#FFFFFF",
  border: "#E2E0DC",
  hair: "#E3E1DC",
};

const INITIAL_CL_DATA = {
  company: "",
  hiringManager: "",
  role: "Senior Product Designer",
  date: "",
  body: "",
};

const contactLine = (c) => [c.location, c.email, c.phone, c.website].filter(Boolean).join("  ·  ");

// ── ZIP builder (no deps) ─────────────────────────────────────────────────────
function crc32(buf) {
  const table = crc32.t || (crc32.t = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) { let v = i; for (let j = 0; j < 8; j++) v = (v & 1) ? 0xEDB88320 ^ (v >>> 1) : v >>> 1; t[i] = v; }
    return t;
  })());
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function buildZip(files) {
  const enc = new TextEncoder();
  const entries = [], parts = [];
  let offset = 0;
  for (const [name, content] of files) {
    const nb = enc.encode(name), db = typeof content === "string" ? enc.encode(content) : content;
    const crc = crc32(db), size = db.length;
    const now = new Date();
    const dd = ((now.getFullYear()-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate();
    const dt = (now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1);
    const local = new Uint8Array(30 + nb.length + size);
    const lv = new DataView(local.buffer);
    lv.setUint32(0,0x04034b50,true); lv.setUint16(4,20,true); lv.setUint16(6,0,true);
    lv.setUint16(8,0,true); lv.setUint16(10,dt,true); lv.setUint16(12,dd,true);
    lv.setUint32(14,crc,true); lv.setUint32(18,size,true); lv.setUint32(22,size,true);
    lv.setUint16(26,nb.length,true); lv.setUint16(28,0,true);
    local.set(nb,30); local.set(db,30+nb.length);
    entries.push({nb,crc,size,dt,dd,offset}); offset+=local.length; parts.push(local);
  }
  const cdParts = []; let cdSize = 0;
  for (const e of entries) {
    const cd = new Uint8Array(46+e.nb.length); const cv = new DataView(cd.buffer);
    cv.setUint32(0,0x02014b50,true); cv.setUint16(4,20,true); cv.setUint16(6,20,true);
    cv.setUint16(8,0,true); cv.setUint16(10,0,true); cv.setUint16(12,e.dt,true);
    cv.setUint16(14,e.dd,true); cv.setUint32(16,e.crc,true); cv.setUint32(20,e.size,true);
    cv.setUint32(24,e.size,true); cv.setUint16(28,e.nb.length,true);
    cv.setUint16(30,0,true); cv.setUint16(32,0,true); cv.setUint16(34,0,true);
    cv.setUint16(36,0,true); cv.setUint32(38,0,true); cv.setUint32(42,e.offset,true);
    cd.set(e.nb,46); cdParts.push(cd); cdSize+=cd.length;
  }
  const eocd = new Uint8Array(22); const ev = new DataView(eocd.buffer);
  ev.setUint32(0,0x06054b50,true); ev.setUint16(8,entries.length,true);
  ev.setUint16(10,entries.length,true); ev.setUint32(12,cdSize,true); ev.setUint32(16,offset,true);
  const all = [...parts,...cdParts,eocd];
  const total = all.reduce((s,a)=>s+a.length,0);
  const out = new Uint8Array(total); let pos=0;
  for (const a of all){out.set(a,pos);pos+=a.length;}
  return out;
}

// ── DOCX builder ──────────────────────────────────────────────────────────────
function buildDocx(d) {
  const esc = s => (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const ACCENT="D34F2F", DARK="1C1C1E", MID="555558", LIGHT="909094", HAIR="D6D4CF";

  const rPr = (o={}) => {
    let s="";
    if(o.bold) s+="<w:b/>";
    if(o.italic) s+="<w:i/>";
    if(o.size) s+=`<w:sz w:val="${o.size}"/>`;
    if(o.color) s+=`<w:color w:val="${o.color}"/>`;
    if(o.font) s+=`<w:rFonts w:ascii="${o.font}" w:hAnsi="${o.font}"/>`;
    if(o.spacing) s+=`<w:spacing w:val="${o.spacing}"/>`;
    return s?`<w:rPr>${s}</w:rPr>`:"";
  };
  const run=(text,o={})=>`<w:r>${rPr(o)}<w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
  const tab=()=>`<w:r><w:tab/></w:r>`;
  const para=(content,o={})=>{
    let pp="";
    if(o.align) pp+=`<w:jc w:val="${o.align}"/>`;
    if(o.before||o.after) pp+=`<w:spacing w:before="${o.before||0}" w:after="${o.after||0}"/>`;
    if(o.border) pp+=`<w:pBdr><w:bottom w:val="single" w:color="${HAIR}" w:sz="6" w:space="6"/></w:pBdr>`;
    if(o.indent) pp+=`<w:ind w:left="${o.indent.left}" w:hanging="${o.indent.hanging}"/>`;
    if(o.num) pp+=`<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>`;
    if(o.tabs) pp+=`<w:tabs><w:tab w:val="right" w:pos="10080"/></w:tabs>`;
    return `<w:p>${pp?`<w:pPr>${pp}</w:pPr>`:""}${content}</w:p>`;
  };

  const F = "Inter";
  const section=t=>para(
    run(t.toUpperCase(),{size:18,color:ACCENT,font:F,spacing:40}),
    {before:360,after:40,border:true}
  );
  const jobHead=(title,co,dates)=>para(
    run(title,{bold:true,size:22,font:F,color:DARK})+
    run("  ·  ",{size:18,color:LIGHT,font:F})+
    run(co,{size:18,color:MID,font:F})+
    tab()+run(dates,{size:17,color:LIGHT,font:F}),
    {before:140,after:24,tabs:true}
  );
  const subHead=(t,d)=>t?para(
    run(t,{size:17,color:LIGHT,font:F})+(d?run("  ·  "+d,{size:17,color:LIGHT,font:F}):""),
    {before:16,after:32}
  ):"";
  const bullet=(label,body)=>para(
    (label?run(label+": ",{bold:true,size:18,font:F,color:DARK}):"")+
    run(body,{size:18,font:F,color:DARK}),
    {before:18,after:18,indent:{left:480,hanging:240},num:true}
  );
  const skillLine=(label,val)=>para(
    run(label+": ",{bold:true,size:18,font:F,color:DARK})+
    run(val,{size:18,font:F,color:MID}),
    {before:18,after:18}
  );

  const body=[
    para(run(d.name,{size:48,color:ACCENT,font:F,spacing:-10}),{after:30}),
    para(run(d.title,{size:20,color:DARK,font:F,bold:true}),{after:18}),
    para(run(contactLine(d.contact),{size:17,color:LIGHT,font:F}),{after:140}),
    para(run(d.summary,{size:18,font:F,color:DARK}),{after:80}),
    section("Experience"),
    ...d.jobs.flatMap(j=>[
      jobHead(j.title,j.company,j.dateRange),
      subHead(j.subTitle,j.subDateRange),
      ...j.bullets.map(b=>bullet(b.label,b.body)),
    ]),
    section("Skills"),
    ...d.skillRows.map(s=>skillLine(s.label,s.value)),
    section(d.certifications && d.certifications.some(c=>c.name) ? "Education & Certifications" : "Education"),
    para(
      run(d.education.degree,{bold:true,size:18,font:F,color:DARK})+
      run("  ·  "+d.education.school+"  ·  "+d.education.years,{size:18,color:MID,font:F}),
      {before:60,after:40}
    ),
    ...(d.certifications && d.certifications.some(c=>c.name) ? [
      ...d.certifications.filter(c=>c.name).map(c=>para(
        run(c.name,{bold:true,size:18,font:F,color:DARK})+
        (c.issuer?run("  ·  "+c.issuer,{size:18,color:MID,font:F}):"")+
        (c.year?run("  ·  "+c.year,{size:17,color:LIGHT,font:F}):""),
        {before:60,after:24}
      )),
    ] : []),
    ...((Array.isArray(d.community)?d.community:[d.community]).filter(c=>c&&(c.role||c.org)).length>0?[
      section("Community"),
      ...(Array.isArray(d.community)?d.community:[d.community]).filter(c=>c&&(c.role||c.org)).flatMap(c=>[
        para(
          run(c.role,{bold:true,size:18,font:F,color:DARK})+
          (c.org?run("  ·  "+c.org,{size:18,color:MID,font:F}):"")+
          (c.dates?run("  ·  "+c.dates,{size:17,color:LIGHT,font:F}):""),
          {before:60,after:24}
        ),
        para(run(c.body,{size:18,font:F,color:DARK}),{after:12}),
      ]),
    ]:[]),
  ].filter(Boolean).join("\n");

  const document=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${body}
    <w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080"/></w:sectPr>
  </w:body>
</w:document>`;

  const numbering=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="480" w:hanging="240"/></w:pPr></w:lvl></w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
</w:numbering>`;

  const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter" w:cs="Inter"/><w:sz w:val="18"/></w:rPr></w:rPrDefault></w:docDefaults>
</w:styles>`;

  const rels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>`;

  const appRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const contentTypes=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
</Types>`;

  const zip=buildZip([
    ["[Content_Types].xml",contentTypes],
    ["_rels/.rels",appRels],
    ["word/document.xml",document],
    ["word/styles.xml",styles],
    ["word/numbering.xml",numbering],
    ["word/_rels/document.xml.rels",rels],
  ]);

  const blob=new Blob([zip],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
  const url=URL.createObjectURL(blob);
  const a=window.document.createElement("a");
  a.href=url; a.download=d.name.replace(/\s+/g,"_")+"_Resume.docx"; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

// ── Live Preview ──────────────────────────────────────────────────────────────
function ResumePreview({ data: d }) {
  const s = {
    page: { fontFamily:"'Inter', -apple-system, sans-serif", background:T.white, padding:"48px 52px", maxWidth:760, margin:"0 auto", color:T.dark, fontSize:13, lineHeight:1.5 },
    name: { fontSize:36, fontWeight:300, color:T.accent, letterSpacing:"-0.02em", marginBottom:4 },
    jobTitle: { fontSize:14.5, fontWeight:600, color:T.dark, marginBottom:4 },
    contact: { fontSize:11.5, color:T.light, marginBottom:30 },
    summary: { fontSize:12.5, color:T.dark, lineHeight:1.65, marginBottom:14 },
    sectionHead: { fontSize:10.5, fontWeight:500, color:T.accent, letterSpacing:"0.2em", textTransform:"uppercase", borderBottom:`1px solid ${T.hair}`, paddingBottom:7, marginBottom:8, marginTop:46 },
    jobHead: { display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:2 },
    jobName: { fontSize:14.5, fontWeight:700, color:T.dark, letterSpacing:"-0.01em" },
    jobCo: { fontSize:12.5, color:T.mid, marginLeft:6 },
    jobDates: { fontSize:11.5, color:T.light, whiteSpace:"nowrap", flexShrink:0, paddingLeft:14 },
    subRow: { marginBottom:4 },
    subTitle: { fontSize:12, color:T.light },
    subDates: { fontSize:11.5, color:T.light },
    bulletRow: { display:"flex", gap:8, marginBottom:3, paddingLeft:2 },
    bulletDot: { color:T.accent, flexShrink:0, marginTop:1, fontWeight:700 },
    bulletLabel: { fontWeight:600, color:T.dark },
    bulletBody: { color:T.dark, fontSize:12.5 },
    skillRow: { marginBottom:5, fontSize:12.5, lineHeight:1.6, paddingLeft:16, textIndent:-16 },
    skillLabel: { fontWeight:700, color:T.dark },
    skillVal: { color:T.mid },
    eduRow: { display:"flex", justifyContent:"space-between", alignItems:"baseline", fontSize:12.5, marginTop:10 },
    comRow: { marginTop:10 },
    comHead: { display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:3 },
    comRole: { fontWeight:700, fontSize:13, color:T.dark },
    comOrg: { color:T.mid, fontSize:12.5, marginLeft:4 },
    comDates: { color:T.light, fontSize:11.5, whiteSpace:"nowrap", flexShrink:0, paddingLeft:14 },
    comBody: { fontSize:12.5, color:T.mid, lineHeight:1.55 },
  };

  return (
    <div style={s.page}>
      <div style={s.name}>{d.name}</div>
      <div style={s.jobTitle}>{d.title}</div>
      <div style={s.contact}>{contactLine(d.contact)}</div>
      <div style={s.summary}>{d.summary}</div>

      <div className="rp-sec" style={s.sectionHead}>Experience</div>
      {d.jobs.map(job => (
        <div key={job.id} className="rp-job" style={{ marginBottom:9 }}>
          <div style={s.jobHead}>
            <div>
              <span style={s.jobName}>{job.title}</span>
              {job.company && <span style={s.jobCo}>· {job.company}</span>}
            </div>
            <span style={s.jobDates}>{job.dateRange}</span>
          </div>
          {job.subTitle && (
            <div style={s.subRow}>
              <span style={s.subTitle}>{job.subTitle}</span>
              {job.subDateRange && <span style={s.subDates}> · {job.subDateRange}</span>}
            </div>
          )}
          {job.bullets.map(b => (
            <div key={b.id} className="rp-bullet" style={s.bulletRow}>
              <span style={s.bulletDot}>•</span>
              <span style={s.bulletBody}>
                {b.label && <span style={s.bulletLabel}>{b.label}: </span>}
                {b.body}
              </span>
            </div>
          ))}
        </div>
      ))}

      <div className="rp-sec" style={s.sectionHead}>Skills</div>
      {d.skillRows.map(sr => (
        <div key={sr.id} className="rp-skill" style={s.skillRow}>
          <span style={s.skillLabel}>{sr.label}: </span>
          <span style={s.skillVal}>{sr.value}</span>
        </div>
      ))}

      <div className="rp-sec" style={s.sectionHead}>{d.certifications && d.certifications.some(c=>c.name) ? "Education & Certifications" : "Education"}</div>
      <div style={s.eduRow}>
        <span><strong>{d.education.degree}</strong> · {d.education.school}</span>
        <span style={{ color:T.light, fontSize:11.5, whiteSpace:"nowrap", flexShrink:0, paddingLeft:14 }}>{d.education.years}</span>
      </div>
      {d.certifications && d.certifications.filter(c=>c.name).map(c => (
        <div key={c.id} style={s.eduRow}>
          <span><strong>{c.name}</strong>{c.issuer ? ` · ${c.issuer}` : ""}</span>
          {c.year && <span style={{ color:T.light, fontSize:11.5, whiteSpace:"nowrap", flexShrink:0, paddingLeft:14 }}>{c.year}</span>}
        </div>
      ))}

      {(Array.isArray(d.community)?d.community:[d.community]).filter(c=>c&&c.role).length>0&&<>
      <div className="rp-sec" style={s.sectionHead}>Community</div>
      {(Array.isArray(d.community)?d.community:[d.community]).filter(c=>c&&(c.role||c.org)).map((c,i)=>(
        <div key={i} style={{...s.comRow,marginBottom:i<d.community.length-1?10:0}}>
          <div style={s.comHead}>
            <div>
              <span style={s.comRole}>{c.role}</span>
              {c.org && <span style={s.comOrg}>· {c.org}</span>}
            </div>
            <span style={s.comDates}>{c.dates}</span>
          </div>
          <div style={s.comBody}>{c.body}</div>
        </div>
      ))}
      </>}
    </div>
  );
}

// ── Editor components ─────────────────────────────────────────────────────────
function Field({ value, onChange, className="", multiline=false, placeholder="" }) {
  if (multiline) return <textarea className={`field ${className}`} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3}/>;
  return <input className={`field ${className}`} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>;
}

function DateField({ value, onChange }) {
  const ref = useRef(null);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmt = (d) => {
    if (!d) return null;
    const [y,m,day] = d.split("-");
    return `${months[parseInt(m,10)-1]} ${parseInt(day,10)}, ${y}`;
  };
  const open = () => { try { ref.current?.showPicker(); } catch { ref.current?.click(); } };
  return (
    <div className="date-field-wrap" onClick={open}>
      <span className="date-display">{fmt(value) || "Set date"}</span>
      <input type="date" ref={ref} value={value} onChange={onChange} className="date-input-hidden" style={{position:"absolute",opacity:0,width:0,height:0,pointerEvents:"none"}}/>
    </div>
  );
}

function GrowTextarea({ value, onChange, className="", placeholder="", minHeight=76 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el) { el.style.height = "auto"; el.style.height = Math.max(minHeight, el.scrollHeight) + "px"; }
  }, [value, minHeight]);
  return <textarea ref={ref} className={`field ${className}`} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} />;
}

const DragHandle = () => (
  <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" style={{display:"block"}}>
    <circle cx="3" cy="3.5" r="1.5"/><circle cx="7" cy="3.5" r="1.5"/>
    <circle cx="3" cy="8" r="1.5"/><circle cx="7" cy="8" r="1.5"/>
    <circle cx="3" cy="12.5" r="1.5"/><circle cx="7" cy="12.5" r="1.5"/>
  </svg>
);

function BulletEditor({ bullet, onChange, onDelete, dragging, dragOver, onDragStart, onDragEnd, onDragOver, onDrop }) {
  return (
    <div
      className={`bullet-row${dragging?" dragging":""}${dragOver?" drag-over":""}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="bullet-drag-handle" draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <DragHandle/>
      </div>
      <div className="bullet-dot">•</div>
      <div className="bullet-fields">
        <input className="field bullet-label" value={bullet.label} onChange={e=>onChange({...bullet,label:e.target.value})} placeholder="Bullet title (optional)"/>
        <textarea className="field bullet-body" value={bullet.body} onChange={e=>onChange({...bullet,body:e.target.value})} placeholder="Bullet body" rows={3}/>
      </div>
      <button className="icon-btn delete-btn" onClick={onDelete}>×</button>
    </div>
  );
}

function JobEditor({ job, onChange, onDelete }) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const updateBullet=(i,u)=>{const b=[...job.bullets];b[i]=u;onChange({...job,bullets:b});};
  const deleteBullet=i=>onChange({...job,bullets:job.bullets.filter((_,j)=>j!==i)});
  const reorderBullets=(from,to)=>{
    if(from===to) return;
    const b=[...job.bullets];
    const [item]=b.splice(from,1);
    b.splice(to,0,item);
    onChange({...job,bullets:b});
  };
  const addBullet=()=>onChange({...job,bullets:[...job.bullets,{id:Date.now(),label:"",body:""}]});
  return (
    <div className="job-block">
      <div className="job-header-row">
        <div className="job-header-fields">
          <div className="job-top-row">
            <input className="field job-title" value={job.title} onChange={e=>onChange({...job,title:e.target.value})} placeholder="Job title"/>
            <span className="separator">·</span>
            <input className="field job-company" value={job.company} onChange={e=>onChange({...job,company:e.target.value})} placeholder="Company"/>
            <input className="field job-dates" value={job.dateRange} onChange={e=>onChange({...job,dateRange:e.target.value})} placeholder="Date range"/>
          </div>
          <div className="job-sub-row">
            <input className="field job-subtitle" value={job.subTitle} onChange={e=>onChange({...job,subTitle:e.target.value})} placeholder="Previous title (optional)"/>
            <input className="field job-dates" value={job.subDateRange} onChange={e=>onChange({...job,subDateRange:e.target.value})} placeholder="Date range"/>
          </div>
        </div>
        <button className="icon-btn delete-btn" onClick={onDelete}>×</button>
      </div>
      <div className="bullets-list">{job.bullets.map((b,i)=><BulletEditor key={b.id} bullet={b} onChange={u=>updateBullet(i,u)} onDelete={()=>deleteBullet(i)} dragging={dragIdx===i} dragOver={overIdx===i&&dragIdx!==i} onDragStart={()=>setDragIdx(i)} onDragEnd={()=>{reorderBullets(dragIdx,overIdx??dragIdx);setDragIdx(null);setOverIdx(null);}} onDragOver={e=>{e.preventDefault();setOverIdx(i);}} onDrop={e=>{e.preventDefault();}}/>)}</div>
      <button className="add-btn" onClick={addBullet}>+ Add bullet</button>
    </div>
  );
}

// ── Persistence (named versions) ──────────────────────────────────────────────
const STORE_KEY = "resume-builder:store:v1";
const OLD_DATA_KEY = "resume-builder:data:v1";
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
function normalizeData(d) {
  d = d || {};
  const community = Array.isArray(d.community)
    ? d.community
    : (d.community && typeof d.community === "object")
      ? [{ id: 1, ...d.community }]
      : INITIAL_DATA.community;
  return {
    ...INITIAL_DATA, ...d,
    contact: (d.contact && typeof d.contact === "object") ? { ...INITIAL_DATA.contact, ...d.contact } : INITIAL_DATA.contact,
    certifications: Array.isArray(d.certifications) ? d.certifications : INITIAL_DATA.certifications,
    applications: Array.isArray(d.applications)
      ? d.applications.map(a => ({ ...a, role: a.role || "Senior Product Designer" }))
      : INITIAL_DATA.applications,
    community,
  };
}
function loadStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && Array.isArray(s.versions) && s.versions.length) {
        const versions = s.versions.map(v => ({ id: v.id || newId(), name: v.name || "Untitled", data: normalizeData(v.data) }));
        const current = versions.some(v => v.id === s.current) ? s.current : versions[0].id;
        const clVersions = Array.isArray(s.clVersions) && s.clVersions.length
          ? s.clVersions
          : [{ id: newId(), name: "New Cover Letter", data: { ...INITIAL_CL_DATA, date: new Date().toISOString().slice(0, 10) } }];
        const clCurrent = clVersions.some(v => v.id === s.clCurrent) ? s.clCurrent : clVersions[0].id;
        return { versions, current, clVersions, clCurrent };
      }
    }
    const oldRaw = window.localStorage.getItem(OLD_DATA_KEY);
    if (oldRaw) {
      const parsed = JSON.parse(oldRaw);
      if (parsed && Array.isArray(parsed.jobs)) {
        const v = { id: newId(), name: "My Resume", data: normalizeData(parsed) };
        const clV = { id: newId(), name: "New Cover Letter", data: { ...INITIAL_CL_DATA, date: new Date().toISOString().slice(0, 10) } };
        return { versions: [v], current: v.id, clVersions: [clV], clCurrent: clV.id };
      }
    }
  } catch (e) { /* ignore */ }
  const v = { id: newId(), name: "My Resume", data: INITIAL_DATA };
  const clV = { id: newId(), name: "New Cover Letter", data: { ...INITIAL_CL_DATA, date: new Date().toISOString().slice(0, 10) } };
  return { versions: [v], current: v.id, clVersions: [clV], clCurrent: clV.id };
}

function buildClDocx(clData, contact, authorName) {
  const esc = s => (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const ACCENT="D34F2F", DARK="1C1C1E", MID="555558", LIGHT="909094";
  const F = "Inter";
  const rPr = (o={}) => {
    let s="";
    if(o.bold) s+="<w:b/>";
    if(o.size) s+=`<w:sz w:val="${o.size}"/>`;
    if(o.color) s+=`<w:color w:val="${o.color}"/>`;
    if(o.font) s+=`<w:rFonts w:ascii="${o.font}" w:hAnsi="${o.font}"/>`;
    if(o.spacing) s+=`<w:spacing w:val="${o.spacing}"/>`;
    return s?`<w:rPr>${s}</w:rPr>`:"";
  };
  const run=(text,o={})=>`<w:r>${rPr(o)}<w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
  const para=(content,o={})=>{
    let pp="";
    if(o.before||o.after) pp+=`<w:spacing w:before="${o.before||0}" w:after="${o.after||0}"/>`;
    return `<w:p>${pp?`<w:pPr>${pp}</w:pPr>`:""}${content}</w:p>`;
  };
  const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const fmtDate=(d)=>{if(!d)return"";const[y,m,dy]=d.split("-");return`${MONTHS[parseInt(m,10)-1]} ${parseInt(dy,10)}, ${y}`;};
  const contactLine=[contact.location,contact.email,contact.phone,contact.website].filter(Boolean).join("  ·  ");
  const bodyParts=[
    para(run(authorName||"",{size:48,color:ACCENT,font:F,spacing:-10}),{after:20}),
    para(run(contactLine,{size:17,color:LIGHT,font:F}),{after:240}),
    clData.date?para(run(fmtDate(clData.date),{size:18,font:F,color:MID}),{after:160}):"",
    clData.hiringManager?para(run(clData.hiringManager,{size:18,font:F,color:DARK}),{after:0}):"",
    clData.company?para(run(clData.company,{size:18,font:F,color:DARK}),{after:0}):"",
    (clData.hiringManager||clData.company)&&clData.role?para(run("Re: "+clData.role,{size:18,font:F,color:MID}),{after:160}):"",
    para(run("Dear "+(clData.hiringManager||"Hiring Manager")+",",{size:18,font:F,color:DARK}),{after:160}),
    ...(clData.body||"").split("\n").map(line=>para(run(line,{size:18,font:F,color:DARK}),{after:160})),
    para(run("Sincerely,",{size:18,font:F,color:DARK}),{after:0}),
    para("",{after:0}),para("",{after:0}),para("",{after:0}),
    para(run(authorName||"",{size:18,font:F,color:DARK,bold:true}),{after:0}),
  ].filter(Boolean).join("\n");
  const document=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${bodyParts}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>`;
  const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Inter" w:hAnsi="Inter" w:cs="Inter"/><w:sz w:val="18"/></w:rPr></w:rPrDefault></w:docDefaults></w:styles>`;
  const rels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
  const appRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
  const contentTypes=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`;
  const zip=buildZip([["[Content_Types].xml",contentTypes],["_rels/.rels",appRels],["word/document.xml",document],["word/styles.xml",styles],["word/_rels/document.xml.rels",rels]]);
  const blob=new Blob([zip],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
  const url=URL.createObjectURL(blob);
  const a=window.document.createElement("a");
  const fn=[(authorName||"").replace(/\s+/g,"_"),clData.company.replace(/\s+/g,"_")].filter(Boolean).join("_");
  a.href=url; a.download=`${fn}_Cover_Letter.docx`; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

// ── App tracker helpers ───────────────────────────────────────────────────
function timeAgo(dateStr) {
  if (!dateStr) return null;
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days/7)}w ago`;
  if (days < 365) return `${Math.floor(days/30)}mo ago`;
  return `${Math.floor(days/365)}y ago`;
}
const AVATAR_COLORS = ["#4F7AC7","#7A3E9E","#B26A16","#1F7A45","#D34F2F","#2563A6","#555558"];
const BRAND_COLORS = {
  stripe:"#635BFF", google:"#4285F4", apple:"#555555", meta:"#1877F2",
  facebook:"#1877F2", amazon:"#FF9900", microsoft:"#00A4EF", netflix:"#E50914",
  airbnb:"#FF5A5F", uber:"#000000", lyft:"#FF00BF", linkedin:"#0A66C2",
  twitter:"#1DA1F2", x:"#000000", spotify:"#1DB954", slack:"#4A154B",
  figma:"#F24E1E", adobe:"#FF0000", salesforce:"#00A1E0", hubspot:"#FF7A59",
  notion:"#000000", dropbox:"#0061FF", github:"#181717", shopify:"#96BF48",
  twilio:"#F22F46", atlassian:"#0052CC", asana:"#F06A6A", zoom:"#2D8CFF",
  okta:"#007DC1", ibm:"#1F70C1", oracle:"#F80000", workday:"#F5820D",
  servicenow:"#62D84E", snowflake:"#29B5E8", datadog:"#632CA6",
  mongodb:"#47A248", vercel:"#000000", cloudflare:"#F38020",
  digitalocean:"#0080FF", heroku:"#430098", twitch:"#9146FF",
  discord:"#5865F2", reddit:"#FF4500", pinterest:"#E60023",
  paypal:"#00457C", intuit:"#2CA01C", zendesk:"#03363D",
  anthropic:"#D34F2F", openai:"#10A37F", nvidia:"#76B900",
};
function avatarColor(name="") {
  const key = name.toLowerCase().replace(/[^a-z]/g,"");
  if (BRAND_COLORS[key]) return BRAND_COLORS[key];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function logoDomain(a) {
  if (a.url) {
    try {
      const u = new URL(a.url.startsWith("http") ? a.url : "https://" + a.url);
      return u.hostname.replace(/^www\./, "");
    } catch {}
  }
  if (a.company) return a.company.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";
  return null;
}
function AppAvatar({ app }) {
  const [failed, setFailed] = useState(false);
  const domain = logoDomain(app);
  if (domain && !failed) {
    return (
      <div className="app-avatar-wrap">
        <img src={`https://logo.clearbit.com/${domain}`} alt={app.company} className="app-avatar-img" onError={()=>setFailed(true)}/>
      </div>
    );
  }
  return (
    <div className="app-avatar" style={{background:avatarColor(app.company)}}>
      {(app.company||"?")[0].toUpperCase()}
    </div>
  );
}

function CoverLetterPreview({ clData, contact, authorName }) {
  const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const fmtDate=(d)=>{if(!d)return"";const[y,m,dy]=d.split("-");return`${MONTHS[parseInt(m,10)-1]} ${parseInt(dy,10)}, ${y}`;};
  const contactLine=[contact.location,contact.email,contact.phone,contact.website].filter(Boolean).join(" · ");
  return (
    <div style={{fontFamily:"'Inter',-apple-system,sans-serif",background:"white",padding:"60px 72px",maxWidth:760,margin:"0 auto",color:"#1C1C1E",fontSize:13,lineHeight:1.7,minHeight:"100%"}}>
      <div style={{marginBottom:36}}>
        <div style={{fontSize:26,fontWeight:300,color:"#D34F2F",letterSpacing:"-0.02em",marginBottom:4}}>{authorName}</div>
        <div style={{fontSize:12,color:"#909094"}}>{contactLine}</div>
      </div>
      {clData.date&&<div style={{marginBottom:20,fontSize:13,color:"#555558"}}>{fmtDate(clData.date)}</div>}
      {(clData.hiringManager||clData.company)&&(
        <div style={{marginBottom:20,fontSize:13,color:"#555558",lineHeight:1.7}}>
          {clData.hiringManager&&<div>{clData.hiringManager}</div>}
          {clData.company&&<div>{clData.company}</div>}
          {clData.role&&<div>Re: {clData.role}</div>}
        </div>
      )}
      <div style={{marginBottom:20,fontSize:13,color:"#1C1C1E"}}>Dear {clData.hiringManager||"Hiring Manager"},</div>
      <div style={{whiteSpace:"pre-wrap",fontSize:13,lineHeight:1.8,color:"#1C1C1E",marginBottom:36}}>{clData.body||<span style={{color:"#CCCCCC",fontStyle:"italic"}}>Letter body will appear here…</span>}</div>
      <div style={{fontSize:13,color:"#1C1C1E"}}>Sincerely,</div>
      <div style={{marginTop:40,fontSize:13,fontWeight:600,color:"#1C1C1E"}}>{authorName}</div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
const RESUME_TABS = [
  { id: "header", label: "Header" },
  { id: "history", label: "History" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "preview", label: "Preview" },
];
const RESUME_TAB_IDS = RESUME_TABS.map(t => t.id);

export default function App() {
  const [store, setStore] = useState(loadStore);
  useEffect(() => {
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* ignore */ }
  }, [store]);

  const current = store.versions.find(v => v.id === store.current) || store.versions[0];
  const data = current.data;
  const setData = (next) => setStore(s => ({ ...s, versions: s.versions.map(v => v.id === current.id ? { ...v, data: next } : v) }));

  const clCurrent = (store.clVersions||[]).find(v => v.id === store.clCurrent) || (store.clVersions||[])[0];
  const clData = clCurrent?.data || { ...INITIAL_CL_DATA };
  const setClData = (next) => setStore(s => ({ ...s, clVersions: (s.clVersions||[]).map(v => v.id === clCurrent.id ? { ...v, data: next } : v) }));

  const [active, setActive] = useState("header");
  const [exporting, setExporting] = useState(false);
  const [status, setStatus] = useState("");
  const [clTab, setClTab] = useState("content");
  const [clExporting, setClExporting] = useState(false);
  const [clStatus, setClStatus] = useState("");
  const [skillDragIdx, setSkillDragIdx] = useState(null);
  const [skillOverIdx, setSkillOverIdx] = useState(null);
  const reorderSkills = (from, to) => {
    if (from === to || to === null) return;
    const rows = [...data.skillRows];
    const [item] = rows.splice(from, 1);
    rows.splice(to, 0, item);
    setData({ ...data, skillRows: rows });
  };

  const [appSort, setAppSort] = useState({ key: "date", dir: "desc" });
  const [trackerFilter, setTrackerFilter] = useState("all");
  const [editingAppId, setEditingAppId] = useState(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setEditingAppId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isResumeTab = RESUME_TAB_IDS.includes(active);

  // ── version management ──
  const switchVersion = (id) => { setStore(s => ({ ...s, current: id })); setActive("header"); };
  const renameVersion = (id, name) => setStore(s => ({ ...s, versions: s.versions.map(v => v.id === id ? { ...v, name } : v) }));

  // Load a snapshot as a fresh working copy — original stays untouched
  const loadFromSnapshot = (id) => {
    const src = store.versions.find(v => v.id === id);
    if (!src) return;
    const name = window.prompt("Name this working copy (e.g. 'Stripe Application'):", src.name);
    if (!name || !name.trim()) return;
    setStore(s => {
      const copy = { id: newId(), name: name.trim(), data: JSON.parse(JSON.stringify(src.data)) };
      return { versions: [...s.versions, copy], current: copy.id };
    });
    setActive("header");
  };

  // Save a snapshot of current state — stays on current version, snapshot goes to the list
  const saveSnapshot = () => {
    const name = window.prompt("Name this snapshot (e.g. 'Base Resume – Jul 2026'):", current.name);
    if (!name || !name.trim()) return;
    setStore(s => {
      const snapshot = { id: newId(), name: name.trim(), data: JSON.parse(JSON.stringify(current.data)) };
      return { ...s, versions: [...s.versions, snapshot] };
    });
  };

  const deleteVersion = (id) => setStore(s => {
    if (s.versions.length <= 1) return s;
    const versions = s.versions.filter(v => v.id !== id);
    return { ...s, versions, current: s.current === id ? versions[0].id : s.current };
  });

  const switchClVersion = (id) => setStore(s => ({ ...s, clCurrent: id }));
  const renameClVersion = (id, name) => setStore(s => ({ ...s, clVersions: (s.clVersions||[]).map(v => v.id === id ? { ...v, name } : v) }));
  const addNewCl = () => {
    setStore(s => {
      const v = { id: newId(), name: "New Cover Letter", data: { ...INITIAL_CL_DATA, date: new Date().toISOString().slice(0,10) } };
      return { ...s, clVersions: [...(s.clVersions||[]), v], clCurrent: v.id };
    });
    setActive("coverletters"); setClTab("content");
  };
  const saveClSnapshot = () => {
    const name = window.prompt("Name this cover letter:", clCurrent?.name || "Cover Letter");
    if (!name || !name.trim()) return;
    setStore(s => {
      const snapshot = { id: newId(), name: name.trim(), data: JSON.parse(JSON.stringify(clData)) };
      return { ...s, clVersions: [...(s.clVersions||[]), snapshot] };
    });
  };
  const loadClFromSnapshot = (id) => {
    const src = (store.clVersions||[]).find(v => v.id === id);
    if (!src) return;
    const name = window.prompt("Name this working copy:", src.name);
    if (!name || !name.trim()) return;
    setStore(s => {
      const copy = { id: newId(), name: name.trim(), data: JSON.parse(JSON.stringify(src.data)) };
      return { ...s, clVersions: [...(s.clVersions||[]), copy], clCurrent: copy.id };
    });
    setActive("coverletters"); setClTab("content");
  };
  const deleteClVersion = (id) => setStore(s => {
    if ((s.clVersions?.length||0) <= 1) return s;
    const clVersions = (s.clVersions||[]).filter(v => v.id !== id);
    return { ...s, clVersions, clCurrent: s.clCurrent === id ? clVersions[0].id : s.clCurrent };
  });

  const updateJob=(i,u)=>{const jobs=[...data.jobs];jobs[i]=u;setData({...data,jobs});};
  const deleteJob=i=>setData({...data,jobs:data.jobs.filter((_,j)=>j!==i)});
  const addJob=()=>setData({...data,jobs:[...data.jobs,{id:Date.now(),title:"",company:"",dateRange:"",subTitle:"",subDateRange:"",bullets:[{id:Date.now(),label:"",body:""}]}]});

  const updateSkill=(i,u)=>{const s=[...data.skillRows];s[i]=u;setData({...data,skillRows:s});};
  const deleteSkill=i=>setData({...data,skillRows:data.skillRows.filter((_,j)=>j!==i)});
  const addSkill=()=>setData({...data,skillRows:[...data.skillRows,{id:Date.now(),label:"",value:""}]});

  const updateCert=(i,u)=>{const c=[...data.certifications];c[i]=u;setData({...data,certifications:c});};
  const deleteCert=i=>setData({...data,certifications:data.certifications.filter((_,j)=>j!==i)});
  const addCert=()=>setData({...data,certifications:[...data.certifications,{id:Date.now(),name:"",issuer:"",year:""}]});

  const updateCommunity=(i,u)=>{const c=[...data.community];c[i]=u;setData({...data,community:c});};
  const deleteCommunity=i=>setData({...data,community:data.community.filter((_,j)=>j!==i)});
  const addCommunity=()=>setData({...data,community:[...data.community,{id:Date.now(),role:"",org:"",dates:"",body:""}]});

  const updateApp=(id,u)=>setData({...data,applications:data.applications.map(a=>a.id===id?u:a)});
  const deleteApp=id=>setData({...data,applications:data.applications.filter(a=>a.id!==id)});
  const addApp=()=>setData({...data,applications:[{id:Date.now(),company:"",role:"Senior Product Designer",date:new Date().toISOString().slice(0,10),status:"Applied",url:"",notes:""},...data.applications]});
  const STATUS_ORDER = {
    "Final Round":0,"Team Interview":1,"Upcoming Interview":2,
    "Case Study Interview":3,"Design Interview":4,"HR Interview":5,
    "Applied":6,"Rejected":7
  };
  // Status defaults to asc (most positive first); Date defaults to desc (newest first)
  const setAppSortKey = (key) => setAppSort(s => ({
    key,
    dir: s.key===key ? (s.dir==="asc"?"desc":"asc") : (key==="status" ? "asc" : "desc")
  }));
  const FILTER_ACTIVE = ["HR Interview","Design Interview","Case Study Interview","Upcoming Interview","Team Interview","Final Round"];
  const appFilterGroups = [
    { id:"all", label:"All" },
    { id:"applied", label:"Applied" },
    { id:"active", label:"Interviewing" },
    { id:"rejected", label:"Rejected" },
  ];
  const filterCount = (id) => {
    if (id==="all") return data.applications.length;
    if (id==="applied") return data.applications.filter(a=>a.status==="Applied").length;
    if (id==="active") return data.applications.filter(a=>FILTER_ACTIVE.includes(a.status)).length;
    if (id==="rejected") return data.applications.filter(a=>a.status==="Rejected").length;
    return 0;
  };
  const sortedApps=[...data.applications]
    .filter(a => {
      if (trackerFilter==="applied") return a.status==="Applied";
      if (trackerFilter==="active") return FILTER_ACTIVE.includes(a.status);
      if (trackerFilter==="rejected") return a.status==="Rejected";
      return true;
    })
    .sort((a,b)=>{
      if (appSort.key==="status") {
        const ao=STATUS_ORDER[a.status]??99, bo=STATUS_ORDER[b.status]??99;
        return appSort.dir==="asc" ? ao-bo : bo-ao;
      }
      const av=a.date||"",bv=b.date||"";
      return appSort.dir==="desc"?bv.localeCompare(av):av.localeCompare(bv);
    });

  const handleExport=()=>{
    setExporting(true); setStatus("Building...");
    try { buildDocx(data); setStatus("Downloaded!"); }
    catch(e) { console.error(e); setStatus("Error"); }
    setExporting(false);
    setTimeout(()=>setStatus(""),3000);
  };

  const handleClExport=()=>{
    setClExporting(true); setClStatus("Building...");
    try { buildClDocx(clData, data.contact, data.name); setClStatus("Downloaded!"); }
    catch(e) { console.error(e); setClStatus("Error"); }
    setClExporting(false);
    setTimeout(()=>setClStatus(""),3000);
  };

  const exportResumePdf=()=>{
    document.body.setAttribute("data-printing","resume");
    const cleanup=()=>{document.body.removeAttribute("data-printing");window.removeEventListener("afterprint",cleanup);};
    window.addEventListener("afterprint",cleanup);
    window.print();
  };

  const exportClPdf=()=>{
    document.body.setAttribute("data-printing","cl");
    const cleanup=()=>{document.body.removeAttribute("data-printing");window.removeEventListener("afterprint",cleanup);};
    window.addEventListener("afterprint",cleanup);
    window.print();
  };

  const resetVersion = () => {
    if (window.confirm("Reset this resume back to sample content? Your other saved resumes are untouched.")) setData(INITIAL_DATA);
  };

  const exportData = () => {
    const raw = localStorage.getItem(STORE_KEY) || "{}";
    const blob = new Blob([raw], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "resume-builder-backup.json";
    a.click();
  };

  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          JSON.parse(ev.target.result);
          localStorage.setItem(STORE_KEY, ev.target.result);
          window.location.reload();
        } catch { alert("Invalid backup file."); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const lbl = text => <label style={{fontSize:11,color:"#888",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",display:"block",marginBottom:12}}>{text}</label>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', -apple-system, sans-serif; background: ${T.bg}; }
        .app { display: flex; height: 100vh; overflow: hidden; }

        /* ── Sidebar ── */
        .sidebar { width: 200px; min-width: 200px; background: #EDECE8; display: flex; flex-direction: column; border-right: 1px solid ${T.border}; }
        .sidebar-brand { padding: 22px 20px 18px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${T.dark}; }
        .sidebar-version-wrap { padding: 0 14px 16px; }
        .sidebar-ver-select { width: 100%; background: white; border: 1px solid ${T.border}; border-radius: 6px; padding: 7px 10px; font-size: 12.5px; font-family: inherit; cursor: pointer; color: ${T.dark}; font-weight: 500; -webkit-appearance: none; appearance: none; }
        .sidebar-divider { height: 1px; background: ${T.border}; margin: 0 0 8px; }
        .sidebar-nav-label { padding: 12px 20px 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #AAAAAA; }
        .sidebar-item { display: block; width: 100%; text-align: left; padding: 10px 20px; font-size: 13px; background: none; border: none; border-left: 3px solid transparent; cursor: pointer; color: ${T.mid}; font-family: inherit; transition: all 0.15s; }
        .sidebar-item:hover { background: rgba(0,0,0,0.04); color: ${T.dark}; }
        .sidebar-item.active { background: rgba(211,79,47,0.07); color: ${T.accent}; font-weight: 600; border-left-color: ${T.accent}; }
        .sidebar-footer { margin-top: auto; padding: 16px 20px; display: flex; flex-direction: column; gap: 8px; }
        .sidebar-reset { background: none; border: none; font-family: inherit; font-size: 11.5px; color: ${T.light}; cursor: pointer; text-align: left; padding: 0; }
        .sidebar-reset:hover { color: #C0392B; }
        .sidebar-export { background: none; border: none; font-family: inherit; font-size: 11.5px; color: ${T.light}; cursor: pointer; text-align: left; padding: 0; }
        .sidebar-export:hover { color: ${T.accent}; }

        /* ── Right area ── */
        .right-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

        /* ── Tab bar ── */
        .tabbar { display: flex; align-items: stretch; padding: 0 28px; background: ${T.bg}; border-bottom: 1px solid ${T.border}; flex-shrink: 0; }
        .tab { padding: 14px 16px 13px; font-size: 13px; font-weight: 500; color: ${T.light}; background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; font-family: inherit; white-space: nowrap; transition: color 0.12s, border-color 0.12s; margin-bottom: -1px; }
        .tab:hover { color: ${T.dark}; }
        .tab.active { color: ${T.dark}; border-bottom-color: ${T.accent}; font-weight: 600; }

        /* ── Editor main ── */
        .main { flex: 1; overflow-y: auto; padding: 28px 32px; background: ${T.bg}; }

        /* ── Preview layout ── */
        .preview-layout { flex: 1; display: flex; overflow: hidden; }
        .preview-scroll { flex: 1; overflow-y: auto; background: #E2E0DB; padding: 36px 32px; }
        .preview-paper { background: white; max-width: 800px; margin: 0 auto; box-shadow: 0 4px 24px rgba(0,0,0,0.14); }
        .preview-actions { width: 196px; min-width: 196px; padding: 28px 20px; background: white; border-left: 1px solid ${T.border}; display: flex; flex-direction: column; gap: 10px; }
        .preview-actions-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${T.light}; margin-bottom: 4px; }
        .pa-btn { width: 100%; padding: 10px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit; border: 1px solid ${T.border}; background: white; color: ${T.dark}; transition: all 0.15s; text-align: left; }
        .pa-btn:hover { border-color: ${T.accent}; color: ${T.accent}; }
        .pa-btn.primary { background: ${T.accent}; color: white; border-color: ${T.accent}; }
        .pa-btn.primary:hover { background: #BA4529; border-color: #BA4529; }
        .pa-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .pa-status { font-size: 11.5px; color: ${T.accent}; min-height: 16px; }
        .preview-divider { height: 1px; background: ${T.border}; margin: 4px 0; }

        /* ── Print ── */
        .print-only { display: none; }
        .cl-print-only { display: none; }
        @media print {
          @page { size: letter; margin: 0.75in; }
          html, body, #root { background: #FFFFFF !important; }
          body * { background-color: transparent; }
          .app { display: none !important; }
          /* Resume print (default when no data-printing, or data-printing=resume) */
          body:not([data-printing="cl"]) .print-only { display: block !important; }
          body:not([data-printing="cl"]) .print-only > div { background: #FFFFFF !important; max-width: none !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          /* Cover letter print */
          body[data-printing="cl"] .cl-print-only { display: block !important; }
          body[data-printing="cl"] .cl-print-only > div { background: #FFFFFF !important; max-width: none !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .rp-sec { break-after: avoid; }
          .rp-job, .rp-bullet, .rp-skill { break-inside: avoid; }
          * { box-shadow: none !important; }
        }

        /* ── Cover Letter ── */
        .cl-tab-bar { display: flex; align-items: stretch; padding: 0 28px; background: ${T.bg}; border-bottom: 1px solid ${T.border}; flex-shrink: 0; }
        .cl-layout { flex: 1; display: flex; overflow: hidden; }
        .cl-form-scroll { flex: 1; overflow-y: auto; padding: 28px; max-width: 720px; }
        .cl-field-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 16px; }
        .cl-field-label { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: ${T.light}; }
        .cl-body-textarea { min-height: 360px; line-height: 1.7; resize: vertical; }
        .cl-preview-layout { flex: 1; display: flex; overflow: hidden; }
        .cl-preview-scroll { flex: 1; overflow-y: auto; background: #E8E6E1; padding: 32px; }
        .cl-preview-paper { background: white; max-width: 760px; margin: 0 auto; padding: 60px 72px; font-family: 'Inter',-apple-system,sans-serif; font-size: 13px; line-height: 1.7; color: #1C1C1E; box-shadow: 0 4px 32px rgba(0,0,0,0.12); }
        .cl-preview-actions { width: 200px; flex-shrink: 0; border-left: 1px solid ${T.border}; padding: 24px 20px; display: flex; flex-direction: column; gap: 10px; background: ${T.bg}; overflow-y: auto; }
        .cl-ver-select { width: 100%; background: white; border: 1px solid ${T.border}; border-radius: 6px; padding: 7px 10px; font-size: 12.5px; font-family: inherit; cursor: pointer; color: ${T.dark}; font-weight: 500; -webkit-appearance: none; appearance: none; margin-bottom: 4px; }

        /* ── Common editor styles ── */
        .section-title { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${T.accent}; margin-bottom: 20px; }
        .field { width: 100%; background: white; border: 1px solid ${T.border}; border-radius: 5px; padding: 8px 10px; font-size: 13px; color: ${T.dark}; font-family: inherit; resize: vertical; transition: border-color 0.15s; outline: none; }
        .field:focus { border-color: ${T.accent}; box-shadow: 0 0 0 3px rgba(211,79,47,0.1); }
        .field.name-field { font-size: 18px; font-weight: 700; }
        .field.summary-field { min-height: 120px; line-height: 1.6; }
        .header-grid { display: grid; gap: 12px; }
        .header-grid label { font-size: 11px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .job-block { background: white; border: 1px solid ${T.border}; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
        .job-header-row { display: flex; gap: 12px; margin-bottom: 16px; }
        .job-header-fields { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .job-top-row, .job-sub-row { display: flex; gap: 8px; align-items: center; }
        .separator { color: #ccc; font-size: 16px; }
        .field.job-title { flex: 2; font-weight: 600; }
        .field.job-company { flex: 1.5; }
        .field.job-dates { width: 160px; min-width: 160px; color: #888; }
        .field.job-subtitle { flex: 1; color: #888; }
        .bullets-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
        .bullet-row { display: flex; gap: 10px; align-items: flex-start; border-top: 2px solid transparent; transition: border-color 0.1s; border-radius: 2px; }
        .bullet-row.dragging { opacity: 0.35; }
        .bullet-row.drag-over { border-top-color: ${T.accent}; }
        .bullet-drag-handle { color: #CCC; cursor: grab; padding: 9px 2px 0; flex-shrink: 0; display: flex; align-items: flex-start; }
        .bullet-drag-handle:hover { color: #999; }
        .bullet-drag-handle:active { cursor: grabbing; }
        .bullet-dot { color: ${T.accent}; font-size: 16px; line-height: 1; margin-top: 9px; flex-shrink: 0; font-weight: 700; }
        .bullet-fields { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .field.bullet-label { font-weight: 600; font-size: 12px; }
        .field.bullet-body { font-size: 13px; min-height: 72px; }
        .add-btn { font-size: 12px; color: ${T.accent}; background: none; border: 1px dashed ${T.accent}; border-radius: 5px; padding: 6px 12px; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .add-btn:hover { background: rgba(211,79,47,0.05); }
        .icon-btn { background: none; border: none; cursor: pointer; font-size: 18px; line-height: 1; padding: 4px; border-radius: 4px; transition: all 0.15s; flex-shrink: 0; }
        .delete-btn { color: #ccc; }
        .delete-btn:hover { color: #e05555; background: rgba(224,85,85,0.08); }
        .skill-block { background: white; border: 1px solid ${T.border}; border-radius: 8px; padding: 16px 20px; margin-bottom: 14px; border-top: 2px solid transparent; transition: border-color 0.1s, opacity 0.15s; }
        .skill-block.dragging { opacity: 0.35; }
        .skill-block.drag-over { border-top-color: ${T.accent}; }
        .skill-block-header { display: flex; gap: 8px; align-items: center; margin-bottom: 10px; }
        .field.skill-label { flex: 1; font-weight: 600; }
        .field.skill-value { width: 100%; min-height: 76px; font-size: 13px; line-height: 1.55; resize: none; overflow: hidden; }
        .section-card { background: white; border: 1px solid ${T.border}; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
        .jobs-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }

        /* ── Versions ── */
        .ver-list { display: flex; flex-direction: column; gap: 10px; }
        .ver-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; border: 1px solid ${T.border}; background: white; }
        .ver-row.active { border-color: ${T.accent}; background: rgba(211,79,47,0.03); }
        .ver-meta { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .ver-name { font-weight: 600; border: none; border-bottom: 1px solid transparent; border-radius: 0; padding: 2px 0; background: transparent; }
        .ver-name:focus { border-bottom-color: ${T.accent}; box-shadow: none; }
        .ver-editing-badge { font-size: 10.5px; color: ${T.accent}; font-weight: 600; letter-spacing: 0.03em; }
        .ver-btn { background: none; border: 1px solid ${T.border}; border-radius: 5px; padding: 7px 12px; font-size: 12px; cursor: pointer; font-family: inherit; color: ${T.mid}; white-space: nowrap; }
        .ver-btn:hover:not(:disabled) { border-color: ${T.accent}; color: ${T.accent}; }
        .ver-btn:disabled { opacity: 0.45; cursor: default; }
        .ver-btn.primary { background: ${T.accent}; color: white; border-color: ${T.accent}; }
        .ver-btn.primary:hover { background: #BA4529; border-color: #BA4529; }
        .ver-btn.danger:hover:not(:disabled) { border-color: #C0392B; color: #C0392B; }

        /* ── Application tracker ── */
        .apps-empty { font-size: 13px; color: ${T.light}; padding: 14px 2px; line-height: 1.5; }

        .tracker-filters { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .filter-pill { display: inline-flex; align-items: center; gap: 7px; padding: 7px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 600; border: 1.5px solid ${T.border}; background: white; cursor: pointer; font-family: inherit; color: ${T.mid}; transition: all 0.15s; }
        .filter-pill:hover { border-color: ${T.dark}; color: ${T.dark}; }
        .filter-pill.active { background: ${T.dark}; border-color: ${T.dark}; color: white; }
        .filter-count { font-size: 11px; font-weight: 700; padding: 1px 6px; border-radius: 999px; background: #EDECE8; color: ${T.mid}; }
        .filter-pill.active .filter-count { background: rgba(255,255,255,0.18); color: white; }
        .apps-sort-btn { background: none; border: 1px solid transparent; border-radius: 6px; cursor: pointer; font-family: inherit; font-size: 12px; color: ${T.light}; font-weight: 600; padding: 6px 10px; flex-shrink: 0; transition: all 0.15s; }
        .apps-sort-btn:hover { color: ${T.dark}; }
        .apps-sort-btn.active { color: ${T.dark}; border-color: ${T.border}; background: white; }

        /* ── Tracker list (LinkedIn-style flat rows) ── */
        .apps-list { display: flex; flex-direction: column; background: white; border: 1px solid ${T.border}; border-radius: 10px; overflow: hidden; }
        .tracker-col-headers { display: grid; grid-template-columns: 68px 1fr 240px 160px; gap: 0; padding: 9px 16px; border-bottom: 1px solid ${T.border}; }
        .tracker-col-header { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #AAAAAA; }

        .app-card { border-bottom: 1px solid ${T.border}; }
        .app-card:last-child { border-bottom: none; }
        .app-card.editing { background: #FAFAF8; }

        .app-preview { display: grid; grid-template-columns: 68px 1fr 240px 160px; gap: 0; align-items: center; padding: 14px 16px; cursor: pointer; transition: background 0.12s; }
        .app-preview:hover { background: #FAFAF8; }
        .app-avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: white; flex-shrink: 0; }
        .app-avatar-wrap { width: 48px; height: 48px; border-radius: 50%; border: 1px solid ${T.border}; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: white; }
        .app-avatar-img { width: 80%; height: 80%; object-fit: contain; }
        .app-preview-info { min-width: 0; padding-right: 16px; }
        .app-preview-title { font-size: 13.5px; font-weight: 700; color: ${T.dark}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .app-preview-sub { font-size: 12.5px; color: ${T.mid}; margin-top: 2px; }
        .app-preview-meta { font-size: 11.5px; color: ${T.light}; margin-top: 3px; }
        .app-preview-notes { font-size: 12.5px; color: ${T.mid}; padding-right: 16px; font-style: italic; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
        .app-preview-notes.empty { color: #CCCCCC; font-style: normal; }
        .app-status-badge { display: inline-block; padding: 6px 13px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; letter-spacing: 0.01em; }
        .app-preview-apply { display: flex; }
        .app-preview-status { display: flex; justify-content: flex-end; }

        /* ── Drawer ── */
        .app-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.18); z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.22s; }
        .app-drawer-overlay.open { opacity: 1; pointer-events: all; }
        .app-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 320px; background: white; z-index: 201; display: flex; flex-direction: column; box-shadow: -4px 0 24px rgba(0,0,0,0.10); transform: translateX(100%); transition: transform 0.24s cubic-bezier(.4,0,.2,1); }
        .app-drawer.open { transform: translateX(0); }
        .app-drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px 14px; border-bottom: 1px solid ${T.border}; flex-shrink: 0; }
        .app-drawer-title { font-size: 14px; font-weight: 700; color: ${T.dark}; }
        .app-drawer-close { background: none; border: none; cursor: pointer; font-size: 20px; color: ${T.light}; line-height: 1; padding: 2px 4px; border-radius: 4px; font-family: inherit; }
        .app-drawer-close:hover { background: ${T.border}; color: ${T.dark}; }
        .app-drawer-body { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
        .app-drawer-field { display: flex; flex-direction: column; gap: 5px; }
        .app-drawer-label { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: ${T.light}; }
        .app-drawer-footer { padding: 14px 20px; border-top: 1px solid ${T.border}; flex-shrink: 0; display: flex; flex-direction: column; gap: 8px; }
        .app-drawer-save { background: ${T.accent}; border: none; color: white; border-radius: 6px; padding: 10px 14px; font-size: 13px; font-weight: 600; cursor: pointer; width: 100%; font-family: inherit; transition: opacity 0.15s; }
        .app-drawer-save:hover { opacity: 0.88; }
        .app-drawer-delete { background: none; border: 1px solid #FECACA; color: #B91C1C; border-radius: 6px; padding: 8px 14px; font-size: 13px; font-weight: 600; cursor: pointer; width: 100%; font-family: inherit; transition: background 0.15s; }
        .app-drawer-delete:hover { background: #FEF2F2; }
        .app-drawer-notes { resize: vertical; min-height: 80px; }
        .drawer-status-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23555558' d='M2 4l4 4 4-4'/%3E%3C/svg%3E") !important; background-repeat: no-repeat !important; background-position: right 14px center !important; padding-right: 36px !important; }
        .field.app-company { flex: 1.4; font-weight: 600; }
        .field.app-role { flex: 1.2; }
        .field.app-url { flex: 1; font-size: 12.5px; color: ${T.mid}; }
        .field.app-notes { flex: 1.4; font-size: 12.5px; }
        .date-field-wrap { position: relative; display: inline-flex; flex-shrink: 0; }
        .date-display { display: inline-flex; align-items: center; padding: 8px 11px; background: white; border: 1px solid ${T.border}; border-radius: 5px; font-size: 12.5px; color: ${T.mid}; white-space: nowrap; cursor: pointer; transition: border-color 0.15s; user-select: none; }
        .date-field-wrap:hover .date-display { border-color: ${T.accent}; }
        .date-input-hidden { position: absolute; inset: 0; opacity: 0; width: 100%; height: 100%; cursor: pointer; }
        .app-status-pill { cursor: pointer; -webkit-appearance: none; appearance: none; border: none; border-radius: 999px; padding: 7px 13px; font-size: 12px; font-weight: 700; font-family: inherit; flex-shrink: 0; }
        .app-link-btn { display: inline-flex; align-items: center; gap: 4px; padding: 7px 13px; border-radius: 999px; border: 1.5px solid ${T.dark}; background: white; color: ${T.dark}; font-size: 12px; font-weight: 700; font-family: inherit; text-decoration: none; white-space: nowrap; flex-shrink: 0; transition: all 0.15s; }
        .app-link-btn:hover { background: ${T.dark}; color: white; }
      `}</style>

      <div className="app">

        {/* ── Left sidebar ── */}
        <div className="sidebar">
          <div className="sidebar-brand">Resume builder</div>
          <div className="sidebar-version-wrap">
            <select className="sidebar-ver-select" value={store.current} onChange={e=>switchVersion(e.target.value)}>
              {store.versions.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div className="sidebar-divider"/>
          <div className="sidebar-nav-label">Resume</div>
          <button
            className={`sidebar-item ${isResumeTab ? "active" : ""}`}
            onClick={() => setActive(isResumeTab ? active : "header")}
          >
            Resume
          </button>
          <button className={`sidebar-item ${active==="versions"?"active":""}`} onClick={()=>setActive("versions")}>
            Saved Resumes
          </button>
          <div className="sidebar-nav-label">Cover Letters</div>
          {(store.clVersions||[]).length > 1 && (
            <div style={{padding:"0 14px 8px"}}>
              <select className="cl-ver-select" value={store.clCurrent} onChange={e=>switchClVersion(e.target.value)}>
                {(store.clVersions||[]).map(v=><option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
          )}
          <button className={`sidebar-item ${active==="coverletters"?"active":""}`} onClick={()=>{setActive("coverletters");setClTab("content");}}>
            Cover Letters
          </button>
          <button className={`sidebar-item ${active==="saved-cls"?"active":""}`} onClick={()=>setActive("saved-cls")}>
            Saved Cover Letters
          </button>
          <div className="sidebar-nav-label">Tracker</div>
          <button className={`sidebar-item ${active==="applications"?"active":""}`} onClick={()=>setActive("applications")}>
            Application Tracker
          </button>
          <div className="sidebar-footer">
            <button className="sidebar-export" onClick={exportData}>Export data ↓</button>
            <button className="sidebar-export" onClick={importData}>Import data ↑</button>
            <button className="sidebar-reset" onClick={resetVersion}>Reset to sample</button>
          </div>
        </div>

        {/* ── Right area ── */}
        <div className="right-area">

          {/* Tab bar — only for resume editing */}
          {isResumeTab && (
            <div className="tabbar">
              {RESUME_TABS.map(t => (
                <button key={t.id} className={`tab ${active===t.id?"active":""}`} onClick={()=>setActive(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* ── Preview tab ── */}
          {active==="preview" && (
            <div className="preview-layout">
              <div className="preview-scroll">
                <div className="preview-paper">
                  <ResumePreview data={data}/>
                </div>
              </div>
              <div className="preview-actions">
                <div className="preview-actions-label">Export</div>
                <button className="pa-btn primary" onClick={exportResumePdf}>Export PDF</button>
                <button className="pa-btn" onClick={handleExport} disabled={exporting}>{exporting?"Building…":"Export .docx"}</button>
                {status && <div className="pa-status">{status}</div>}
                <div className="preview-divider"/>
                <div className="preview-actions-label">Snapshots</div>
                <button className="pa-btn" onClick={saveSnapshot}>Save snapshot…</button>
              </div>
            </div>
          )}

          {/* ── Editor tabs ── */}
          {active!=="preview" && isResumeTab && (
            <div className="main">
              {active==="header" && <>
                <div className="section-title">Header</div>
                <div className="section-card">
                  <div className="header-grid">
                    <div><label>Full Name</label><Field className="name-field" value={data.name} onChange={v=>setData({...data,name:v})}/></div>
                    <div><label>Title</label><Field value={data.title} onChange={v=>setData({...data,title:v})}/></div>
                    <div className="contact-grid">
                      <div><label>Location</label><Field value={data.contact.location} onChange={v=>setData({...data,contact:{...data.contact,location:v}})} placeholder="City, ST"/></div>
                      <div><label>Email</label><Field value={data.contact.email} onChange={v=>setData({...data,contact:{...data.contact,email:v}})} placeholder="you@email.com"/></div>
                      <div><label>Phone</label><Field value={data.contact.phone} onChange={v=>setData({...data,contact:{...data.contact,phone:v}})} placeholder="000-000-0000"/></div>
                      <div><label>Website</label><Field value={data.contact.website} onChange={v=>setData({...data,contact:{...data.contact,website:v}})} placeholder="www.site.com"/></div>
                    </div>
                    <div><label>Summary</label><Field className="summary-field" multiline value={data.summary} onChange={v=>setData({...data,summary:v})} placeholder="Summary paragraph…"/></div>
                  </div>
                </div>
              </>}

              {active==="history" && <>
                <div className="jobs-header">
                  <div className="section-title" style={{marginBottom:0}}>Work History</div>
                  <button className="add-btn" onClick={addJob}>+ Add job</button>
                </div>
                {data.jobs.map((job,i)=><JobEditor key={job.id} job={job} onChange={u=>updateJob(i,u)} onDelete={()=>deleteJob(i)}/>)}
              </>}

              {active==="skills" && <>
                <div className="jobs-header">
                  <div className="section-title" style={{marginBottom:0}}>Skills</div>
                  <button className="add-btn" onClick={addSkill}>+ Add category</button>
                </div>
                {data.skillRows.map((s,i)=>(
                  <div
                    key={s.id}
                    className={`skill-block${skillDragIdx===i?" dragging":""}${skillOverIdx===i&&skillDragIdx!==i?" drag-over":""}`}
                    onDragOver={e=>{e.preventDefault();setSkillOverIdx(i);}}
                    onDrop={e=>e.preventDefault()}
                  >
                    <div className="skill-block-header">
                      <div
                        className="bullet-drag-handle"
                        style={{padding:"2px 4px 0 0"}}
                        draggable
                        onDragStart={()=>setSkillDragIdx(i)}
                        onDragEnd={()=>{reorderSkills(skillDragIdx,skillOverIdx);setSkillDragIdx(null);setSkillOverIdx(null);}}
                      >
                        <DragHandle/>
                      </div>
                      <input className="field skill-label" value={s.label} onChange={e=>updateSkill(i,{...s,label:e.target.value})} placeholder="Category (e.g. Design & Craft)"/>
                      <button className="icon-btn delete-btn" onClick={()=>deleteSkill(i)}>×</button>
                    </div>
                    <GrowTextarea className="skill-value" value={s.value} onChange={v=>updateSkill(i,{...s,value:v})} placeholder="Skills, comma separated"/>
                  </div>
                ))}
              </>}

              {active==="education" && <>
                <div className="section-title">Education, Certs &amp; Community</div>
                <div className="section-card" style={{marginBottom:16}}>
                  {lbl("Education")}
                  <div style={{display:"flex",gap:8}}>
                    <input className="field" style={{fontWeight:600,width:200,minWidth:200}} value={data.education.degree} onChange={e=>setData({...data,education:{...data.education,degree:e.target.value}})} placeholder="Degree"/>
                    <input className="field" style={{flex:1}} value={data.education.school} onChange={e=>setData({...data,education:{...data.education,school:e.target.value}})} placeholder="School"/>
                    <input className="field" style={{width:100,minWidth:100}} value={data.education.years} onChange={e=>setData({...data,education:{...data.education,years:e.target.value}})} placeholder="Years"/>
                  </div>
                </div>
                <div className="section-card" style={{marginBottom:16}}>
                  {lbl("Certifications")}
                  {data.certifications.map((c,i)=>(
                    <div key={c.id} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                      <input className="field" style={{flex:2,fontWeight:600}} value={c.name} onChange={e=>updateCert(i,{...c,name:e.target.value})} placeholder="Certification name"/>
                      <input className="field" style={{flex:1.5}} value={c.issuer} onChange={e=>updateCert(i,{...c,issuer:e.target.value})} placeholder="Issuer"/>
                      <input className="field" style={{width:100,minWidth:100}} value={c.year} onChange={e=>updateCert(i,{...c,year:e.target.value})} placeholder="Year"/>
                      <button className="icon-btn delete-btn" onClick={()=>deleteCert(i)}>×</button>
                    </div>
                  ))}
                  <button className="add-btn" onClick={addCert}>+ Add certification</button>
                </div>
                <div className="jobs-header" style={{marginBottom:12}}>
                  {lbl("Community")}
                  <button className="add-btn" onClick={addCommunity}>+ Add</button>
                </div>
                {data.community.map((c,i)=>(
                  <div key={c.id} className="job-block" style={{marginBottom:12}}>
                    <div className="job-header-row">
                      <div className="job-top-row" style={{flex:1,marginBottom:8}}>
                        <input className="field job-title" value={c.role} onChange={e=>updateCommunity(i,{...c,role:e.target.value})} placeholder="Role"/>
                        <span className="separator">·</span>
                        <input className="field job-company" value={c.org} onChange={e=>updateCommunity(i,{...c,org:e.target.value})} placeholder="Organization"/>
                        <input className="field job-dates" value={c.dates} onChange={e=>updateCommunity(i,{...c,dates:e.target.value})} placeholder="Years"/>
                      </div>
                      <button className="icon-btn delete-btn" onClick={()=>deleteCommunity(i)}>×</button>
                    </div>
                    <Field multiline value={c.body} onChange={v=>updateCommunity(i,{...c,body:v})} placeholder="Description..."/>
                  </div>
                ))}
              </>}
            </div>
          )}

          {/* ── Saved Resumes ── */}
          {active==="versions" && (
            <div className="main">
              <div className="jobs-header">
                <div className="section-title" style={{marginBottom:0}}>Saved Resumes</div>
              </div>
              <div className="apps-empty" style={{marginBottom:20,paddingTop:0}}>
                These are your saved snapshots — think of them as templates. <strong>Load copy</strong> creates a fresh editable copy so your snapshot stays untouched. To save a new snapshot, go to <strong>Preview → Save snapshot</strong>.
              </div>
              <div className="section-card">
                {store.versions.length === 0
                  ? <div className="apps-empty">No snapshots yet. Go to Preview and click "Save snapshot" to save your first one.</div>
                  : <div className="ver-list">
                      {store.versions.map(v=>(
                        <div key={v.id} className={`ver-row ${v.id===current.id?"active":""}`}>
                          <div className="ver-meta">
                            <input className="field ver-name" value={v.name} onChange={e=>renameVersion(v.id,e.target.value)} placeholder="Snapshot name"/>
                            {v.id===current.id && <span className="ver-editing-badge">currently editing</span>}
                          </div>
                          <button className="ver-btn primary" onClick={()=>loadFromSnapshot(v.id)}>Load copy</button>
                          <button className="ver-btn danger" onClick={()=>{ if(window.confirm(`Delete "${v.name}"? This can't be undone.`)) deleteVersion(v.id); }} disabled={store.versions.length<=1}>Delete</button>
                        </div>
                      ))}
                    </div>
                }
              </div>
            </div>
          )}

          {/* ── Cover Letters ── */}
          {active==="coverletters" && (
            <>
              <div className="cl-tab-bar">
                <button className={`tab ${clTab==="content"?"active":""}`} onClick={()=>setClTab("content")}>Content</button>
                <button className={`tab ${clTab==="preview"?"active":""}`} onClick={()=>setClTab("preview")}>Preview</button>
              </div>
              {clTab==="content" && (
                <div className="cl-layout">
                  <div className="cl-form-scroll">
                    <div className="section-title">Cover Letter</div>
                    {clCurrent && (
                      <div style={{marginBottom:20}}>
                        <input className="field" style={{fontWeight:600,fontSize:14}} value={clCurrent.name} onChange={e=>renameClVersion(clCurrent.id,e.target.value)} placeholder="Cover letter name"/>
                      </div>
                    )}
                    <div className="cl-field-group">
                      <div className="cl-field-label">Company</div>
                      <input className="field" value={clData.company} onChange={e=>setClData({...clData,company:e.target.value})} placeholder="Company name"/>
                    </div>
                    <div className="cl-field-group">
                      <div className="cl-field-label">Hiring Manager / Recipient</div>
                      <input className="field" value={clData.hiringManager} onChange={e=>setClData({...clData,hiringManager:e.target.value})} placeholder="e.g. Alex Johnson (or leave blank for 'Hiring Manager')"/>
                    </div>
                    <div style={{display:"flex",gap:12}}>
                      <div className="cl-field-group" style={{flex:2}}>
                        <div className="cl-field-label">Role</div>
                        <input className="field" value={clData.role} onChange={e=>setClData({...clData,role:e.target.value})} placeholder="Role you're applying for"/>
                      </div>
                      <div className="cl-field-group" style={{flex:1}}>
                        <div className="cl-field-label">Date</div>
                        <DateField value={clData.date} onChange={e=>setClData({...clData,date:e.target.value})}/>
                      </div>
                    </div>
                    <div className="cl-field-group">
                      <div className="cl-field-label">Letter Body</div>
                      <textarea className="field cl-body-textarea" value={clData.body} onChange={e=>setClData({...clData,body:e.target.value})} placeholder="Write your cover letter here…"/>
                    </div>
                    <button className="add-btn" style={{marginTop:8}} onClick={addNewCl}>+ New cover letter</button>
                  </div>
                </div>
              )}
              {clTab==="preview" && (
                <div className="cl-preview-layout">
                  <div className="cl-preview-scroll">
                    <div className="cl-preview-paper">
                      <CoverLetterPreview clData={clData} contact={data.contact} authorName={data.name}/>
                    </div>
                  </div>
                  <div className="cl-preview-actions">
                    <div className="preview-actions-label">Export</div>
                    <button className="pa-btn primary" onClick={exportClPdf}>Export PDF</button>
                    <button className="pa-btn" onClick={handleClExport} disabled={clExporting}>{clExporting?"Building…":"Export .docx"}</button>
                    {clStatus && <div className="pa-status">{clStatus}</div>}
                    <div className="preview-divider"/>
                    <div className="preview-actions-label">Snapshots</div>
                    <button className="pa-btn" onClick={saveClSnapshot}>Save snapshot…</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Saved Cover Letters ── */}
          {active==="saved-cls" && (
            <div className="main">
              <div className="jobs-header">
                <div className="section-title" style={{marginBottom:0}}>Saved Cover Letters</div>
                <button className="add-btn" onClick={addNewCl}>+ New cover letter</button>
              </div>
              <div className="apps-empty" style={{marginBottom:20,paddingTop:0}}>
                These are your saved cover letter snapshots. <strong>Load copy</strong> creates a fresh editable copy so your snapshot stays untouched. To save a snapshot, go to <strong>Cover Letters → Preview → Save snapshot</strong>.
              </div>
              <div className="section-card">
                {(store.clVersions||[]).length === 0
                  ? <div className="apps-empty">No cover letters yet. Click <strong>+ New cover letter</strong> to start.</div>
                  : <div className="ver-list">
                      {(store.clVersions||[]).map(v=>(
                        <div key={v.id} className={`ver-row ${v.id===clCurrent?.id?"active":""}`}>
                          <div className="ver-meta">
                            <input className="field ver-name" value={v.name} onChange={e=>renameClVersion(v.id,e.target.value)} placeholder="Cover letter name"/>
                            <div style={{fontSize:11.5,color:T.light,marginTop:2}}>{v.data?.company||<em style={{color:"#CCC"}}>No company</em>}{v.data?.role ? ` · ${v.data.role}` : ""}</div>
                            {v.id===clCurrent?.id && <span className="ver-editing-badge">currently editing</span>}
                          </div>
                          <button className="ver-btn primary" onClick={()=>loadClFromSnapshot(v.id)}>Load copy</button>
                          <button className="ver-btn" style={{color:T.accent,borderColor:T.accent}} onClick={()=>{switchClVersion(v.id);setActive("coverletters");setClTab("content");}}>Open</button>
                          <button className="ver-btn danger" onClick={()=>{ if(window.confirm(`Delete "${v.name}"? This can't be undone.`)) deleteClVersion(v.id); }} disabled={(store.clVersions?.length||0)<=1}>Delete</button>
                        </div>
                      ))}
                    </div>
                }
              </div>
            </div>
          )}

          {/* ── Application Tracker ── */}
          {active==="applications" && (
            <div className="main">
              <div className="jobs-header">
                <div className="section-title" style={{marginBottom:0}}>Application Tracker</div>
                <button className="add-btn" onClick={addApp}>+ Add application</button>
              </div>

              {/* Filter pills */}
              <div className="tracker-filters">
                {appFilterGroups.map(f => {
                  const n = filterCount(f.id);
                  return (
                    <button key={f.id} className={`filter-pill ${trackerFilter===f.id?"active":""}`} onClick={()=>setTrackerFilter(f.id)}>
                      {f.label}
                      <span className="filter-count">{n}</span>
                    </button>
                  );
                })}
                <div style={{marginLeft:"auto",display:"flex",gap:4}}>
                  <button className={`apps-sort-btn ${appSort.key==="date"?"active":""}`} onClick={()=>setAppSortKey("date")}>
                    Date {appSort.key==="date" ? (appSort.dir==="desc"?"↓":"↑") : ""}
                  </button>
                  <button className={`apps-sort-btn ${appSort.key==="status"?"active":""}`} onClick={()=>setAppSortKey("status")}>
                    Status {appSort.key==="status" ? (appSort.dir==="desc"?"↓":"↑") : ""}
                  </button>
                </div>
              </div>

              {data.applications.length===0
                ? <div className="section-card"><div className="apps-empty">No applications yet. Click <strong>+ Add application</strong> to start tracking.</div></div>
                : sortedApps.length===0
                  ? <div className="section-card"><div className="apps-empty">No applications match this filter.</div></div>
                  : <div className="apps-list">
                      {/* Column headers */}
                      <div className="tracker-col-headers">
                        <div className="tracker-col-header"/>
                        <div className="tracker-col-header">Company</div>
                        <div className="tracker-col-header">Notes</div>
                        <div className="tracker-col-header" style={{textAlign:"right"}}>Status</div>
                      </div>
                      {sortedApps.map((a) => {
                        const sc = STATUS_COLORS[a.status] || STATUS_COLORS["Applied"];
                        const isEditing = editingAppId === a.id;
                        const ago = timeAgo(a.date);
                        return (
                          <div key={a.id} className={`app-card ${isEditing?"editing":""}`}>
                            <div className="app-preview" onClick={()=>setEditingAppId(isEditing ? null : a.id)}>
                              <AppAvatar app={a}/>
                              <div className="app-preview-info">
                                <div className="app-preview-title">{a.company||<span style={{color:T.light}}>Company</span>}</div>
                                <div className="app-preview-sub">{a.role||<span style={{color:T.light}}>Role</span>}</div>
                                {ago && <div className="app-preview-meta">Applied {ago}</div>}
                              </div>
                              <div className={`app-preview-notes${a.notes?"":" empty"}`}>
                                {a.notes || "+ Add note"}
                              </div>
                              <div className="app-preview-status">
                                <span className="app-status-badge" style={{background:sc.bg,color:sc.color}}>{a.status}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
              }
            </div>
          )}

        </div>
      </div>

      {/* ── App edit drawer ── */}
      {(() => {
        const a = data.applications.find(x => x.id === editingAppId);
        const sc = a ? (STATUS_COLORS[a.status] || STATUS_COLORS["Applied"]) : null;
        const isOpen = !!a;
        return (
          <>
            <div className={`app-drawer-overlay${isOpen?" open":""}`} onClick={()=>setEditingAppId(null)}/>
            <div className={`app-drawer${isOpen?" open":""}`}>
              <div className="app-drawer-header">
                <div className="app-drawer-title">{a?.company || "New Application"}</div>
                <button className="app-drawer-close" onClick={()=>setEditingAppId(null)}>×</button>
              </div>
              {a && (
                <div className="app-drawer-body">
                  <div className="app-drawer-field">
                    <div className="app-drawer-label">Status</div>
                    <select className="field drawer-status-select" style={{background:sc.bg,color:sc.color,fontWeight:700}} value={a.status} onChange={e=>updateApp(a.id,{...a,status:e.target.value})}>
                      {APP_STATUSES.map(s=><option key={s} value={s} style={{background:"#fff",color:T.dark,fontWeight:400}}>{s}</option>)}
                    </select>
                  </div>
                  <div className="app-drawer-field">
                    <div className="app-drawer-label">Company</div>
                    <input className="field" value={a.company} onChange={e=>updateApp(a.id,{...a,company:e.target.value})} placeholder="Company name"/>
                  </div>
                  <div className="app-drawer-field">
                    <div className="app-drawer-label">Role</div>
                    <input className="field" value={a.role} onChange={e=>updateApp(a.id,{...a,role:e.target.value})} placeholder="Role"/>
                  </div>
                  <div className="app-drawer-field">
                    <div className="app-drawer-label">Date Applied</div>
                    <DateField value={a.date} onChange={e=>updateApp(a.id,{...a,date:e.target.value})}/>
                  </div>
                  <div className="app-drawer-field">
                    <div className="app-drawer-label">Job URL</div>
                    <input className="field" value={a.url} onChange={e=>updateApp(a.id,{...a,url:e.target.value})} placeholder="https://…"/>
                  </div>
                  <div className="app-drawer-field">
                    <div className="app-drawer-label">Notes</div>
                    <textarea className="field app-drawer-notes" value={a.notes} onChange={e=>updateApp(a.id,{...a,notes:e.target.value})} placeholder="Any notes…"/>
                  </div>
                </div>
              )}
              <div className="app-drawer-footer">
                <button className="app-drawer-save" onClick={()=>setEditingAppId(null)}>Save info</button>
                <button className="app-drawer-delete" onClick={()=>{deleteApp(editingAppId);setEditingAppId(null);}}>Delete</button>
              </div>
            </div>
          </>
        );
      })()}

      <div className="print-only">
        <ResumePreview data={data}/>
      </div>
      <div className="cl-print-only">
        <CoverLetterPreview clData={clData} contact={data.contact} authorName={data.name}/>
      </div>
    </>
  );
}
