
import {BOARDLIST} from '../action/boardlist';
    const initialState={
        allboardlist:[]
    }
    export default(state=initialState,action)=>{
    
    switch(action.type){
        case BOARDLIST:
         return {
               allboardlist:action.dataarray
            }
        default:
            return state        
    }
}  