import { ServerResponse,  IUser } from './../../models/models';
import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const launchesApi = createApi({
  reducerPath: 'launchesApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/' }),
  endpoints: (builder) => ({
    getLaunchesByName: builder.query<ServerResponse<IUser>,number>({
      query: (page:number) => ({
        url:'launches/query',
        method: "POST",
        headers:{
            "Content-Type": "application/json",
       },   data: {
        query: {},
        options: {
          page,
          sort: {
            date_utc: "asc",
          },
        },
      },
      }),
    }),
  }),
})


export const { useGetLaunchesByNameQuery } = launchesApi;