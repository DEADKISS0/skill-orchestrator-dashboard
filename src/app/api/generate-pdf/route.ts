import { NextRequest, NextResponse } from "next/server";

// Color palette from optimization_report.py (Brutalismo Estrategico Colombiano)
const COLORS = {
  PITCH: [15, 15, 15],
  PITCH_80: [38, 38, 38],
  VOID: [63, 0, 53],
  EMBER: [206, 61, 31],
  PARCHMENT: [245, 230, 211],
  ASH: [150, 142, 147],
  EMERALD: [46, 204, 113],
  AMBER: [243, 156, 18],
};

export async function POST(request: NextRequest) {
  try {
    const { title, sections, format } = await request.json();

    if (!title || !sections || !Array.isArray(sections)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    // Generate PDF content as HTML (can be converted to PDF later)
    const htmlContent = generateHTMLReport(title, sections);

    return NextResponse.json({
      success: true,
      html: htmlContent,
      title: title,
      sections: sections.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Error generando PDF" }, { status: 500 });
  }
}

function generateHTMLReport(title: string, sections: { title: string; content: string; type: string }[]): string {
  const now = new Date().toLocaleString("es-CO", { dateStyle: "full", timeStyle: "short" });

  let sectionsHTML = sections.map(s => `
    <div class="section">
      <h2>${s.title}</h2>
      <div class="content">${s.content}</div>
    </div>
  `).join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${title} - RR ALIADOS</title>
  <style>
    @page { size: A4; margin: 15mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', Arial, sans-serif;
      background: #0F0F0F;
      color: #F5E6D3;
      line-height: 1.6;
    }
    .cover {
      background: linear-gradient(135deg, #0F0F0F 0%, #3F0035 100%);
      padding: 40px;
      text-align: center;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 4px solid #CE3D1F;
    }
    .cover h1 {
      font-size: 36px;
      color: #F5E6D3;
      margin-bottom: 10px;
      letter-spacing: 2px;
    }
    .cover .subtitle {
      font-size: 18px;
      color: #CE3D1F;
      margin-bottom: 20px;
    }
    .cover .company {
      font-size: 14px;
      color: #968E93;
      margin-top: 30px;
    }
    .cover .date {
      font-size: 12px;
      color: #968E93;
      margin-top: 10px;
    }
    .section {
      padding: 30px 40px;
      border-bottom: 2px solid #3F0035;
    }
    .section h2 {
      font-size: 20px;
      color: #CE3D1F;
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 2px solid #CE3D1F;
    }
    .section .content {
      font-size: 14px;
      color: #F5E6D3;
      line-height: 1.8;
    }
    .section .content p {
      margin-bottom: 12px;
    }
    .section .content ul {
      margin-left: 20px;
      margin-bottom: 12px;
    }
    .section .content li {
      margin-bottom: 8px;
    }
    .section .content strong {
      color: #CE3D1F;
    }
    .footer {
      background: #0F0F0F;
      padding: 20px 40px;
      text-align: center;
      font-size: 11px;
      color: #968E93;
      border-top: 2px solid #3F0035;
    }
    @media print {
      body { background: #0F0F0F !important; color: #F5E6D3 !important; }
      .cover { page-break-after: always; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <h1>${title.toUpperCase()}</h1>
    <div class="subtitle">RR ALIADOS S.A.S. — Reporte Generado por IA</div>
    <div class="company">RR ALIADOS S.A.S. — NIT 902.036.366 — Medellín, Colombia</div>
    <div class="date">${now}</div>
  </div>
  ${sectionsHTML}
  <div class="footer">
    <p>RR ALIADOS S.A.S. — Reporte generado automáticamente por el asistente de IA</p>
    <p>${now} — Brutalismo Estratégico Colombiano</p>
  </div>
</body>
</html>`;
}
