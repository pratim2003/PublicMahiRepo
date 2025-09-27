// import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
// import { DesignModel } from 'src/lib/modals/design';

import { DesignView } from 'src/sections/design/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Design | ${CONFIG.appName}` };

export const revalidate = false; // no revalidation, true static build

export default async function Page() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/design`, {
      cache: 'force-cache',
      // next: { revalidate: 30 },
    });
    const data = await res.json();
    if (!data) {
      return <div>No home data found</div>;
    }
    return <DesignView broadcastData={data.designs} />;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
