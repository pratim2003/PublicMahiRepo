import { Toaster } from 'react-hot-toast';

import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import { DesignModel } from 'src/lib/modals/design';

import { OverviewBankingView } from 'src/sections/overview/banking/view';
// ----------------------------------------------------------------------
export const revalidate = false;
export const metadata = { title: `Design | Dashboard - ${CONFIG.appName}` };

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/design`, {
      cache: 'force-cache',
      next: { revalidate: 5 },
    });
    const data = await res.json();

  if (!data || data.length === 0) {
    return <div>No Design data found</div>;
  }
  return (
    <>
      <OverviewBankingView designData={data.designs} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
