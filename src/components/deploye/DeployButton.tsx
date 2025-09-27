// // components/DeployButton.tsx
// import React, { useState } from "react";

// export default function DeployButton() {
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState<string | null>(null);

//   async function handleDeploy() {
//     if (!confirm("Deploy current homepage draft to live?")) return;
//     setLoading(true);
//     setMsg(null);
//     try {
//       // include credentials if you use cookie-based session:
//       const res = await fetch("/api/admin/home/deploy", { method: "POST", credentials: "include" });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Deploy failed");
//       setMsg("Deployment triggered — check GitHub Actions for progress.");
//     } catch (err: any) {
//       setMsg(`Error: ${  err.message || err}`);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       <button onClick={handleDeploy} disabled={loading}>
//         {loading ? "Deploying…" : "Deploy to Live"}
//       </button>
//       {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
//     </div>
//   );
// }
// components/DeployButton.tsx
import React, { useState } from 'react';

export default function DeployButton() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleDeploy() {
    if (!window.confirm('Deploy current homepage draft to live?')) return;
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/home/deploy', {
        method: 'POST',
        credentials: 'include', // for cookie-based session
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Deploy failed');
      setMsg('Deployment triggered — check GitHub Actions for progress.');
    } catch (err: any) {
      setMsg(`Error: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleDeploy} disabled={loading}>
        {loading ? 'Deploying…' : 'Deploy to Live'}
      </button>
      {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
    </div>
  );
}
