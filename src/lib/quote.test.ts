import { PICKUP_ZONES } from '../config';
import { products } from '../data/products';
import {
  calculateQuote,
  formatUSD,
  getDateInputValue,
  getPaymentAmounts,
  isPastDateInput,
  sanitizeTravelerCounts
} from './quote';

const assertEqual = <T,>(actual: T, expected: T, message: string) => {
  if (actual !== expected) {
    throw new Error(`${message}. Expected ${String(expected)}, received ${String(actual)}`);
  }
};

const saona = products.find((product) => product.id === 'saona');
if (!saona) throw new Error('Saona product fixture is required');

const quote = calculateQuote(
  saona,
  'classic',
  { adults: 2, children: 1, infants: 1 },
  'Bayahibe',
  PICKUP_ZONES
);

assertEqual(quote.adultSubtotal, 170, 'adult subtotal uses adult unit price');
assertEqual(quote.childSubtotal, 40, 'child subtotal uses child unit price');
assertEqual(quote.infantSubtotal, 0, 'infants remain free');
assertEqual(quote.pickupSurcharge, 45, 'pickup surcharge applies only to paying travelers');
assertEqual(quote.totalPrice, 255, 'total includes travelers and pickup surcharge');
assertEqual(quote.depositAmount, 127.5, 'deposit is exactly 50 percent');
assertEqual(quote.balanceAfterDeposit, 127.5, 'deposit balance is exactly 50 percent');

const depositPayment = getPaymentAmounts(quote, 'deposit');
assertEqual(depositPayment.amountDueNow, 127.5, 'deposit option pays 50 percent now');
assertEqual(depositPayment.balanceDueAtDestination, 127.5, 'deposit option leaves 50 percent balance');

const fullPayment = getPaymentAmounts(quote, 'full');
assertEqual(fullPayment.amountDueNow, 255, 'full payment pays total now');
assertEqual(fullPayment.balanceDueAtDestination, 0, 'full payment leaves no destination balance');

const clamped = sanitizeTravelerCounts({ adults: -8, children: 99, infants: Number.NaN });
assertEqual(clamped.adults, 1, 'adults clamp to minimum');
assertEqual(clamped.children, 30, 'children clamp to maximum');
assertEqual(clamped.infants, 0, 'invalid infants clamp to minimum');

assertEqual(formatUSD(127.5), 'US$127.50', 'formatUSD preserves cents when needed');
assertEqual(formatUSD(255), 'US$255', 'formatUSD omits cents for whole dollar values');
assertEqual(getDateInputValue(new Date('2026-06-29T12:00:00')), '2026-06-29', 'date input format is local yyyy-mm-dd');
assertEqual(isPastDateInput('2026-06-28', new Date('2026-06-29T12:00:00')), true, 'past dates are rejected');
assertEqual(isPastDateInput('2026-06-29', new Date('2026-06-29T12:00:00')), false, 'today is accepted');

console.log('Quote engine tests passed');

