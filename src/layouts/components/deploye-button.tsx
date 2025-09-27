// // components/DeployButton.tsx
// import React, { useState } from "react";

// import Button from '@mui/material/Button';

// export default function DeployButton() {
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState<string | null>(null);

//   async function handleDeploy() {
//     if (!confirm("Deploy current homepage draft to live?")) return;
//     setLoading(true);
//     setMsg(null);

//     try {
//       const res = await fetch("/api/fpii/home/deploy", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // needed if you use cookie-based session
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data?.error || data?.message || "Deploy failed");
//       }

//       setMsg(data?.message || "Deployment triggered — check GitHub Actions for progress.");
//     } catch (err: any) {
//       setMsg(`Error: ${  err.message || err}`);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       <Button onClick={handleDeploy}   type="button"
//                       variant="outlined"
//                       color="primary" disabled={loading}>
//         {loading ? "Deploying…" : "Deploy to Live"}
//       </Button>
//       {msg && (
//         <div style={{ marginTop: 8, color: msg.startsWith("Error") ? "red" : "green" }}>
//           {msg}
//         </div>
//       )}
//     </div>
//   );
// }
import toast from 'react-hot-toast';
// components/DeployButton.tsx
import React, { useState, useCallback } from 'react';

import Button from '@mui/material/Button';

export default function DeployButton() {
  const [loading, setLoading] = useState(false);

  const handleDeploy = useCallback(async () => {
    if (!window.confirm('Deploy current homepage draft to live?')) return;
    setLoading(true);

    try {
      const res = await fetch('/api/fpii/home/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Deploy failed');
      }

      toast.success(data?.message || 'Deployment Done.');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong during deployment.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Button
      type="button"
      variant="outlined"
      color="primary"
      disabled={loading}
      onClick={handleDeploy}
    >
      {loading ? 'Deploying…' : 'Deploy to Live'}
    </Button>
  );
}
