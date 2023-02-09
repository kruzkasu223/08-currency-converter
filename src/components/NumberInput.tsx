export type NumberInpurProps = {
  onChange: (value: number) => void
  name: string
  value: number | string
}

export const NumberInput = ({ onChange, name, value }: NumberInpurProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Type the value you want to convert</span>
      </label>
      <input
        type="number"
        name={name}
        onChange={(e) => {
          onChange(isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)
        }}
        value={value}
        placeholder="123.45"
        className="input-bordered input-accent input w-full max-w-xs"
      />
    </div>
  )
}
