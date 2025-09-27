import { Toaster } from 'react-hot-toast';

import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import ArticleModel from 'src/lib/modals/write';

import { OverviewEcommerceView } from 'src/sections/overview/e-commerce/view';

// ----------------------------------------------------------------------
export const revalidate = false;
export const metadata = { title: `Writing | Dashboard - ${CONFIG.appName}` };

export default async function Page() {
  await connect();
  const data = await ArticleModel.find().lean();
  // console.log(data);
  if (!data) {
    return <div>No Writing data found</div>;
  }
  return (
    <>
      <OverviewEcommerceView writingData={data} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
