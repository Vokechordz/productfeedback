import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://productfeedback-api-t6us.onrender.com' }),
    tagTypes: ['Feedback', 'User'],
    endpoints: builder => ({})
})


//https://productfeedback-api-t6us.onrender.com