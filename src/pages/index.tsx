import { type NextPage } from "next"
import Head from "next/head"
import { useMemo, useState } from "react"
import { type onChangeType, SelectInput, NumberInput } from "../components"
import { api } from "../utils/api"
import { formattedCurrency } from "../utils/formattedCurrency"

const Home: NextPage = () => {
  const [currenciesSetting, setCurrenciesSetting] = useState({
    fromCurrency: "usd",
    toCurrency: "inr",
  })

  const { data: currenciesList, error: currenciesListError } =
    api.currencies.list.useQuery(undefined, {
      refetchOnWindowFocus: false,
    })
  const {
    data: converted,
    error: convertedError,
    isFetching,
  } = api.currencies.convert.useQuery(currenciesSetting, {
    refetchOnWindowFocus: false,
  })
  const isError = currenciesListError?.message || convertedError?.message

  const [fromValue, setFromValue] = useState(1)
  const toValue: number = useMemo(
    () =>
      Number(
        ((converted?.[currenciesSetting.toCurrency] || 0) * fromValue).toFixed(
          4
        )
      ) || 0,
    [converted, currenciesSetting.toCurrency, fromValue]
  )

  const onChange: onChangeType = (name, value) => {
    setCurrenciesSetting((settings) => ({
      ...settings,
      [name]: value,
    }))
  }

  return (
    <>
      <Head>
        <title>08/27 - Currency Converter</title>
      </Head>

      <main
        data-theme="night"
        className="flex min-h-screen flex-col items-center"
      >
        <h1 className="m-8 text-3xl font-extrabold tracking-tight">
          08/27 - Currency Converter
        </h1>

        {isError && (
          <div className="flex flex-col items-center">
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">Error! Something went wrong...</h3>
                  <div className="text-xs">
                    message:{" "}
                    {currenciesListError?.message || convertedError?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currenciesList && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-14">
              <SelectInput
                name="fromCurrency"
                fromORto="from"
                options={currenciesList}
                onSelect={onChange}
                value={currenciesSetting.fromCurrency}
              />
              <SelectInput
                name="toCurrency"
                fromORto="to"
                options={currenciesList}
                onSelect={onChange}
                value={currenciesSetting.toCurrency}
              />
            </div>

            <div className="flex items-center gap-14 text-2xl">
              <NumberInput
                name="fromValue"
                value={fromValue}
                onChange={(value) => setFromValue(value)}
              />

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">{`${formattedCurrency(
                    currenciesSetting.fromCurrency,
                    fromValue
                  )} =`}</span>
                </label>
                <input
                  readOnly
                  type={"text"}
                  value={
                    !isFetching
                      ? formattedCurrency(currenciesSetting.toCurrency, toValue)
                      : "..."
                  }
                  className="input-bordered input-accent input w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Home
