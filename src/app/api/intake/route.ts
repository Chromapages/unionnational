import { NextResponse } from 'next/server';

/**
 * Strategy Intake API Route
 * Implements Lead Scoring & Routing based on Funnel Map (07) and CRM Pipeline (08)
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Log for monitoring (In production, replace with CRM integration)
    console.log('--- Strategic Lead Received ---');
    console.log(`Name: ${data.firstName} ${data.lastName}`);
    console.log(`Company: ${data.companyName}`);
    console.log(`Revenue: ${data.revenueRange}`);
    console.log(`Industry: ${data.industry}`);
    console.log(`Primary Pain: ${data.primaryPainPoint}`);

    // 2. Performance-Based Qualification Scoring (CRM Pipeline 08 Standard)
    let score = 0;

    // Revenue Scoring (+3 to +5)
    if (['$5M+'].includes(data.revenueRange)) score += 5;
    else if (['$1M-$5M'].includes(data.revenueRange)) score += 4;
    else if (['$500k-$1M'].includes(data.revenueRange)) score += 3;
    else if (['$100k-$500k'].includes(data.revenueRange)) score += 1;

    // Industry Fit (+2)
    if (['Construction', 'Restaurant'].includes(data.industry)) score += 2;

    // Strategic Interest (+2)
    const advisoryServices = ['S-Corp Advantage', 'Fractional CFO Strategy', 'Proactive Tax Planning'];
    const hasAdvisoryInterest = data.servicesOfInterest?.some((s: string) => advisoryServices.includes(s));
    if (hasAdvisoryInterest) score += 2;

    // Entity Advantage Logic
    if (data.entityType === 'LLC (Single)' || data.entityType === 'Sole Proprietorship') {
      score += 2; // Perfect S-Corp conversion wedge
    }

    // Urgency Signal
    if (data.urgency === 'Immediate (This month)') score += 1;

    // Investment Willingness
    if (data.investmentWillingness === 'Yes, ready to invest in strategy') score += 2;

    console.log(`Lead Score: ${score}`);

    // 3. Mapping to CRM Stages & Routing (Funnel Map 07 Sync)
    let crmStage = 'Intake Submitted';
    let redirectUrl = null;

    if (score >= 7) {
      crmStage = 'Qualified - Priority 1';
      redirectUrl = '/book'; // Immediate high-fit calendar push
    } else if (score >= 4) {
      crmStage = 'Qualified - Review Needed';
      redirectUrl = '/book'; // Still push to calendar, but lower internal priority
    } else {
      crmStage = 'New Lead - Nurture';
      redirectUrl = '/thank-you'; // Standard follow-up
    }

    // 4. Return response to trigger client-side routing
    return NextResponse.json({ 
      success: true, 
      message: 'Intake data received and scored',
      score,
      crmStage,
      redirect: redirectUrl
    });

  } catch (error) {
    console.error('Intake Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process intake data' 
    }, { status: 500 });
  }
}
