import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import { broadcatModel } from 'src/lib/modals/broadcast';

import { BroadcastView } from 'src/sections/broadcast/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Broadcast | ${CONFIG.appName}` };

export default async function Page() {
  await connect();

  const data = await broadcatModel.find().lean();
  console.log(data);

  if (!data || data.length === 0) {
    return <div>No broadcast data found</div>;
  }

  return <BroadcastView broadcastData={data} />;
}
