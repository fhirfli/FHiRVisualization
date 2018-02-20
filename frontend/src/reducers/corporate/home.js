import {
    LOAD_DATA,
    LOAD_DATA_ERROR,
    LOAD_DATA_SUCCESS
} from "constants/corporate/home";

const home = (state = {
    isLoading: false,
    hasErrored: false,
    errorMsg: "",
    data: {
        //     'heartRate': {
        //          'self': [<FHIR-PROFILE>]
        // // only the ranges requested will be present
        // 'bodyWeight': [
        // (<FHIR-PROFILE>,{<FHIR-PROFILE>})
        // (<FHIR-PROFILE>,{<FHIR-PROFILE>})
        // ]
        // 'bodyHeight': [
        // (<FHIR-PROFILE>,{<FHIR-PROFILE>})
        // (<FHIR-PROFILE>,{<FHIR-PROFILE>})
        // ....
        // ]
        // ]
        // }
    }
}, action) => {
    switch (action.type) {
        case LOAD_DATA:
            let data = Object.assign({}, state.data);
            data[action.data.mainDataType] = data[action.data.mainDataType] || {};
            if (action.data.secondaryDataType) {
                data[action.data.mainDataType][action.data.secondaryDataType] = data[action.data.mainDataType][action.data.secondaryDataType] || [];
            } else {
                data[action.data.mainDataType]['self'] = data[action.data.mainDataType]['self'] || [];
            }

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
            data[action.data.mainDataType] = data[action.data.mainDataType] || {};
            if (action.data.secondaryDataType) {
                data[action.data.mainDataType][action.data.secondaryDataType] = action.data.values;
            } else {
                data[action.data.mainDataType]['self'] = action.data.values;
            }
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
