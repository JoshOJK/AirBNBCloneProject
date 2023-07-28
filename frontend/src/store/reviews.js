import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'Reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'Reviews/CREATE_REVIEW'

const loadSpotReviews = (review) => ({
    type: LOAD_REVIEWS,
    review,
})





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
            default:
                return state;
    }
}

export default reviewReducer;
