export default function AccountLoading() {
  return (
    <div className="grid animate-pulse gap-5">
      <div className="h-40 rounded-xl bg-muted" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-44 rounded-xl bg-muted" />
        <div className="h-44 rounded-xl bg-muted" />
        <div className="h-44 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
