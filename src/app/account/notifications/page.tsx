import { NotificationPreferencesForm } from "@/components/account/notification-preferences-form";
import { requireUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type Preferences = {
  booking: boolean;
  messages: boolean;
  marketing: boolean;
};

function readPreferences(value: unknown): Preferences {
  const source =
    typeof value === "object" && value !== null
      ? (value as Record<string, unknown>)
      : {};

  return {
    booking: source.booking !== false,
    messages: source.messages !== false,
    marketing: source.marketing === true,
  };
}

export default async function NotificationsPage() {
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("user_profiles")
    .select("notification_preferences")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-2xl font-semibold">Meldingen</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Kies welke e-mails en accountmeldingen je wilt ontvangen.
        </p>
      </div>
      <NotificationPreferencesForm
        preferences={readPreferences(data?.notification_preferences)}
      />
    </div>
  );
}
