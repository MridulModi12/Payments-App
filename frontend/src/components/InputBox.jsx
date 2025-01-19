export function InputBox({onchange, label, placeholder}) {
  return <div>
    <div className="text-sm font-medium text-left py-2">
      {label}
    </div>
    <input onChange={onchange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
  </div>
}