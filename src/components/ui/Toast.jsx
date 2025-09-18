export default function Toast({ toast, onClose }) {
  if (!toast) return null;
  const ok = toast.type === "ok";
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed z-50 top-4 right-4 rounded-xl px-4 py-3 shadow-lg text-sm backdrop-blur animate-slideIn ${
        ok
          ? "bg-emerald-50/95 text-emerald-900 border border-emerald-200"
          : "bg-rose-50/95 text-rose-900 border border-rose-200"
      }`}
      onClick={onClose}
      title="Cerrar notificación"
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="font-semibold">{ok ? "Listo" : "Error"}</span>
        <span className="opacity-60">·</span>
        <span>{toast.msg}</span>
      </div>
    </div>
  );
}
