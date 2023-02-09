import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

const todayQuery = (date: Date) =>
  `?d=${date.toISOString().split("T")[0] || ""}`

export const currenciesRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json${todayQuery(
        new Date()
      )}`
    )
    if (!res.ok) throw new Error(res.statusText)
    const list = (await res.json()) as Promise<Record<string, string>>

    return list
  }),
  convert: publicProcedure
    .input(
      z.object({
        fromCurrency: z.string(),
        toCurrency: z.string(),
      })
    )
    .query(async ({ input }) => {
      const res = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${
          input.fromCurrency
        }/${input.toCurrency}.json${todayQuery(new Date())}`
      )
      if (!res.ok) throw new Error(res.statusText)
      const data = (await res.json()) as Promise<
        {
          [key: string]: number
        } & {
          date: string
        }
      >

      return data
    }),
})
