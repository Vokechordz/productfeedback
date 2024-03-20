

import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const repliesAdapter = createEntityAdapter({})

const initialState = repliesAdapter.getInitialState()

export const repliesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReplies: builder.query({
            query: () => '/replies',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedReplies = responseData.map(reply => {
                    reply.id = reply._id
                    return reply
                });
                return repliesAdapter.setAll(initialState, loadedReplies)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Reply', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Reply', id }))
                    ]
                } else return [{ type: 'Reply', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetRepliesQuery,
} = repliesApiSlice

// returns the query result object
export const selectRepliesResult = repliesApiSlice.endpoints.getReplies.select()

// creates memoized selector
const selectRepliesData = createSelector(
    selectRepliesResult,
    repliesResult => repliesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllReplies,
    selectById: selectReplyById,
    selectIds: selectReplyIds
    // Pass in a selector that returns the replies slice of state
} = repliesAdapter.getSelectors(state => selectRepliesData(state) ?? initialState)