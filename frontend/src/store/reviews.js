import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'Reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'Reviews/CREATE_REVIEW'

const loadSpotReviews = (review) => ({
    type: LOAD_REVIEWS,
    review,
})

const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review,
})




export const createReview = (spotId, review) => async dispatch => {

        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            body: JSON.stringify(review)
        })


        if(res.ok) {
            const reviewData = await res.json();
            dispatch(createReviewAction(reviewData));
            return res;

        } else {
            const errors = await res.json();
            return errors;
        }


}



export const fetchSpotReviews = (spotId) => async dispatch => {
    try{
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(res.ok) {
        const reviews = await res.json()
        dispatch(loadSpotReviews(reviews.Reviews))
        return res;
    }
    }
    catch (err){
        console.error(err)
    }

}

const reviewReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_REVIEWS:
                newState[action.review[0].spotId] = [];
                action.review.forEach((review) => {
                    newState[review.spotId].push(review);
                })
                return newState;
        case CREATE_REVIEW:
                newState[action.review.id] = action.review;
                return newState;
            default:
                return state;
    }
}

export default reviewReducer;
