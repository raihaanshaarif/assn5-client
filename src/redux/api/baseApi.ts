import {

  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// ✅ Correct Type for Query Function
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs, // Arguments passed to query
  unknown, // Expected data type (use `unknown` for flexibility)
  FetchBaseQueryError, // Expected error type
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  {}, // Custom options (not used here)
  FetchBaseQueryMeta // Metadata type
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const errorStatus = result.error.status;
    const errorMessage = (result.error.data as { message?: string })?.message || "An error occurred.";

    if (errorStatus === 404 || errorStatus === 403) {
      toast.error(errorMessage);
    }

    if (errorStatus === 401) {
      console.log("Sending refresh token...");

      const res = await fetch("http://localhost:5001/api/v1/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });

      const data: { data?: { accessToken?: string } } = await res.json(); // ✅ Ensure data structure is correct

      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;

        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );

        // 🔄 Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["semester", "courses", "offeredCourse"],
  endpoints: () => ({}),
});
