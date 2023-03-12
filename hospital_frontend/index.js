const hospital_pages={};

hospital_pages.base_url='http://localhost/hospital_fullstack/hospital_backend/';

hospital_pages.getAPI = async (api_url) =>{
    try{
        return await axios(api_url)
    }catch(error){
        console.log('Error from GET API')
    }
}

hospital_pages.postAPI = async (api_url,api_data, api_token = null) =>{
    try{
        return await axios.post(
            api_url,
            api_data,
            {
                headers:{
                    "Authorization" : "token" +api_token
                }
            }
            )
    }catch(error){
        console.log(error)
    }
}

hospital_pages.loadFor = (page) => {
    eval ("hospital_pages.load_" + page+"();")
    
}
hospital_pages.load_index = async ()=>{
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email= document.getElementById("email").value;
        const password= document.getElementById("password").value;
        const data = { email: email, password: password };
        const signin_url = hospital_pages.base_url + "signin.php";
        const response = await hospital_pages.postAPI(signin_url,data);
        console.log( response.data);
        if (response.data.status !== "null" && response.data.user_type == 3) {
            localStorage.setItem('jwt', response.data.token);
            window.location.href = "adminpanel.html";}
        else if (response.data.status !== "null" && response.data.user_type == 2) {
            localStorage.setItem('jwt', response.data.token);
            console.log(localStorage.getItem('jwt')); 
            window.location.href = "employee.html";}
        else if (response.data.status !== "null" && response.data.user_type == 1) {
                localStorage.setItem('jwt', response.data.token);
                window.location.href = "pateint.html";}
        else {
            const error_message = document.createElement("div");
            error_message.textContent = "Incorrect email or password.";
            form.appendChild(error_message);
          }
    
    });
}

hospital_pages.load_admin = async ()=>{
    // get employee
    
    const employee_url = hospital_pages.base_url + "get_employee.php";
    const employee_select = document.getElementById("employee");
    const response2 = await hospital_pages.getAPI(employee_url)
    console.log(response2.data);
    employees= response2.data;
    employees.forEach((employee) => {
        const option = document.createElement("option");
        option.value = employee.id;
        option.text = employee.name;
        employee_select.appendChild(option);
      });   
     
    // get pateints
    const form = document.getElementById("Assign_Patients_form");
    const patients_url = hospital_pages.base_url + "get_patients.php";
    const response = await hospital_pages.getAPI(patients_url);
    const patients = response.data;
    const patient_select = document.getElementById("patient");
    patients.forEach((patient) => {
      const option = document.createElement("option");
      option.value = patient.id;
      option.text = patient.name;
      patient_select.appendChild(option);
    });   
   
    // assign pateints
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const hospital= document.getElementById("hospital").value;
        console.log(hospital);
        const patient= document.getElementById("patient").value;
        console.log(patient);
        const data = { "hospital_id": hospital, "user_id": patient };
        const assign_patient_url = hospital_pages.base_url + "assign_patient.php";
        const response = await hospital_pages.postAPI(assign_patient_url,data);
        console.log( response.data);
        console.log( response.status);
        if (response.status == 200) {
            const error_message = document.getElementById("error-message");
            if (error_message) {
                error_message.remove();
            }
            let success_message = document.getElementById("success-message");
            if (success_message && response.data != "Patient assigned successfully") {
                success_message.remove();
                success_message = null;
            }
            if (!success_message) {
                success_message = document.createElement("div");
                success_message.setAttribute("id", "success-message");
                form.appendChild(success_message);
            }
            success_message.textContent = response.data;
        } else {
            const success_message = document.getElementById("success-message");
            if (success_message) {
                success_message.remove();
            }
            const error_message = document.createElement("div");
            error_message.setAttribute("id", "error-message");
            error_message.textContent = response.data;
            form.appendChild(error_message);
        } 

        // assign employee
        const form_employees = document.getElementById("Assign_employees_form");
        form_employees.addEventListener("submit", async (event) => {
            event.preventDefault();
            const hospital= document.getElementById("hospital").value;
            console.log(hospital);
            const patient= document.getElementById("employee").value;
            console.log(employee);
            const data = { "hospital_id": hospital, "user_id": employee };
            const assign_employee_url = hospital_pages.base_url + "assign_employee.php";
            const response = await hospital_pages.postAPI(assign_patient_url,data);
            console.log( response.data);
            console.log( response.status);
            if (response.status == 200) {
                const error_message = document.getElementById("error-message");
                if (error_message) {
                    error_message.remove();
                }
                let success_message = document.getElementById("success-message");
                if (success_message && response.data != "Patient assigned successfully") {
                    success_message.remove();
                    success_message = null;
                }
                if (!success_message) {
                    success_message = document.createElement("div");
                    success_message.setAttribute("id", "success-message");
                    form.appendChild(success_message);
                }
                success_message.textContent = response.data;
            } else {
                const success_message = document.getElementById("success-message");
                if (success_message) {
                    success_message.remove();
                }
                const error_message = document.createElement("div");
                error_message.setAttribute("id", "error-message");
                error_message.textContent = response.data;
                form.appendChild(error_message);
            } 
        




    
})
}

hospital_pages.load_pateint = async ()=>{
    const users_url = hospital_pages.base_url + "assign_patient.php"
    const data = { user_id: 1, hospital_id: 1 };
    const response= await hospital_pages.postAPI(users_url,data)
    console.log(response.data);
}

hospital_pages.load_employee = ()=>{
    alert(' hello employee')
}

// if (response.data.status !== null) { - This line of code is checking if response.data.status is not null. However, based on the API response you provided earlier, it seems like the status property is a string. So, you should check if response.data.status !== "null" instead.

// window.location.href = "adminpanel.html"; - This line of code is redirecting the user to the adminpanel.html page regardless of whether they are an admin or not. You should first check the user's role (e.g. by decoding the JWT token) and then redirect them to the appropriate page.