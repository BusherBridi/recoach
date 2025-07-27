export function StatLine({ label, children }: { label: string; children: React.ReactNode}) {
  return (
    <div className="stat">
      <div className="stat-title">{label}</div>
      <div className="stat-value">{children}</div>
    </div>
  );
}