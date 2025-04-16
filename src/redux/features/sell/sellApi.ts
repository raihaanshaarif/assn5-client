import { baseApi } from "@/redux/api/baseApi";

const itemApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSell: builder.mutation({
            query: (data) => ({
                url: 'sell/create-sell',
                method: 'POST',
                body: data,
            })
        }),
        getSell: builder.query({
            query: (params) => ({
                url: 'sell',
                method: 'GET',
                params, // Accepts { page, limit } and passes as query params
            }),
            providesTags: [{ type: "item", id: "LIST" }],
        }),
        getSellById: builder.query({
            query: (id) => ({
                url: `sell/${id}`,
                method: 'GET'
            }),
            providesTags: ( id) => [{ type: "item", id }],
        }),
        updateSell: builder.mutation({
            query: ({ id, data }) => ({
                url: `sell/${id}`,
                method: 'PATCH',
                body: data,
            }),
            // Invalidate the cache for the item list and the specific item after update
            invalidatesTags: ( { id }) => [
                { type: "item", id: "LIST" },
                { type: "item", id },
            ],
        }),
        deleteSell: builder.mutation({
            query: (id) => ({
                url: `sell/${id}`,
                method: 'DELETE',
            }),
            // Invalidate the cache for the item list and the specific item after delete
            invalidatesTags: ( id) => [
                { type: "item", id: "LIST" },
                { type: "item", id },
            ],
        }),
    }),
});

export const {
useCreateSellMutation, useGetSellQuery
} = itemApi;