import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviews";
import './CreateReviewForm.css'
import { useHistory, useParams } from "react-router-dom";


const CreateReviewForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const realUser = useSelector((state) => state.session.user)
    const { id } = useParams();

    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState({})


    const handleNewReview = async (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars: rating
        }


        setReview('')
        setRating(0)
        setErrors({})

            let postedReview = await dispatch(createReview(id, newReview)).catch(
                async (res) => {
                  const data = await res.json();
                  if (data && data.errors) {
                  setErrors(data.errors)
                  } else if (data) {
                    setErrors(data)
                  }
                }
              );
            if(postedReview) window.location.reload();

      }

    const handleClick = (starIdx) => {
        const newRating = starIdx + 1;
        setRating(newRating)
    }

const avgRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        const icon = i < rating ? "fa-solid fa-star" : "fa-duotone fa-star";
        stars.push(
            <i key={i}
            className={`fa ${icon} star ${i < rating ? "active" : ""}`}
            onMouseOver={() => setRating(i+1)}
            onClick={() =>handleClick(i)}
            >
            </i>
        )
    }
    return stars;
}

let throwError;
    if (errors.review) {
        throwError = `* ${errors.review}`
    } else if (errors.stars) {
        throwError =` * ${errors.stars}`
    } else if (errors.message) {
        throwError = `* ${errors.message}`
    }

return (
    <form onSubmit={handleNewReview} className="new-review-form">
        <div className="container">
    <h1>How was your Stay</h1>
        <div className="error-message">{throwError}</div>
        <textarea className="review-textarea" placeholder="Leave your review here..." value={review} onChange={(e) => setReview(e.target.value)}>
        </textarea>
        <div className="rating">{avgRating()} Stars</div>
        <button type="submit" disabled={review.length < 10} >Submit Your Review</button>
        </div>
    </form>
)


}
export default CreateReviewForm;
