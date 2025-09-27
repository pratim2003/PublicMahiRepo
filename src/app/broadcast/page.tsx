// import connect from 'src/lib/db';
// import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
// import { broadcatModel } from 'src/lib/modals/broadcast';
// import { broadcatModel } from 'src/lib/modals/broadcast';

import { BroadcastView } from 'src/sections/broadcast/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Broadcast | ${CONFIG.appName}` };

export default async function Page() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/broadcast`, {
      cache: 'force-cache',
      next: { revalidate: false },
    });
    const data = await res.json();
    if (!data) {
      return <div>No home data found</div>;
    }
    console.log(data);
    return <BroadcastView broadcastData={data.designs} />;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
