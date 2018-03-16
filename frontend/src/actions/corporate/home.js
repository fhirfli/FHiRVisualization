import * as types from "constants/corporate/home";
import axios from "axios";
import {handleResponseError} from "error";

function beginLoadData(mainDataType, secondaryDataType) {
    return {type: types.LOAD_DATA, data: {mainDataType, secondaryDataType}}
}
function loadDataSuccess(mainDataType, secondaryDataType, results) {
    return {
        type: types.LOAD_DATA_SUCCESS, data: {
            mainDataType,
            secondaryDataType,
            values: results
        }
    };
}
function loadDataError(data) {
    return {type: types.LOAD_DATA_ERROR, data}
}
/**
 * Retrieves data to populate a visualization by retrieving data points from a specified range, using data of the specified dataType
 * @param mainDataType
 * @param secondaryDataType
 */
export function manualLoadData(mainDataType, secondaryDataType) {

    console.log("Corporate manual load data + " + mainDataType + ", " + secondaryDataType);
    //TODO(Kiran): Implement functionality to retrieve correct data
    return dispatch => {
        dispatch(beginLoadData(mainDataType, secondaryDataType));
        return axios({
            method: "post",
            url: BASE_URL + "/api/corporate/data",
            data: {
                mainDataType,
                secondaryDataType
            }
        }).then(response => {
            // console.log("Got a response from the server " + JSON.stringify(response));
            let results = response.data;
            dispatch(loadDataSuccess(mainDataType, secondaryDataType, results));
        }).catch(err => {
            console.log("Got an error from the server: " + JSON.stringify(err));
            dispatch(loadDataError(handleResponseError(err)));
        });
    };


}
