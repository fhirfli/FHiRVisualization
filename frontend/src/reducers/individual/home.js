import {
    LOAD_DATA,
    LOAD_DATA_ERROR,
    LOAD_DATA_SUCCESS
} from "constants/individual/home";

const home = (state = {
    isLoading: false,
    hasErrored: false,
    errorMsg: "",
    data: {
        /*
         // only the datasets requested will be present
         'heartRate': {
         // only the ranges requested will be present
         'Annual': [
         {<FHIR-PROFILE>},
         {<FHIR-PROFILE>}....
         ]
         'Daily': [
         {<FHIR-PROFILE>},
         {<FHIR-PROFILE>},
         ....
         ]
         'Weekly': [
         {<FHIR-PROFILE>},
         {<FHIR-PROFILE>},
         ....
         ]
         }

         */
    }
}, action) => {
    switch (action.type) {
        case LOAD_DATA:
            let data = Object.assign({}, state.data);
            data[action.data.dataType] = data[action.data.dataType] || {};
            data[action.data.dataType][action.data.dataRange] = [];
            return Object.assign({}, state, {
                isLoading: true,
                data
            });
            break;
        case LOAD_DATA_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                hasErrored: true,
                errorMsg: action.data.error
            });
            break;
        case LOAD_DATA_SUCCESS: {
            let data = Object.assign({}, state.data);
            data[action.data.dataType] = data[action.data.dataType] || {};
            data[action.data.dataType][action.data.dataRange] = action.data.values;
            return Object.assign({}, state, {
                isLoading: false,
                data
            });
        }
            break;

        default:
            // VERY IMPORTANT
            return state;
    }
};


export default home;
