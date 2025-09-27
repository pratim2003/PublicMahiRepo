import { Toaster } from 'react-hot-toast';

import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import homeModel from 'src/lib/modals/home';

import { OverviewAppView } from 'src/sections/overview/app/view';

// ----------------------------------------------------------------------
export const revalidate = false;
export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default async function Page() {
  await connect();
  const data = await homeModel.findOne();

  if (!data) {
    return <div>No home data found</div>;
  }
  return (
    <>
      <OverviewAppView homeData={data} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
