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
                query: () => ({
                    url: 'item',
                    method: 'GET'
                })
            })
}),
        
})

export const {useCreateItemMutation, useGetItemQuery } = itemApi