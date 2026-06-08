import { AvatarUploader } from "@/components/account/avatar-uploader";
import {
  ProfileForm,
  type ProfileFormValues,
} from "@/components/account/profile-form";
import { requireUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const user = await requireUser();
  const supabase = await createServerSupabaseClient();
  const [{ data: account }, { data: profile }] = await Promise.all([
    supabase
      .from("users")
      .select("full_name, phone, locale")
      .eq("id", user.id)
      .single(),
    supabase
      .from("user_profiles")
      .select("date_of_birth, country, language, bio, preferred_currency")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const values: ProfileFormValues = {
    fullName: account?.full_name ?? user.fullName,
    phone: account?.phone ?? "",
    dateOfBirth: profile?.date_of_birth ?? "",
    country: profile?.country ?? "",
    language: profile?.language ?? account?.locale ?? "nl",
    bio: profile?.bio ?? "",
    preferredCurrency: profile?.preferred_currency ?? "EUR",
  };

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-2xl font-semibold">Persoonlijk profiel</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Deze gegevens worden gebruikt voor je boekingen en communicatie.
        </p>
      </div>
      <section className="rounded-xl border border-border bg-white p-5 sm:p-6">
        <AvatarUploader avatarUrl={user.avatarUrl} fullName={user.fullName} />
      </section>
      <section className="rounded-xl border border-border bg-white p-5 sm:p-6">
        <ProfileForm values={values} />
      </section>
    </div>
  );
}
