import { csrfFetch } from "./csrf";

const LOAD = 'spots/LOAD'
const SPOT_DETAIL = 'Spots/SPOT_DETAIL'
const CREATE_URL = 'Spots/CREATE_URL'


const load = (spots) => ({
    type: LOAD,
    spots,
});

const loadDetails = (spot) => ({
    type: SPOT_DETAIL,
    spot,
})

const createImage = (spotId, imageUrl) => ({
    type: CREATE_URL,
    spotId,
    imageUrl
})


export const createSpotImage = (spotId, imageUrl) => async (dispatch) => {

      const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(imageUrl), // Ensure imageUrl is correctly formatted
      });


      const spotImage = await res.json();
      dispatch(createImage(spotId, spotImage));
      return spotImage;

}


export const createSpot = (spotData) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(spotData),
    })
    const spot = await res.json();
    return spot;

}

export const fetchSpotDetails = (spotId) => async dispatch => {
    try{
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if(res.ok) {
        const details = await res.json()
        dispatch(loadDetails(details))
        return details;
    }
}catch(err) {
    console.error(err)
}
}

export const fetchSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if(res.ok) {
        const allSpots = await res.json();
        dispatch(load(allSpots.Spots))
        return res;
    }
}


const spotsReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD:
            action.spots.forEach((spot) => {
                newState[spot.id] = spot
            });
            return newState
        case SPOT_DETAIL:
                newState[action.spot.id] = action.spot;
                return newState;
            default:
                return state;
    }
}

export default spotsReducer
