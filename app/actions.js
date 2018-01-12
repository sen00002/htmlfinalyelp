import axios from "axios";


export const ICLICK = "ITEM_CLICKED";
export const IFETCHED = "ITEM_FETCHED_SUCCESS";
export const IFETCHING = "ITEM_FETCHING";
export const ILIST = "ITEM_LIST";

export function fetchProcessing(isFetching){
    return {
        type: IFETCHING,
        clickFetching: isFetching
    };
}

export function fetchSuccess(data) {
    return {
        type: IFETCHED,
        data: data
    };
}

export function itemClicked(business){
    return {
        type: ICLICK,
        business: business
    };
}


export function actionBack(isGoingBack){
    return{
        type: ILIST,
        clickBack: isGoingBack
    };
}

export function backToMasterList(){
    return (dispatch)=>  {
        dispatch(actionBack(true));
    };
}

export function fetchData() {
    return (dispatch)=> {

        dispatch(fetchProcessing(true));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(Yelpapi(position.coords.latitude, position.coords.longitude));
          },
            (error) => {
                console.log("Error", error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };
}

// Yelp Api

export function Yelpapi(lat, long) {
    return (dispatch) => {

        let apikey = "tKMRuIXK5zWIURZuRWVkduBt7RizrawUD9E7AaY0LkEYcKgqg6GnoY8wZAdkIWEs90XTXX8tdgtXQCfL0KVcvhZ2veV3gwhtkviVDyBkcImAiBNZ5pYSwE8x4w1XWnYx";
        let url = "https://api.yelp.com/v3/businesses/search?latitude=" + lat + "&longitude=" + long;

        let options = {
            headers: {
                "Authorization": "Bearer " + apikey
            }
        };

        axios.get(url, options).then((response) => {
            console.log(response);
            return response.data;
        }).then((data) => {
            dispatch(fetchProcessing(false));
            dispatch(fetchSuccess(data));
        }).catch(function (error) {
            console.log('error: ' + error.message);
            throw error;
        });
    };
}

