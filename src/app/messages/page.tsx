import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const user = await requireUser();
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: user.id }, { recipientId: user.id }]
    },
    include: {
      sender: { select: { name: true, email: true } },
      recipient: { select: { name: true, email: true } },
      listing: { select: { title: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Berichten</h1>
      <p className="mt-2 text-muted-foreground">Je ziet alleen gesprekken waarbij jij huurder of verhuurder bent.</p>
      <div className="mt-6 grid gap-4">
        {messages.length ? messages.map((message) => (
          <article key={message.id} className="rounded-2xl bg-white p-5 ring-1 ring-border">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{message.listing?.title ?? "Algemeen bericht"}</p>
                <p className="text-sm text-muted-foreground">
                  {message.senderId === user.id ? `Aan ${message.recipient.name}` : `Van ${message.sender.name}`} · {message.createdAt.toLocaleString("nl-NL")}
                </p>
              </div>
            </div>
            <p className="mt-4 rounded-xl bg-muted p-4 text-sm leading-6">{message.body}</p>
          </article>
        )) : (
          <div className="rounded-2xl bg-white p-6 text-muted-foreground ring-1 ring-border">Je hebt nog geen berichten.</div>
        )}
      </div>
    </main>
  );
}
