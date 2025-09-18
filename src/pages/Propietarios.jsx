import React, { useState, useEffect, useMemo } from "react";
import {
  fetchPropietarios,
  createPropietario,
  updatePropietario,
  deletePropietario,
} from "../api/propietariosAPI";  // Importación de las funciones API

import Toolbar from "../components/propietarios/Toolbar";
import PropietariosTable from "../components/propietarios/PropietariosTable";
import PropietarioForm from "../components/propietarios/PropietarioForm";
import Modal from "../components/ui/Modal";
import Toast from "../components/ui/Toast";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useToast from "../hooks/useToast";
import "../styles/animations.css";

export default function Propietarios() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");  // Filtro de búsqueda
  const debouncedQ = useDebouncedValue(q, 250);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const { toast, showOk, showErr, clearToast } = useToast(2800);

  const emptyForm = {
    first_name: "",
    last_name: "",
    telefono: "",
    unidad_numero: "",
    unidad_edificio: "",
  };
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await fetchPropietarios();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.detail || "Error al cargar propietarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = debouncedQ.trim().toLowerCase();
    if (!term) return items;
    return items.filter((p) => {
      const nombre = `${p?.user?.first_name || ""} ${p?.user?.last_name || ""}`.toLowerCase();
      const unidad = `${p?.unidad?.numero || ""} ${p?.unidad?.edificio || ""}`.toLowerCase();
      const tel = (p?.telefono || "").toLowerCase();
      return nombre.includes(term) || unidad.includes(term) || tel.includes(term);
    });
  }, [debouncedQ, items]);

  // ==== Handlers
  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      first_name: p?.user?.first_name || "",
      last_name: p?.user?.last_name || "",
      telefono: p?.telefono || "",
      unidad_numero: p?.unidad?.numero || "",
      unidad_edificio: p?.unidad?.edificio || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        user: { first_name: form.first_name, last_name: form.last_name },
        telefono: form.telefono || null,
        unidad: { numero: form.unidad_numero, edificio: form.unidad_edificio },
      };
      if (editing) {
        // Enviar datos para actualizar propietario
        await updatePropietario(editing.id, payload);
        showOk("Propietario actualizado");
      } else {
        // Enviar datos para crear nuevo propietario
        await createPropietario(payload);
        showOk("Propietario creado");
      }
      setModalOpen(false);
      await load();
    } catch (e2) {
      showErr(e2?.response?.data?.detail || "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (p) => {
    if (!confirm(`¿Eliminar al propietario ${p?.user?.first_name} ${p?.user?.last_name}?`)) return;
    try {
      await deletePropietario(p.id);
      showOk("Eliminado correctamente");
      await load();
    } catch (e) {
      showErr(e?.response?.data?.detail || "No se pudo eliminar");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <Toast toast={toast} onClose={clearToast} />

      <Toolbar onNew={openCreate} onReload={load} />

      {/* Filtros */}
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="relative">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, unidad, edificio o teléfono…"
            className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            aria-label="Buscar propietarios"
          />
          <div className="pointer-events-none absolute left-3 top-2.5 text-slate-400">🔎</div>
        </div>
      </div>

      {/* Estados */}
      {loading && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="divide-y divide-slate-100">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 px-4 py-4 animate-pulse">
                <div className="h-4 w-10 rounded bg-slate-200" />
                <div className="h-4 w-40 rounded bg-slate-200" />
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-7 w-44 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      )}

      {err && !loading && (
        <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
          {err}
        </div>
      )}

      {!loading && !err && filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-slate-100 grid place-items-center">
            🔍
          </div>
          <p className="text-slate-800 font-medium">No se encontraron resultados</p>
          <p className="text-slate-500 mt-1 text-sm">
            Prueba con otros términos o crea un nuevo registro.
          </p>
          <button
            onClick={openCreate}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            ＋ Crear propietario
          </button>
        </div>
      )}

      {/* Tabla */}
      {!loading && !err && filtered.length > 0 && (
        <PropietariosTable rows={filtered} onEdit={openEdit} onDelete={onDelete} />
      )}

      {/* Modal Crear/Editar */}
      <Modal open={modalOpen} onClose={closeModal} title={editing ? "Editar propietario" : "Nuevo propietario"}>
        <PropietarioForm
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          onCancel={closeModal}
          saving={saving}
          editing={!!editing}
        />
      </Modal>
    </div>
  );
}
