import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import ArticleModel from 'src/lib/modals/write';

import { ComponentsView } from 'src/sections/_examples/view';

// ----------------------------------------------------------------------

export const metadata = { title: `All components | MUI - ${CONFIG.appName}` };

export default async function Page() {
  await connect();
  const data = await ArticleModel.find().lean();
  // console.log(data);
  if (!data) {
    return <div>No home data found</div>;
  }
  return <ComponentsView homeData={data} />;
}
