import React from 'react'
import styles from '../cssmodules/comments.module.css'
import { useGetFeedbacksQuery } from '../features/feedbacks/feedbacksApiSlice'
import Feedback from './Feedback'

const Comments = () => {

  const {
    data: feedbacks,
    isLoading,
    isSuccess,
    isError,
    error
  }= useGetFeedbacksQuery()

  /* const dataArr= Object.values(feedbacks?.entities)
  console.log(dataArr) */


  let content

  if (isLoading) content= <p>Loading...</p>

  if (isSuccess) {
    const { ids } = feedbacks

    const tableContent = ids?.length
        ? ids.map(feedbackId => <Feedback key={feedbackId} feedbackId={feedbackId} />)
        : null

    content = (
       <div>
        {tableContent}
       </div>
    )
}

  return content
}

export default Comments