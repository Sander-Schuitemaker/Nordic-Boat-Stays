import { ArrowLeft, Ship } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ConversationForm,
  MarkConversationRead,
} from "@/components/account/conversation-form";
import { Button } from "@/components/ui/button";
import { getMyConversation } from "@/lib/account-data";

type ConversationPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const { id } = await params;
  const conversation = await getMyConversation(id);

  if (!conversation) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <MarkConversationRead conversationId={conversation.id} />
      <Button asChild variant="ghost" className="mb-5">
        <Link href="/messages">
          <ArrowLeft className="size-4" />
          Alle gesprekken
        </Link>
      </Button>
      <section className="overflow-hidden rounded-xl border border-border bg-white">
        <header className="flex items-center gap-4 border-b border-border p-5 sm:p-6">
          <span className="flex size-11 items-center justify-center rounded-full bg-muted">
            <Ship className="size-5" />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold">
              {conversation.listingTitle}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gesprek met {conversation.counterpartLabel.toLowerCase()}
            </p>
          </div>
        </header>
        <div className="grid max-h-[58vh] gap-4 overflow-y-auto p-5 sm:p-6">
          {conversation.messages.length ? (
            conversation.messages.map((message) => (
              <article
                key={message.id}
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-6 ${
                  message.isMine
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p>{message.body}</p>
                <time
                  className={`mt-2 block text-xs ${
                    message.isMine ? "text-white/65" : "text-muted-foreground"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleString("nl-NL")}
                </time>
              </article>
            ))
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Start het gesprek met een bericht.
            </p>
          )}
        </div>
        <div className="p-5 sm:p-6">
          <ConversationForm conversationId={conversation.id} />
        </div>
      </section>
    </main>
  );
}
