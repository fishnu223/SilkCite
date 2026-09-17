/**
 * Minimal types for the Cloudflare Turnstile widget global. Present only when
 * Turnstile is enabled; the widget is loaded dynamically from
 * challenges.cloudflare.com with the request nonce.
 */
interface TurnstileWidget {
  render(
    element: HTMLElement,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ): string;
  reset(id?: string): void;
}

interface Window {
  turnstile?: TurnstileWidget;
}
