export const CONFIG = {
  whatsappNumber: '18093602625', // RD
  whatsappNumberUS: '17046490329', // US
  ghlWebhookUrl: 'https://services.leadconnectorhq.com/hooks/zU2jWpx2RUpC27gR', // Lead webhook
  ghlPaymentWebhookUrl: 'https://services.leadconnectorhq.com/hooks/zU2jWpx2RUpC27gR', // Exact quote payment workflow
  pixelId: 'YOUR_PIXEL_ID_HERE',
  
  // Refund policy retention rate (10%)
  cancellationFeeRate: 0.10,
  refundRate: 0.90,

  // Operating days: Sunday=0, Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6
  operatingDays: {
    saona: {
      classic: [0, 1, 2, 3, 4, 5, 6], // Daily
      vip: [1, 3, 5, 6] // Mon, Wed, Fri, Sat
    },
    buggy: {
      classic: [0, 1, 2, 3, 4, 5, 6],
      vip: [0, 1, 2, 3, 4, 5, 6]
    },
    party: {
      classic: [0, 1, 2, 3, 4, 5, 6],
      vip: [0, 1, 2, 3, 4, 5, 6]
    },
    'santo-domingo': {
      classic: [0, 1, 2, 3, 4, 5, 6],
      vip: [0, 1, 2, 3, 4, 5, 6]
    }
  }
};

export interface PickupZone {
  name: string;
  surcharge: number;
}

export const PICKUP_ZONES: PickupZone[] = [
  { name: 'Bávaro', surcharge: 0 },
  { name: 'Punta Cana', surcharge: 0 },
  { name: 'Cabeza de Toro', surcharge: 0 },
  { name: 'Arena Gorda', surcharge: 0 },
  { name: 'Macao', surcharge: 0 },
  { name: 'Uvero Alto', surcharge: 0 },
  { name: 'Cap Cana', surcharge: 10 },
  { name: 'Bayahibe', surcharge: 15 }
];
