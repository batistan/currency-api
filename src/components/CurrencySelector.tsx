import {currencies, type Currency} from "../api/currencies.ts";
import styles from './CurrencySelector.module.css';

interface CurrencySelectorProps {
  readonly label: string
  readonly selected: string
  readonly handleSelect: (c: string) => void,
  readonly options: Currency[]
}

export default function CurrencySelector({ label, selected, handleSelect, options = currencies }: CurrencySelectorProps) {
  console.log(options)
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.select}
        onChange={e => handleSelect(e.target.value)}
        value={selected}
      >
        {options.map(value => {
          return <option key={value.code} value={value.code}>{`${value.code} - ${value.displayName}`}</option>
        })}
      </select>
    </div>
  );
}