// import connect from 'src/lib/db';
import { CONFIG } from 'src/config-global';
// import ArticleModel from 'src/lib/modals/write';

import { ComponentsView } from 'src/sections/_examples/view';

// ----------------------------------------------------------------------

export const revalidate = false; // no revalidation, true static build

export default async function Page() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL1}/api/fpii/write`, {
      cache: 'force-cache',
      // next: { revalidate: 30 },
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

