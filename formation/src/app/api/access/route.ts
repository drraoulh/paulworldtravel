import { accessStatus } from '@/lib/ai/access';

// What the signed-in candidate can use: plan (trial, active pack, staff) and remaining AI tries.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = await accessStatus();
    return Response.json(status ? { signedIn: true, ...status } : { signedIn: false }, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    console.error('Access status failed', error);
    return Response.json({ signedIn: false, error: 'unavailable' }, { status: 500 });
  }
}
