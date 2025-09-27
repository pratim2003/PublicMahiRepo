import type { NextRequest } from 'next/server';

type DeployResult = {
  ok: boolean;
  status?: number;
  message?: string;
  detail?: string;
};

function getConfig() {
  const repo = process.env.GITHUB_REPO;
  const workflow = process.env.GITHUB_WORKFLOW_FILE; // e.g. "deploy.yml"
  const branch = process.env.GITHUB_BRANCH; // e.g. "main"
  const token = process.env.GITHUB_TOKEN;
  return { repo, workflow, branch, token };
}

export async function triggerDeploy(inputs?: Record<string, unknown>): Promise<DeployResult> {
  const { repo, workflow, branch, token } = getConfig();

  if (!repo || !workflow || !branch || !token) {
    return { ok: false, message: 'Missing GitHub dispatch configuration in environment variables' };
  }

  const dispatchUrl = `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`;

  const payload: any = { ref: branch };
  if (inputs) payload.inputs = inputs;

  try {
    const res = await fetch(dispatchUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return {
        ok: false,
        status: res.status,
        message: 'Failed to dispatch workflow',
        detail: text,
      };
    }

    return { ok: true, message: 'Workflow dispatched' };
  } catch (error: any) {
    console.error('triggerDeploy error', error);
    return { ok: false, message: 'Network or runtime error', detail: String(error) };
  }
}

// POST handler for direct invocation: accepts optional { inputs } in JSON body
export async function POST(req: NextRequest) {
  try {
    let inputs: Record<string, unknown> | undefined;
    try {
      const body = await req.json().catch(() => null);
      if (body && typeof body === 'object' && body.inputs)
        inputs = body.inputs as Record<string, unknown>;
    } catch (e) {
      // ignore parse errors
    }

    const result = await triggerDeploy(inputs);
    if (!result.ok) {
      return Response.json({ success: false, result }, { status: 500 });
    }
    return Response.json({ success: true, result }, { status: 200 });
  } catch (error) {
    console.error('deploy POST handler error', error);
    return Response.json({ success: false, message: 'Internal error', error }, { status: 500 });
  }
}
