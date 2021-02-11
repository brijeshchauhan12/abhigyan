export const VERIFYSTATUS='VERYFYSTATUS';

export const authenticate=(status)=>{
    return {type:VERIFYSTATUS,status:status}
}

export const otpverification=(student_id,otp)=>{
    
    return async dispatch=>{
        let details = {
            student_id:student_id,
            otp:otp
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const response=await fetch('http://ais.omsai.info/api/v1/verify_reg_otp', {
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
        dispatch(authenticate(resdata.status))
    }
}