import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import { broadcatModel } from 'src/lib/modals/broadcast';
import { OverviewBookingView } from 'src/sections/overview/booking/view';
import { Toaster } from 'react-hot-toast';
// ----------------------------------------------------------------------

export const metadata = { title: `Broadcast | Dashboard - ${CONFIG.appName}` };

export default async function Page() {
  await connect();

  const data = await broadcatModel.find().lean();
  console.log(data);

  if (!data || data.length === 0) {
    return <div>No broadcast data found</div>;
  }
  return (
    <>
      <OverviewBookingView broadcastData={data}/>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
