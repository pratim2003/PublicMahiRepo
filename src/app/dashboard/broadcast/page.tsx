import { Toaster } from 'react-hot-toast';

import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import { broadcatModel } from 'src/lib/modals/broadcast';

import { OverviewBookingView } from 'src/sections/overview/booking/view';
// ----------------------------------------------------------------------

export const metadata = { title: `Broadcast | Dashboard - ${CONFIG.appName}` };

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/broadcast`, {
      cache: 'force-cache',
      next: { revalidate: 5 },
    });
    const data = await res.json();

  if (!data || data.length === 0) {
    return <div>No broadcast data found</div>;
  }
  return (
    <>
      <OverviewBookingView broadcastData={data.designs} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
