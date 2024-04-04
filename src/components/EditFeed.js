import React from 'react'
import { useGetFeedbacksQuery } from '../features/feedbacks/feedbacksApiSlice'
import { useParams } from 'react-router-dom'
import EditFeedForm from './EditFeedForm'
import { PulseLoader } from 'react-spinners'

const EditFeed = () => {
    const { id } = useParams()
    alert(id)

    const { feedback } = useGetFeedbacksQuery("feedbacksList", {
        selectFromResult: ({ data }) => ({
            feedback: data?.entities[id]
        }),
    })

    if (!feedback) return <p>Loading...</p>

    const content = <EditFeedForm feedback={feedback} />

    return content
}

export default EditFeed