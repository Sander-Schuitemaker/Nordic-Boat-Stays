"use client";

import { Send } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  markConversationReadAction,
  sendMessageAction,
  type AuthActionState,
} from "@/lib/auth-actions";

const initialState: AuthActionState = {};

export function MarkConversationRead({
  conversationId,
}: {
  conversationId: string;
}) {
  useEffect(() => {
    void markConversationReadAction(conversationId);
  }, [conversationId]);

  return null;
}

export function ConversationForm({
  conversationId,
}: {
  conversationId: string;
}) {
  const [state, action, pending] = useActionState(
    sendMessageAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      formRef.current?.reset();
    }
  }, [state.message]);

  return (
    <form ref={formRef} action={action} className="grid gap-3 border-t border-border pt-5">
      <input type="hidden" name="conversationId" value={conversationId} />
      <textarea
        name="body"
        rows={4}
        maxLength={10000}
        placeholder="Schrijf een bericht..."
        className="w-full resize-y rounded-xl border border-border bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        required
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          {state.error ? (
            <p role="alert" className="text-sm text-red-700">
              {state.error}
            </p>
          ) : null}
          {state.message ? (
            <p role="status" className="text-sm text-emerald-800">
              {state.message}
            </p>
          ) : null}
        </div>
        <Button type="submit" disabled={pending}>
          <Send className="size-4" />
          {pending ? "Versturen..." : "Versturen"}
        </Button>
      </div>
    </form>
  );
}
