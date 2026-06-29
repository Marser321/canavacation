import type { PlanKey, Product } from '../data/products';
import type { PickupZone } from '../config';

export type PaymentChoice = 'deposit' | 'full';

export interface TravelerCounts {
  adults: number;
  children: number;
  infants: number;
}

export interface QuoteBreakdown extends TravelerCounts {
  productId: string;
  plan: PlanKey;
  pickupZone: string;
  adultUnitPrice: number;
  childUnitPrice: number;
  infantUnitPrice: number;
  adultSubtotal: number;
  childSubtotal: number;
  infantSubtotal: number;
  travelerSubtotal: number;
  payingTravelers: number;
  totalTravelers: number;
  pickupSurchargePerTraveler: number;
  pickupSurcharge: number;
  totalPrice: number;
  depositAmount: number;
  fullPaymentAmount: number;
  balanceAfterDeposit: number;
}

export interface PaymentAmounts {
  choice: PaymentChoice;
  amountDueNow: number;
  balanceDueAtDestination: number;
}

export const TRAVELER_LIMITS = {
  adults: { min: 1, max: 30 },
  children: { min: 0, max: 30 },
  infants: { min: 0, max: 10 }
} as const;

export const clampNumber = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.trunc(value)));
};

export const parseClampedNumber = (value: string, min: number, max: number): number => {
  return clampNumber(Number.parseInt(value, 10), min, max);
};

export const sanitizeTravelerCounts = (counts: Partial<TravelerCounts>): TravelerCounts => ({
  adults: clampNumber(counts.adults ?? TRAVELER_LIMITS.adults.min, TRAVELER_LIMITS.adults.min, TRAVELER_LIMITS.adults.max),
  children: clampNumber(counts.children ?? TRAVELER_LIMITS.children.min, TRAVELER_LIMITS.children.min, TRAVELER_LIMITS.children.max),
  infants: clampNumber(counts.infants ?? TRAVELER_LIMITS.infants.min, TRAVELER_LIMITS.infants.min, TRAVELER_LIMITS.infants.max)
});

export const roundMoney = (amount: number): number => Math.round((amount + Number.EPSILON) * 100) / 100;

export const formatUSD = (amount: number): string => {
  const rounded = roundMoney(amount);
  const hasCents = !Number.isInteger(rounded);

  return `US$${rounded.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2
  })}`;
};

export const calculateQuote = (
  product: Product,
  plan: PlanKey,
  travelers: Partial<TravelerCounts>,
  pickupZoneName: string,
  pickupZones: PickupZone[]
): QuoteBreakdown => {
  const safeTravelers = sanitizeTravelerCounts(travelers);
  const pricing = product.pricing[plan];
  const fallbackZone = pickupZones[0];
  const activeZone = pickupZones.find((zone) => zone.name === pickupZoneName) ?? fallbackZone;
  const payingTravelers = safeTravelers.adults + safeTravelers.children;
  const totalTravelers = payingTravelers + safeTravelers.infants;

  const adultSubtotal = roundMoney(safeTravelers.adults * pricing.adult);
  const childSubtotal = roundMoney(safeTravelers.children * pricing.child);
  const infantSubtotal = roundMoney(safeTravelers.infants * pricing.infant);
  const travelerSubtotal = roundMoney(adultSubtotal + childSubtotal + infantSubtotal);
  const pickupSurcharge = roundMoney(payingTravelers * activeZone.surcharge);
  const totalPrice = roundMoney(travelerSubtotal + pickupSurcharge);
  const depositAmount = roundMoney(totalPrice * 0.5);

  return {
    productId: product.id,
    plan,
    pickupZone: activeZone.name,
    adults: safeTravelers.adults,
    children: safeTravelers.children,
    infants: safeTravelers.infants,
    adultUnitPrice: pricing.adult,
    childUnitPrice: pricing.child,
    infantUnitPrice: pricing.infant,
    adultSubtotal,
    childSubtotal,
    infantSubtotal,
    travelerSubtotal,
    payingTravelers,
    totalTravelers,
    pickupSurchargePerTraveler: activeZone.surcharge,
    pickupSurcharge,
    totalPrice,
    depositAmount,
    fullPaymentAmount: totalPrice,
    balanceAfterDeposit: roundMoney(totalPrice - depositAmount)
  };
};

export const getPaymentAmounts = (quote: QuoteBreakdown, choice: PaymentChoice): PaymentAmounts => ({
  choice,
  amountDueNow: choice === 'full' ? quote.fullPaymentAmount : quote.depositAmount,
  balanceDueAtDestination: choice === 'full' ? 0 : quote.balanceAfterDeposit
});

export const getDateInputValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getTodayDateInputValue = (): string => getDateInputValue(new Date());

export const parseLocalDateInput = (value: string): Date | null => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const isPastDateInput = (value: string, today = new Date()): boolean => {
  const parsed = parseLocalDateInput(value);
  if (!parsed) return false;

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return parsed.getTime() < todayStart.getTime();
};

