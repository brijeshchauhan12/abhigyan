
import {CLASSARRAY} from '../action/subjectlist';
    const initialState={
        classlis:[]
    }
 
   export default(state=initialState,action)=>{
    
    switch(action.type){
        case CLASSARRAY:
             return{ classlis:action.classar }
        default:
            return state        
    }
}  
