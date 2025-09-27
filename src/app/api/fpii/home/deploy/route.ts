export async function POST() {
  try {
    const repo = process.env.GITHUB_REPO; // e.g. "pratim2003/PublicMahiRepo"
    const branch = process.env.GITHUB_BRANCH; // e.g. "main"
    const workflowFile = process.env.GITHUB_WORKFLOW_FILE; // e.g. "deploy.yml"
    const token = process.env.GITHUB_TOKEN; // GitHub PAT with workflow scope

    if (!repo || !branch || !workflowFile || !token) {
      return Response.json(
        { success: false, message: 'Missing GitHub environment variables' },
        { status: 500 }
      );
    }

    // 🔥 Trigger GitHub Actions workflow
    const ghRes = await fetch(
      `https://api.github.com/repos/${repo}/actions/workflows/${workflowFile}/dispatches`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ref: branch }),
      }
    );

    if (!ghRes.ok) {
      const errText = await ghRes.text();
      console.error('GitHub Deploy Trigger Failed:', errText);
      return Response.json(
        { success: false, message: 'Failed to trigger deploy', error: errText },
        { status: ghRes.status }
      );
    }

    return Response.json(
      { success: true, message: 'Deployment triggered successfully!' },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Deploy error:', err);
    return Response.json(
      { success: false, message: err.message || 'Error triggering deploy' },
      { status: 500 }
    );
  }
}
