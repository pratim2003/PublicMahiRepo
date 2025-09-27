import connect from 'src/lib/db';

import { getHome, createHome } from '../../../../controllers/home.controllers';

export async function GET() {
  await connect();
  try {
    const data = await getHome();
    if (data.status === 500) {
      return Response.json({ error: data.error }, { status: 500 });
    }
    return Response.json({ data: data.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: 'Error in get', error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connect();
  try {
    const data = await createHome(req);
    if (data.status === 500) {
      return Response.json({ error: data.error }, { status: 500 });
    }

    // 🔥 Trigger GitHub Action workflow after saving data
    // const repo = process.env.GITHUB_REPO;          // "pratim2003/PublicMahiRepo"
    // const branch = process.env.GITHUB_BRANCH;      // "main"
    // const workflowFile = process.env.GITHUB_WORKFLOW_FILE; // "deploy.yml"
    // const token = process.env.GITHUB_TOKEN;        // PAT

    // if (!repo || !branch || !workflowFile || !token) {
    //   return Response.json(
    //     { success: true, message: 'Data created, but deploy not triggered (missing env vars)' },
    //     { status: 200 }
    //   );
    // }

    // const ghRes = await fetch(
    //   `https://api.github.com/repos/${repo}/actions/workflows/${workflowFile}/dispatches`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Accept": "application/vnd.github+json",
    //       "Authorization": `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({ ref: branch }),
    //   }
    // );

    // if (!ghRes.ok) {
    //   const errText = await ghRes.text();
    //   console.error("GitHub Deploy Trigger Failed:", errText);
    //   return Response.json(
    //     { success: true, message: 'Data created, but failed to trigger deploy', error: errText },
    //     { status: 500 }
    //   );
    // }

    return Response.json(
      { success: true, message: 'Data created & deployment triggered!' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: 'Error in post', error }, { status: 500 });
  }
}
