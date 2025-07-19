export function Card({children}: {children: React.ReactNode}) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}