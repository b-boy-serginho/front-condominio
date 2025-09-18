import { useEffect, useState } from "react";

/**
 * useToast
 * showOk("texto"), showErr("texto"), clearToast()
 */
export default function useToast(autoCloseMs = 2800) {
  const [toast, setToast] = useState(null); // {type:'ok'|'err', msg:''}

  useEffect(() => {
    if (!toast || !autoCloseMs) return;
    const t = setTimeout(() => setToast(null), autoCloseMs);
    return () => clearTimeout(t);
  }, [toast, autoCloseMs]);

  const showOk = (msg) => setToast({ type: "ok", msg });
  const showErr = (msg) => setToast({ type: "err", msg });
  const clearToast = () => setToast(null);

  return { toast, showOk, showErr, clearToast };
}
