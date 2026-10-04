import { redirect } from 'next/navigation';

export default async function ScorpEstimatorRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/s-corp-tax-advantage`);
}
