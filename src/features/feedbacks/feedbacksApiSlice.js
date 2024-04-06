

import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const feedbacksAdapter = createEntityAdapter({})

const initialState = feedbacksAdapter.getInitialState()

export const feedbacksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFeedbacks: builder.query({
            query: () => '/feedbacks',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedFeedbacks = responseData.map(feedback => {
                    feedback.id = feedback._id
                    return feedback
                });
                return feedbacksAdapter.setAll(initialState, loadedFeedbacks)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Feedback', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Feedback', id }))
                    ]
                } else return [{ type: 'Feedback', id: 'LIST' }]
            }
        }),
        addNewFeedback: builder.mutation({
            query: initialFeedback => ({
                url: '/feedbacks',
                method: 'POST',
                body: {
                    ...initialFeedback,
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: "LIST" }
            ]
        }),
        updateFeedback: builder.mutation({
            query: initialFeedback => ({
                url: '/feedbacks',
                method: 'PATCH',
                body: {
                    ...initialFeedback,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Feedback', id: arg.id }
            ]
        })
    }),
})

export const {
    useGetFeedbacksQuery,
    useAddNewFeedbackMutation
} = feedbacksApiSlice

// returns the query result object
export const selectFeedbacksResult = feedbacksApiSlice.endpoints.getFeedbacks.select()

// creates memoized selector
const selectFeedbacksData = createSelector(
    selectFeedbacksResult,
    feedbacksResult => feedbacksResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllFeedbacks,
    selectById: selectFeedbackById,
    selectIds: selectFeedbackIds
    // Pass in a selector that returns the notes slice of state
} = feedbacksAdapter.getSelectors(state => selectFeedbacksData(state) ?? initialState)