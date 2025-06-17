// app/category/[province]/page.tsx
import { Metadata } from 'next';
import ProvinceClient from './ProvinceClient';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ province: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  // satisfy ESLint by referencing searchParams
  await searchParams;

  const { province } = await params;
  const provinceName = province
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${provinceName} Listings`,
    description: `Browse properties in ${provinceName}`,
  };
}

export default async function ProvincePage({
  params,
  searchParams,
}: {
  params: Promise<{ province: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // again, use it so ESLint is satisfied
  await searchParams;

  const { province } = await params;
  return <ProvinceClient province={province} />;
}
