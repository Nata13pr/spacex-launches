import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { ServerResponse, IUser } from "../models/models";

const createFlightNumberOutput = (flightNumber: string) =>
  flightNumber ? { flight_number: { $eq: flightNumber } } : "";
const createFlightNameOutput = (flightName: string) =>
  flightName !== "" ? { name: { $regex: flightName, $options: "i" } } : "";
const createYearOfTheFlightOutput = (yearOfTheFlight: string) =>
  yearOfTheFlight !== ""
    ? {
        date_utc: { $regex: `^${yearOfTheFlight.substr(0, 4)}`, $options: "i" },
      }
    : "";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const launchesApi = createApi({
  reducerPath: "launchesApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://api.spacexdata.com/v5/" }),
  endpoints: (builder) => ({
    getLaunchesByName: builder.query<
      ServerResponse<IUser>,
      {
        page: number;
        yearOfTheFlight: string;
        flightNumber: string;
        flightName: string;
      }
    >({
      query: (params: {
        page: number;
        yearOfTheFlight: string;
        flightNumber: string;
        flightName: string;
      }) => ({
        url: "launches/query",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query: {
            ...createYearOfTheFlightOutput(params.yearOfTheFlight),
            ...createFlightNumberOutput(params.flightNumber),
            ...createFlightNameOutput(params.flightName),
          },
          options: {
            page: params.page,
            sort: {
              data_utc: "desc",
            },
          },
        },
      }),
    }),
  }),
});

export const { useGetLaunchesByNameQuery } = launchesApi;
