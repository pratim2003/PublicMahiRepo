import { Toaster } from 'react-hot-toast';

import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import { DesignModel } from 'src/lib/modals/design';

import { OverviewBankingView } from 'src/sections/overview/banking/view';
// ----------------------------------------------------------------------
export const revalidate = false;
export const metadata = { title: `Design | Dashboard - ${CONFIG.appName}` };

export default async function Page() {
  await connect();

  const data = await DesignModel.find().lean();
  console.log(data);

  if (!data || data.length === 0) {
    return <div>No Design data found</div>;
  }
  return (
    <>
      <OverviewBankingView designData={data} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
