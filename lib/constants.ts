export const PROVINCES = [
  { name: 'Eastern Cape', value: 'eastern-cape' },
  { name: 'Free State', value: 'free-state' },
  { name: 'Gauteng', value: 'gauteng' },
  { name: 'KwaZulu-Natal', value: 'kwa-zulu-natal' },
  { name: 'Limpopo', value: 'limpopo' },
  { name: 'Mpumalanga', value: 'mpumalanga' },
  { name: 'Northern Cape', value: 'northern-cape' },
  { name: 'North West', value: 'north-west' },
  { name: 'Western Cape', value: 'western-cape' }
] as const;

export type Province = typeof PROVINCES[number]['value']; 