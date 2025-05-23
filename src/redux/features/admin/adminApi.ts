import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    getAdmin: builder.query({
      query: () => ({
        url: "admins",
        method: "GET",
      }),
    }),
    getSingleAdmin: builder.query({
      query: (userID) => ({
        url: `admins/?id=${userID}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAdminQuery,
  useGetSingleAdminQuery,
} = adminApi;
