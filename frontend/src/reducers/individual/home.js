import {} from "constants/individual/home";

const home = (state = {
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
        default:
            // VERY IMPORTANT
            return state;
    }
};


export default home;
