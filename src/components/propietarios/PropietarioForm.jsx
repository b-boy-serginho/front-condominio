import Field from "../ui/Field";

export default function PropietarioForm({ form, setForm, onSubmit, onCancel, saving, editing }) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Nombres"
          name="first_name"
          value={form.first_name}
          onChange={onChange}
          required
        />
        <Field
          label="Apellidos"
          name="last_name"
          value={form.last_name}
          onChange={onChange}
          required
        />
        <Field
          label="Teléfono"
          name="telefono"
          value={form.telefono}
          onChange={onChange}
          type="tel"
          pattern="[0-9+ ]*"
        />
        <Field
          label="Unidad (número)"
          name="unidad_numero"
          value={form.unidad_numero}
          onChange={onChange}
          required
        />
        <Field
          label="Edificio"
          name="unidad_edificio"
          value={form.unidad_edificio}
          onChange={onChange}
          required
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Guardando…" : editing ? "Guardar cambios" : "Crear"}
        </button>
      </div>
    </form>
  );
}
