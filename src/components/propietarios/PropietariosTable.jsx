export default function PropietariosTable({ rows, onEdit, onDelete }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[900px] text-left">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr className="text-slate-600">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Unidad</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Edificio</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Teléfono</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((p, idx) => (
              <tr
                key={p.id}
                className={`${idx % 2 === 1 ? "bg-slate-50/40" : ""} hover:bg-indigo-50/40 transition-colors`}
              >
                <td className="px-4 py-3 text-slate-700">{p.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">
                    {p.user?.first_name} {p.user?.last_name}
                  </div>
                  <div className="text-xs text-slate-500">{p.user?.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {p.unidad?.numero || "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{p.unidad?.edificio || "—"}</td>
                <td className="px-4 py-3 text-slate-700">{p.telefono || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => alert(JSON.stringify(p, null, 2))}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                      title="Ver"
                    >
                      👁 Ver
                    </button>
                    <button
                      onClick={() => onEdit(p)}
                      className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm text-white hover:bg-amber-600"
                      title="Editar"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => onDelete(p)}
                      className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-700"
                      title="Eliminar"
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
