"use client";

import { Camera, Upload } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  uploadAvatarAction,
  type AuthActionState,
} from "@/lib/auth-actions";

const initialState: AuthActionState = {};

export function AvatarUploader({
  avatarUrl,
  fullName,
}: {
  avatarUrl: string | null;
  fullName: string;
}) {
  const [state, action, pending] = useActionState(
    uploadAvatarAction,
    initialState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl],
  );

  return (
    <form action={action} className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-2xl font-semibold">
        {previewUrl || avatarUrl ? (
          // Signed Supabase URLs and local object URLs are intentionally rendered directly.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl ?? avatarUrl ?? ""}
            alt={`Profielfoto van ${fullName}`}
            className="size-full object-cover"
          />
        ) : (
          <Camera className="size-8 text-muted-foreground" />
        )}
      </div>
      <div className="grid gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <Upload className="size-4" />
          Kies een profielfoto
          <input
            name="avatar"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setPreviewUrl(file ? URL.createObjectURL(file) : null);
            }}
            required
          />
        </label>
        <p className="text-xs text-muted-foreground">
          JPG, PNG of WebP. Maximaal 5 MB.
        </p>
        <Button type="submit" variant="outline" className="w-fit" disabled={pending}>
          {pending ? "Uploaden..." : "Foto opslaan"}
        </Button>
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
    </form>
  );
}
