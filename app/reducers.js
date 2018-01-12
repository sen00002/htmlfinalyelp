import { ICLICK, IFETCHED, ILIST, IFETCHING} from "./actions";

export default function reducers(state, action) {
    let modifiedState = Object.assign({}, state);
    let Items = [];
    switch(action.type) {
        case IFETCHING:
            modifiedState.clickFetching = action.clickFetching;
            break;

        case IFETCHED:
            let newBusinessData = modifiedState.data.map((i) => {
                return Object.assign({}, i);
            });
            for(let i = 0; i < action.data.businesses.length; i++){
                let business = {
                    id: action.data.businesses[i].id,
                    name: action.data.businesses[i].name,
                    phone: action.data.businesses[i].phone,
                    distance: action.data.businesses[i].distance,
                    rating: action.data.businesses[i].rating,
                    price: action.data.businesses[i].price,
                    image_url: action.data.businesses[i].image_url
                };
                newBusinessData.push(business);
            }
            modifiedState.data = newBusinessData;
            console.log("modifiedState.data");
            console.log(modifiedState.data);
            break;

        case ICLICK:
            Items = action.business;
            console.log("CLICKED ON " + Items.name.toString());
            modifiedState.clickBack = false;
            modifiedState.clickItem = Items;
            break;

        case ILIST:
            modifiedState.clickBack = action.clickBack;
            break;

        default:
            return modifiedState;
    }

    return modifiedState;
}