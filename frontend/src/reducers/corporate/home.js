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
    console.log("DATA IN ACTION: " + JSON.stringify(action.data));
	let result;
    switch (action.type) {
        case LOAD_DATA:
            let data = Object.assign({}, state.data);
            data[action.data.mainDataType] = data[action.data.mainDataType] || {};
            if (action.data.secondaryDataType) {
                data[action.data.mainDataType][action.data.secondaryDataType] = data[action.data.mainDataType][action.data.secondaryDataType] || [];
            } else {
                data[action.data.mainDataType]['self'] = data[action.data.mainDataType]['self'] || [];
            }

            result = Object.assign({}, state, {
                isLoading: true,
                data
            });

	    console.log("RESULT: " + JSON.stringify(result));
	    return result;
            break;
        case LOAD_DATA_ERROR:
	    result = Object.assign({}, state, {
                isLoading: false,
                hasErrored: true,
                errorMsg: action.data.error
            });

	    console.log("RESULT: " + JSON.stringify(result));
            return result;
	    break;

        case LOAD_DATA_SUCCESS: {

            let data = Object.assign({}, state.data);
            data[action.data.mainDataType] = data[action.data.mainDataType] || {};
            if (action.data.secondaryDataType) {
                data[action.data.mainDataType][action.data.secondaryDataType] = action.data.values;
            } else {
                data[action.data.mainDataType]['self'] = action.data.values;

            }

	    let result = Object.assign({}, state, {
                isLoading: false,
                data
            });
	    console.log("RESULT: " + JSON.stringify(result));

            return result;

        }
            break;
        default:
            // VERY IMPORTANT
            return state;
    }
};


export default home;
