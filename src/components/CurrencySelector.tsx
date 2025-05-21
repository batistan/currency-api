import {currencies, type Currency} from "../api/currencies.ts";
import styles from './CurrencySelector.module.css';
import {useState} from "react";

interface CurrencySelectorProps {
  readonly label: string
  readonly amount: number
  readonly setAmount: (amount: number) => void
  readonly selected: string
  readonly handleSelect: (c: string) => void,
  readonly options: Currency[]
}

export default function CurrencySelector({ label, amount, setAmount, selected, handleSelect, options = currencies }: CurrencySelectorProps) {
  const selectedOption = options.find(option => option.code === selected)
  const [searchTerm, setSearchTerm] = useState<string>(selectedOption ? `${selectedOption.code} - ${selectedOption.displayName}` : "")
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const filteredOptions = options.filter(option => {
    return option.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    || option.code.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={label}>{label}</label>
      <div className={styles.searchableDropdown}>
        <input
          type="text"
          id={label}
          className={styles.input}
          onFocus={() => {
            setSearchTerm("")
            setIsDropdownVisible(true)}
          }
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {isDropdownVisible && <ul className={styles.dropdown}>
          {filteredOptions.length > 0 && filteredOptions.map(value => {
            return <li
              key={value.code}
              className={styles.dropdownItem}
              onClick={() => {
                setSearchTerm(`${value.code} - ${value.displayName}`)
                setIsDropdownVisible(false)
                console.log("Selected currency:", value)
                handleSelect(value.code)
              }}
              >{`${value.code} - ${value.displayName}`}</li>
          })}
        </ul>}
      </div>
      <div>
        <label>
          <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
        </label>
      </div>
    </div>
  );
}