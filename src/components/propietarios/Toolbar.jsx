export default function Toolbar({ onNew, onReload }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Propietarios</h1>
        <p className="text-sm text-slate-500">
          Administra propietarios, unidades y teléfonos de contacto.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm ring-1 ring-indigo-500/10 hover:bg-indigo-700 active:scale-[.98] transition"
        >
          <span className="text-lg leading-none">＋</span>
          Nuevo
        </button>
        <button
          onClick={onReload}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50"
          title="Recargar"
        >
          ⟳ Recargar
        </button>
      </div>
    </div>
  );
}
