# 🌊 FloatChat – AI-Powered Conversational Interface for ARGO Ocean Data Discovery & Visualization  

FloatChat is a **frontend web application** designed for **SIH PS-25040 (Ministry of Earth Sciences, MoES)**.  
It provides an **intuitive conversational interface** for querying and visualizing **ARGO float datasets** (temperature, salinity, pressure, etc.), making oceanographic data more **accessible, interactive, and user-friendly** for scientists, students, policymakers, and general users.  

---

## 📑 Table of Contents  
- [Overview](#-overview)  
- [Problem Statement](#-problem-statement)  
- [Objectives](#-objectives)  
- [Proposed Solution](#-proposed-solution)  
- [Key Features](#-key-features)  
- [Architecture & Technologies](#-architecture--technologies)  
- [User Interface & UX](#-user-interface--ux)  
- [Challenges & Risks](#-challenges--risks)  
- [Evaluation & Success Metrics](#-evaluation--success-metrics)  
- [Roadmap & Future Work](#-roadmap--future-work)  
- [References](#-references)  

---

## 🌍 Overview  

ARGO floats generate a wealth of oceanographic data stored in formats like **NetCDF**. However, accessing and making sense of this data is complex for non-expert users.  

FloatChat solves this by providing a **chat-style frontend UI** where users can ask natural language queries like:  

> *“Show me the temperature profiles in the Indian Ocean between 100–200m for the past year.”*  

The system converts the query into structured actions and presents **visualizations** like **charts, maps, heatmaps, and profiles**.  

---

## ❌ Problem Statement  

- Raw ARGO data is stored in **technical formats (NetCDF)** that are difficult for non-experts.  
- Visualization and query building require **specialized tools and knowledge**.  
- Answering even simple natural language questions takes **time and technical skill**.  

---

## 🎯 Objectives  

- **Accessibility:** Enable data access via natural language.  
- **Visualization:** Provide clear maps, profiles, and time series.  
- **Interactivity:** Filtering, drill-downs, comparisons, exports.  
- **Scalability:** Handle large datasets with responsiveness.  
- **Accuracy:** Ensure scientific validity (units, metadata, etc.).  

---

## 💡 Proposed Solution  

FloatChat frontend provides:  
- A **chat-style interface** where users type queries.  
- A **visualization panel** that adapts to the query.  
- **Export options** for data and charts.  
- **Responsive UI** for desktop and mobile.  

---

## 🔑 Key Features  

| Feature | Description |  
|---------|-------------|  
| 💬 Natural Language Querying | Users ask in plain English |  
| 🔎 Data Filtering | Filter by time, depth, region, variables |  
| 📊 Visualization | Time-series, profiles, maps, heatmaps |  
| 📁 File Support | NetCDF-ready (processed backend handles parsing) |  
| ℹ️ Metadata | Show units, variable definitions, source details |  
| ⬇️ Export Options | CSV, JSON, PNG, PDF |  
| ⚡ Responsive & Fast | Optimized frontend rendering |  

---

## 🛠 Architecture & Technologies  

Since this repo is **frontend-only**, the tech stack is:  

- **Framework:** React.js ⚛️  
- **UI Styling:** Tailwind CSS 🎨  
- **State Management:** React Hooks + Context API  
- **Data Visualization:** D3.js / Plotly.js / Chart.js 📊  
- **Animations:** Framer Motion ✨  
- **Icons & UI:** Lucide-react / Shadcn UI  
- **Deployment:** Netlify / Vercel ☁️  

*(Future backend/LLM, data pipelines, and storage are not part of this repo.)*  

---

## 🎨 User Interface & UX  

- **Conversational UI:** Chat bubble design  
- **Visualization Panel:** Auto-switch (map, chart, profile) depending on query  
- **Tooltips & Info Icons:** Explain scientific variables  
- **Loading Indicators:** For large data fetches  
- **Mobile-Friendly:** Optimized for smaller screens  

---

## ⚠️ Challenges & Risks  

- Handling **very large datasets** in real time  
- Avoiding **misinterpretations** from AI models (future integration)  
- Ensuring **scientific accuracy** (units, metadata)  
- **User-friendliness** for non-technical audiences  

---

## 📊 Evaluation & Success Metrics  

- ✅ Query Accuracy – % of correct responses vs benchmarks  
- ✅ Response Time – Average latency per request  
- ✅ User Satisfaction – Feedback from experts & students  
- ✅ Visualization Clarity – Ease of interpretation  
- ✅ System Stability – Reliability under load  

---

## 🛣 Roadmap & Future Work  

| Phase | Deliverables |  
|-------|--------------|  
| Phase 1 (MVP) | Chat UI + Time-series & Depth profiles |  
| Phase 2 | Add map visualizations, filters, export features |  
| Phase 3 | User accounts, dashboards, advanced queries |  
| Phase 4 | Support more datasets, forecasting, multilingual UI |  

---

## 📚 References  

- SIH PS-25040: FloatChat, MoES  
- DRIEMS University – Team Contribution  
- ARGO Float Project & NetCDF Documentation  
- Best practices for RAG pipelines with LLMs  

---

✨ **FloatChat** – Making ocean data **simple, visual, and conversational.** 🌊  
