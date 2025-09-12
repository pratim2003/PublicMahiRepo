import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
import photoModel from 'src/lib/modals/photoJounalism';

import { ComponentsView } from 'src/sections/photojournalism/view';

// ----------------------------------------------------------------------

export const metadata = { title: `journalism | MUI - ${CONFIG.appName}` };

export default async function Page() {
  await connect();
  const data = await photoModel.find().lean();
  console.log(data);
  if (!data) {
    return <div>No home data found</div>;
  }
  return <ComponentsView homeData={data} />;
}
