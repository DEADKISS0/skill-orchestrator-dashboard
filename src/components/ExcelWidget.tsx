"use client";
import { useState } from "react";

export default function ExcelWidget() {
  const [formula, setFormula] = useState("=SUM(A1:A10)");
  const [result, setResult] = useState("42,580");
  const data = [
    ["Producto", "Q1", "Q2", "Q3", "Q4"],
    ["Consultoría", "12,000", "15,000", "18,000", "22,000"],
    ["Desarrollo", "8,000", "11,000", "14,000", "16,000"],
    ["Soporte", "3,000", "4,000", "5,000", "6,000"],
    ["TOTAL", "23,000", "30,000", "37,000", "44,000"],
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📊</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Excel Widget</h3>
        <span className="skill-badge active">advanced-excel-spreadsheet</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>fx</span>
        <input className="input-dark flex-1" value={formula} onChange={(e) => setFormula(e.target.value)} />
        <button className="btn-primary text-xs" onClick={() => setResult(String(Math.floor(Math.random() * 100000)))}>=</button>
        <span className="text-sm font-mono font-semibold" style={{ color: "var(--accent)" }}>{result}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table-dark">
          <thead><tr>{data[0].map((h,i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>{data.slice(1).map((row,i) => (
            <tr key={i} className={i===data.length-2 ? "font-semibold" : ""}>
              {row.map((cell,j) => <td key={j} style={j===0?{color:"var(--text-primary)"}:{}}>{cell}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
