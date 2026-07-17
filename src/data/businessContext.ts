export interface BusinessContext {
  capitalCop: number;
  monthlyBurnCop: number;
  runwayDays: number;
  clientsTargetQ3: number;
  clientsClosed: number;
  wuunderDeadline: string;
  wuunderDaysLeft: number;
  meta5Year: {
    targetMrr: string;
    currentMrr: string;
    targetClients: number;
    currentClients: number;
    horizon: string;
    q3MrrTarget: string;
    foundationYear: string;
    teamTarget: number;
  };
}

export function getBusinessContext(): BusinessContext {
  const capitalCop = 5_000_000;
  const monthlyBurnCop = 450_000;
  const runwayDays = Math.floor((capitalCop / monthlyBurnCop) * 30);

  const wuunderDeadline = "2026-07-31";
  const deadline = new Date(wuunderDeadline);
  const now = new Date();
  const wuunderDaysLeft = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return {
    capitalCop,
    monthlyBurnCop,
    runwayDays,
    clientsTargetQ3: 3,
    clientsClosed: 0,
    wuunderDeadline,
    wuunderDaysLeft,
    meta5Year: {
      targetMrr: "$50M COP/mes",
      currentMrr: "$0",
      targetClients: 50,
      currentClients: 0,
      horizon: "2026 → 2031",
      q3MrrTarget: "$12M COP/mes",
      foundationYear: "2026",
      teamTarget: 7,
    },
  };
}

export function formatCop(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}
