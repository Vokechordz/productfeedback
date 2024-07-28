import React from 'react'
import { useGetFeedbacksQuery } from '../features/feedbacks/feedbacksApiSlice'
import { useParams } from 'react-router-dom'
import EditFeedForm from './EditFeedForm'
import { PulseLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { selectCurrentUserId } from '../auth/authSlice'

const EditFeed = () => {
    const { id } = useParams()
    console.log(id)

    const userId= useSelector(selectCurrentUserId)
    console.log(userId)

    const { feedback } = useGetFeedbacksQuery("feedbacksList", {
        selectFromResult: ({ data }) => ({
            feedback: data?.entities[id]
        }),
    })

    if (!feedback) return <p>Loading...</p>

    if (feedback.userId !== userId) {
        return <p className="errmsg">No access</p>
    }

    const content = <EditFeedForm feedback={feedback} />

    return content
}

export default EditFeed