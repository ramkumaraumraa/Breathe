import { Linking, Share } from 'react-native';

export function cleanWhatsAppPhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${cleanWhatsAppPhone(phone)}?text=${encodeURIComponent(message)}`;
}

export async function openWhatsAppMessage(phone: string, message: string): Promise<boolean> {
  const url = buildWhatsAppUrl(phone, message);
  const supported = await Linking.canOpenURL(url);
  if (!supported) return false;
  await Linking.openURL(url);
  return true;
}

export function buildWhatsAppShareUrl(message: string): string {
  return `whatsapp://send?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp with `message` pre-filled and lets the user choose the chat. This is the only
 * way to reach a *group*: wa.me addresses a phone number, and WhatsApp exposes no group deep
 * link at all — so the group is picked inside WhatsApp, by the user, every time.
 *
 * ponytail: deliberately no canOpenURL() guard. Android 11+ package visibility makes
 * canOpenURL('whatsapp://…') return false unless the manifest declares a <queries> entry, which
 * app.json cannot express without a config plugin + native rebuild. startActivity is not subject
 * to that filtering, so openURL works and simply throws when WhatsApp is absent — which is
 * exactly the case the Share fallback handles. Add the <queries> plugin only if we ever need to
 * *detect* WhatsApp rather than just launch it.
 *
 * Returns 'whatsapp' when WhatsApp opened directly, 'share' when the OS share sheet stood in.
 */
export async function shareToWhatsApp(message: string): Promise<'whatsapp' | 'share'> {
  try {
    await Linking.openURL(buildWhatsAppShareUrl(message));
    return 'whatsapp';
  } catch {
    await Share.share({ message });
    return 'share';
  }
}
