import { Toaster } from 'react-hot-toast';

import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import photoModel from 'src/lib/modals/photoJounalism';

import { OverviewAnalyticsView } from 'src/sections/overview/analytics/view';

// ----------------------------------------------------------------------
export const revalidate = false;
export const metadata = { title: `PhotoJournalism | Dashboard - ${CONFIG.appName}` };

export default async function Page() {
 const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/photojournalism`, {
      cache: 'force-cache',
      next: { revalidate: 5 },
    });
    const data = await res.json();
  if (!data) {
    return <div>No home data found</div>;
  }
  return (
    <>
      <OverviewAnalyticsView journalismData={data.data} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
