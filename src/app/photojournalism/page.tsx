// import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
// import photoModel from 'src/lib/modals/photoJounalism';

import { ComponentsView } from 'src/sections/photojournalism/view';

// ----------------------------------------------------------------------

export const metadata = { title: `journalism | MUI - ${CONFIG.appName}` };

export const revalidate = false; // no revalidation, true static build

export default async function Page() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/photojournalism`, {
      cache: 'force-cache',
      next: { revalidate: false },
    });
    const data = await res.json();
    if (!data) {
      return <div>No home data found</div>;
    }
    return <ComponentsView homeData={data.data} />;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
