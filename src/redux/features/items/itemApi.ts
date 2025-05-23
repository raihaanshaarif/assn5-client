import { baseApi } from "@/redux/api/baseApi";

const itemApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createItem: builder.mutation({
            query: (data) => ({
                url: 'item/create-item',
                method: 'POST',
                body: data,
            })
        }),
        getItem: builder.query({
            query: (params) => ({
                url: 'item',
                method: 'GET',
                params, // Accepts { page, limit } and passes as query params
            }),
            providesTags: [{ type: "item", id: "LIST" }],
        }),
        getItemById: builder.query({
            query: (id) => ({
                url: `item/${id}`,
                method: 'GET'
            }),
            providesTags: ( id) => [{ type: "item", id }],
        }),
        updateItem: builder.mutation({
            query: ({ id, data }) => ({
                url: `item/${id}`,
                method: 'PATCH',
                body: data,
            }),
            // Invalidate the cache for the item list and the specific item after update
            invalidatesTags: ( { id }) => [
                { type: "item", id: "LIST" },
                { type: "item", id },
            ],
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `item/${id}`,
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
    useCreateItemMutation,
    useGetItemQuery,
    useGetItemByIdQuery,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemApi;