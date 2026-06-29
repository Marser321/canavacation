const PAYMENT_URL_KEYS = ['paymentUrl', 'checkoutUrl', 'invoiceUrl', 'payment_link', 'paymentLink', 'url', 'link'];

const isHttpUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
};

export const extractPaymentUrl = (payload: unknown): string | null => {
  if (!payload || typeof payload !== 'object') return null;

  const record = payload as Record<string, unknown>;
  for (const key of PAYMENT_URL_KEYS) {
    const value = record[key];
    if (isHttpUrl(value)) return value;
  }

  for (const value of Object.values(record)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        const nestedUrl = extractPaymentUrl(item);
        if (nestedUrl) return nestedUrl;
      }
    } else if (value && typeof value === 'object') {
      const nestedUrl = extractPaymentUrl(value);
      if (nestedUrl) return nestedUrl;
    }
  }

  return null;
};

export const readWebhookResponse = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return isHttpUrl(text.trim()) ? { url: text.trim() } : { message: text };
  }
};

