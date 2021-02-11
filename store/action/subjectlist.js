import {AsyncStorage} from 'react-native';
export const SUBJECTLIST='SUBJECTLIST';
export const CLASSID='CLASSID';
export const CLASSARRAY='CLASSARRAY';
export const classlist=(data)=>{
    return{type:CLASSARRAY,classar:data}
}
export const classidsend=(data)=>{
    return{type:CLASSID,class_id:data}
}
export const allsubjectlist=(data)=>{
    return {type:SUBJECTLIST,dataarray:data}
}

export const subject_list=(school_id,user,classid="")=>{
    
    return async dispatch=>{
        let details = {
            school_id:school_id,
            board_id:user.br_id,
            class_id: classid,
            student_id: user.st_id
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response=await fetch('http://ais.omsai.info/api/v1/subject_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        if(response.status!=200){
            throw new Error("there may be some entries missing")
        }
        const resdata=await response.json();
        const dar =resdata.data
        dispatch(allsubjectlist(dar))
    }
}

export const classlistALL=(school_id, user)=>{
    return async dispatch=>{
      let details = {
            school_id:school_id,
            board_id:user.br_id
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response=await fetch('http://ais.omsai.info/api/v1/class_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        if(response.status!=200){
            throw new Error("there may be some entries missing")
        }
        const resdata=await response.json();
        const classarray=resdata.data
        dispatch(classlist(classarray))
    }
}

