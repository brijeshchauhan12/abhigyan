
import { TOPICARRAY} from '../action/topicandvideo';
const initialState={
     

    topiclist:[]
   }
   export default(state=initialState,action)=>{
    
    switch(action.type){
       
       
        case TOPICARRAY:
            return {
              topiclist:action.topics
            }
        default:
            return state        
    }
    
}  