"use client";
import { useState } from "react";

export default function AmazonWidget() {
  const products = [
    { name: "Audífonos Bluetooth Pro", price: "$89.99", rank: "#12", reviews: "2,341", trend: "+15%" },
    { name: "Mouse Ergonómico XL", price: "$34.99", rank: "#5", reviews: "892", trend: "+8%" },
    { name: "Webcam 4K Ultra", price: "$129.99", rank: "#23", reviews: "456", trend: "-3%" },
    { name: "Teclado Mecánico RGB", price: "$79.99", rank: "#8", reviews: "1,567", trend: "+22%" },
  ];
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🛒</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Amazon Competitor Analyzer</h3>
        <span className="skill-badge active">amazon-competitor-analyzer</span>
      </div>
      <table className="table-dark">
        <thead><tr><th>Producto</th><th>Precio</th><th>Rank</th><th>Reviews</th><th>Trend</th></tr></thead>
        <tbody>{products.map((p,i) => (
          <tr key={i}>
            <td style={{color:"var(--text-primary)"}}>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.rank}</td>
            <td>{p.reviews}</td>
            <td style={{color: p.trend.startsWith("+")?"var(--success)":"var(--danger)"}}>{p.trend}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
