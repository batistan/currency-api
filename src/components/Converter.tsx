import {useEffect, useRef, useState} from "react";
import CurrencySelector from "./CurrencySelector.tsx";
import {type ConversionRates, CurrencySuccessResponse, fetchCurrencyData} from "../api/currency.ts";
import convert from "./convert.ts";
import {currencies, ratesToCurrencies} from "../api/currencies.ts";
import styles from './Converter.module.css';

export default function Converter() {
  const [base, setBase] = useState<string>("USD");
  const [target, setTarget] = useState<string>("EUR");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("")

  const rateData = useRef<ConversionRates>({})

  const baseFormatter = new Intl.NumberFormat(undefined, { style: "currency", currency: base })
  const targetFormatter = new Intl.NumberFormat(undefined, { style: "currency", currency: target })

  useEffect(() => {
    fetchCurrencyData().then(data => {
      if (data instanceof CurrencySuccessResponse) {
        rateData.current = data.latestRates
      } else {
        setError(data.errorMessage)
      }

      setIsLoading(false);
    })
  }, [])

  const targetVal = (!isLoading && rateData.current) ? convert(base, target, rateData.current) : null;
  const options = (!isLoading && rateData.current) ? ratesToCurrencies(rateData.current) : currencies;

  return isLoading ? (
    <div className={styles.loading}>
      <progress/>
    </div>
  ) : (
    <div className={styles.container}>
      <CurrencySelector
        label={"Select base currency"}
        selected={base}
        handleSelect={(c: string) => setBase(c)}
        options={options}
      />
      <CurrencySelector
        label={"Select target currency"}
        selected={target}
        handleSelect={(c: string) => setTarget(c)}
        options={options}
      />
      {targetVal && (
        <p className={styles.result}>
          {`${baseFormatter.format(1)} = ${targetFormatter.format(targetVal)}`}
        </p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}