import * as types from "constants/individual/home";
import axios from "axios";
import {handleResponseError} from "error";

function beginLoadData(dataType, dataRange) {
    console.log("beginLoadData(" + dataType + ", " + dataRange + ")");
    return {type: types.LOAD_DATA, data: {dataType, dataRange}}
}
function loadDataSuccess(dataType, dataRange, results) {
    return {
        type: types.LOAD_DATA_SUCCESS, data: {
            dataType,
            dataRange,
            values: results
        }
    };
}
function loadDataError(data) {
    return {type: types.LOAD_DATA_ERROR, data}
}

/**
 * Retrieves data to populate a visualizations by retrieving data from a specified range, using data of the specified dataType
 * @param dataType The type of data to be requested
 * @param dateRange The date range for which data is being requested
 *                   one of [ Weekly, Daily, Annual ]
 */
export function manualLoadData(dataType, dateRange) {

    //TODO(Kiran): Implement functionality to retrieve correct data
    return dispatch => {
        dispatch(beginLoadData(dataType, dateRange));
        return axios({
            method: "post",
            url: BASE_URL + "/api/individual/data",
            data: {
                dataType,
                dataRange: dateRange
            }
        }).then(response => {
            //console.log("Got a response from the server " + JSON.stringify(response));
            let results = response.data;
            dispatch(loadDataSuccess(dataType, dateRange, results));
        }).catch(err => {
            console.log("Got an error from the server: " + JSON.stringify(err));
            dispatch(loadDataError(handleResponseError(err)));
        });
    };

}
