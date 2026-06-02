export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-8 w-64 rounded-full bg-muted" />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-72 rounded-2xl bg-muted" />
        ))}
      </div>
    </main>
  );
}
