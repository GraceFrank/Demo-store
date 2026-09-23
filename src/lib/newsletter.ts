const DISPOSABLE_DOMAINS = ["mailinator.com", "tempmail.com", "10minutemail.com"];

export function validateSignupEmail(email: string): string | null {
  const [, domain] = email.trim().split("@");
  if (domain && DISPOSABLE_DOMAINS.includes(domain.toLowerCase())) {
    return "Please use a permanent email address.";
  }
  return null;
}
