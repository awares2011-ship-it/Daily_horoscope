export default function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="h-40 rounded-2xl bg-white/5" />
      {/* Cards */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl bg-white/5 p-5 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10" />
            <div className="h-4 w-24 rounded bg-white/10" />
          </div>
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-4/5 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}
