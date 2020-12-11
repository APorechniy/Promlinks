import { combineReducers } from 'redux'
import serviceReducer from './serviceReducer';
 
const rootReducer = combineReducers({     
    servicesList: serviceReducer,  
})
 
export default rootReducer;