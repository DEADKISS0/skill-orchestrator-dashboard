"use client";
import { useState, useEffect, useCallback } from "react";

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastCheck, setLastCheck] = useState<string>("");

  const fetchNotifications = useCallback(async () => {
    try {
      // Check for new reports
      const [predRes, stratRes] = await Promise.all([
        fetch("/reports/predicciones_index.json").then(r => r.json()).catch(() => ({ reports: [] })),
        fetch("/reports/estrategicos_index.json").then(r => r.json()).catch(() => ({ reports: [] })),
      ]);

      const newNotifications: Notification[] = [];

      if (predRes.reports?.length > 0) {
        const latest = predRes.reports[0];
        const reportTime = new Date(latest.date.replace(/(\d{4})-(\d{2})-(\d{2})_(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:00"));
        if (Date.now() - reportTime.getTime() < 3600000) { // Last hour
          newNotifications.push({
            id: `pred-${latest.date}`,
            message: `Nuevo reporte de predicciones: ${latest.label}`,
            type: "success",
            timestamp: reportTime,
            read: false,
          });
        }
      }

      if (stratRes.reports?.length > 0) {
        const latest = stratRes.reports[0];
        const reportTime = new Date(latest.date.replace(/(\d{4})-(\d{2})-(\d{2})_(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:00"));
        if (Date.now() - reportTime.getTime() < 3600000) { // Last hour
          newNotifications.push({
            id: `strat-${latest.date}`,
            message: `Nuevo reporte estratégico: ${latest.label}`,
            type: "success",
            timestamp: reportTime,
            read: false,
          });
        }
      }

      // Add info notification about dashboard status
      newNotifications.push({
        id: "status",
        message: "Dashboard activo - Todos los sistemas operativos",
        type: "info",
        timestamp: new Date(),
        read: false,
      });

      setNotifications(newNotifications);
      setLastCheck(new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }));
    } catch (e) {
      console.error("Error fetching notifications:", e);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const typeColors: Record<string, string> = {
    info: "var(--accent)",
    success: "var(--success)",
    warning: "var(--warning)",
    error: "var(--danger)",
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm px-2 py-1 rounded transition-colors hover:bg-white/10 relative"
        style={{ color: "var(--text-muted)", background: "var(--bg-secondary)" }}
        title="Notificaciones"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
            style={{ background: "var(--danger)", color: "white" }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl shadow-2xl z-50 overflow-hidden"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Notificaciones</span>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-[10px] px-2 py-0.5 rounded"
                style={{ color: "var(--accent)", background: "var(--bg-card)" }}>
                Marcar todo como leído
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-xs" style={{ color: "var(--text-muted)" }}>
                Sin notificaciones
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className="px-4 py-3 border-b cursor-pointer transition-colors hover:bg-white/5"
                  style={{
                    borderColor: "var(--border)",
                    opacity: n.read ? 0.6 : 1,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: typeColors[n.type] }} />
                    <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      {n.message}
                    </span>
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                    {n.timestamp.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))
            )}
          </div>

          {lastCheck && (
            <div className="px-4 py-2 text-[10px] text-right border-t" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              Última verificación: {lastCheck}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
