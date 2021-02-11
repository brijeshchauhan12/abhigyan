import {SUBJECTLIST} from '../action/subjectlist';
import { TOPICARRAY} from '../action/subjectlist';

const initialState={
    subjectlist:[],
    topiclist:null
   }
 
   export default(state=initialState,action)=>{
    
    switch(action.type){
        case SUBJECTLIST:
         return{
             subjectlist:action.dataarray
         }
         console.log( "this is the finalise status"+subjectlist)
        case TOPICARRAY:
            return{
                topiclist:action.topics
            }
        default:
            return state        
    }
    
}  
