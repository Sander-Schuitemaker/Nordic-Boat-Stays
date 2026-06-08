import { MessageSquare, Ship } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { getMyConversations } from "@/lib/account-data";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const conversations = await getMyConversations();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Berichten</h1>
      <p className="mt-2 text-muted-foreground">Je ziet alleen gesprekken waarbij jij huurder of verhuurder bent.</p>
      <div className="mt-6 grid gap-4">
        {conversations.length ? conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={`/messages/${conversation.id}`}
            className="flex gap-4 rounded-xl border border-border bg-white p-5 transition hover:border-foreground/25 hover:shadow-lg"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted">
              <Ship className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-start justify-between gap-4">
                <span>
                  <span className="block font-semibold">{conversation.listingTitle}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {conversation.counterpartLabel}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(conversation.lastMessageAt).toLocaleDateString("nl-NL")}
                </span>
              </span>
              <span className="mt-3 flex items-center justify-between gap-3">
                <span className="truncate text-sm text-muted-foreground">
                  {conversation.lastMessage ?? "Nog geen berichten in dit gesprek."}
                </span>
                {conversation.unreadCount ? (
                  <Badge>{conversation.unreadCount} nieuw</Badge>
                ) : null}
              </span>
            </span>
          </Link>
        )) : (
          <div className="grid justify-items-start gap-4 rounded-xl border border-border bg-white p-7 text-muted-foreground">
            <MessageSquare className="size-6" />
            <p>Je hebt nog geen gesprekken.</p>
            <Link href="/search" className="font-semibold text-foreground hover:underline">
              Zoek een verblijf
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
