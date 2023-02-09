import { type onChangeType } from "."

export type SelectInputProps = {
  options: Record<string, string>
  onSelect: onChangeType
  name: string
  value: string
  fromORto: "from" | "to"
}

export const SelectInput = ({
  options,
  onSelect,
  name,
  value,
  fromORto,
}: SelectInputProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">
          Pick the currency you want to convert {fromORto}
        </span>
      </label>
      <select
        className="select-accent select font-mono text-xl uppercase"
        onChange={(e) => {
          onSelect(e.target.name, e.target.value)
        }}
        name={name}
        value={value}
      >
        {Object.keys(options)?.map((option) => (
          <option key={option} value={option}>
            {option}
            {options[option] ? ` - ${options[option] || ""}` : ``}
          </option>
        ))}
      </select>
    </div>
  )
}
