import { useRef } from "react";

export default function Field({ label, name, value, onChange, required, type = "text", pattern }) {
  const id = useRef(`f_${name}_${Math.random().toString(36).slice(2)}`).current;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        pattern={pattern}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}
