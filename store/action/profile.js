export const PROF='PROF';

export const userprofille=(status)=>{
    return {type:PROF,datta:status}
}

export const profileofstudent=(student_id)=>{
    return async dispatch=>{
        let details = {
            student_id:student_id,
        }

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response=await fetch('http://ais.omsai.info/api/v1/profile_detail', {
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
        dispatch(userprofille(resdata.data))
    }
}
