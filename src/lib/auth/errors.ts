const accountLoginErrorMessages: Record<string, string> = {
  "account-blocked": "Dit account is geblokkeerd. Neem contact op met support.",
  "account-restricted":
    "Dit account is tijdelijk beperkt. Neem contact op met support.",
  "account-suspended":
    "Dit account is tijdelijk geschorst. Neem contact op met support.",
  "account-deactivated": "Dit account is gedeactiveerd.",
  "account-deleted": "Dit account is niet meer actief.",
  "verification-failed":
    "De verificatielink is ongeldig of verlopen. Vraag een nieuwe link aan.",
};

export function accountLoginErrorMessage(
  code: string | null | undefined,
): string | null {
  if (!code) {
    return null;
  }

  return accountLoginErrorMessages[code] ?? null;
}
