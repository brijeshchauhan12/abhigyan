export const profileupdateofstudent=(student_id,student_name,student_email,father_name,mother_name,dob,gender,address)=>{
    
    return async dispatch=>{

      let details = {
        student_id:student_id,
        student_name:student_name,
        student_email:student_email,
        father_name:father_name,
        mother_name:mother_name,
        dob:dob,
        gender:gender,
        address:address
    }

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

   const response=await fetch('http://ais.omsai.info/api/v1/profile_update', {
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
    
    }
}