"use client";
import { useState } from "react";
import { getEventsForDay, CalendarEvent } from "@/data/calendarEvents";

const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

export default function CalendarWidget() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  const typeColors: Record<string, string> = {
    report: "var(--accent)",
    deploy: "var(--success)",
    deadline: "var(--danger)",
    meeting: "var(--warning)",
  };

  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📅</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Calendario</h3>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="text-xs px-2 py-1 rounded" style={{ color: "var(--text-muted)", background: "var(--bg-secondary)" }}>◀</button>
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{MONTHS[currentMonth]} {currentYear}</span>
        <button onClick={nextMonth} className="text-xs px-2 py-1 rounded" style={{ color: "var(--text-muted)", background: "var(--bg-secondary)" }}>▶</button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold py-1" style={{ color: "var(--text-muted)" }}>{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const events = getEventsForDay(dateStr);
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(dateStr)}
              className="relative text-center text-xs py-1 rounded transition-colors"
              style={{
                background: isSelected ? "var(--accent)" : isToday ? "var(--bg-card-hover)" : "transparent",
                color: isSelected ? "white" : "var(--text-primary)",
                fontWeight: isToday ? "bold" : "normal",
              }}
            >
              {day}
              {events.length > 0 && (
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {events.slice(0, 2).map((e, j) => (
                    <div key={j} className="w-1 h-1 rounded-full" style={{ background: typeColors[e.type] || "var(--text-muted)" }} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Event details */}
      {selectedDate && (
        <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
          <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Eventos del {selectedDate}
          </div>
          {selectedEvents.length === 0 ? (
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Sin eventos</p>
          ) : (
            <div className="space-y-1">
              {selectedEvents.map(e => (
                <div key={e.id} className="flex items-center gap-2 text-[11px]">
                  <div className="w-2 h-2 rounded-full" style={{ background: typeColors[e.type] || "var(--text-muted)" }} />
                  <span style={{ color: "var(--text-primary)" }}>{e.title}</span>
                  {e.recurring && (
                    <span className="text-[9px] px-1 rounded" style={{ background: "var(--border)", color: "var(--text-muted)" }}>
                      {e.recurring}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1 text-[9px]" style={{ color: "var(--text-muted)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}
