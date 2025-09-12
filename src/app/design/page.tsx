import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import { DesignModel } from 'src/lib/modals/design';

import { DesignView } from 'src/sections/design/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Design | ${CONFIG.appName}` };

export default async function Page() {
  await connect();

  const data = await DesignModel.find().lean();
  console.log(data);

  if (!data || data.length === 0) {
    return <div>No broadcast data found</div>;
  }

  return <DesignView broadcastData={data} />;
}
