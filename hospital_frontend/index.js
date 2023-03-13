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
                    "Authorization" : api_token
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

// sign-in
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
            // localStorage.setItem('id', response.data.)
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
    // sign-up
    const form_signup = document.getElementById("signup-form");
    form_signup.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name= document.getElementById("name").value;
        const signup_email= document.getElementById("signup-email").value;
        const gender = document.getElementById("gender").value;
        const user_type= document.getElementById("user_typer").value;
        const date_of_birth= document.getElementById("date_of_birth").value;
        const signup_password= document.getElementById("signup-password").value;
        const signup_data = { email: signup_email, password: signup_password, date_of_birth: date_of_birth,user_type:user_type,gender:gender,name:name  };
        console.log(signup_data);
        const signup_url = hospital_pages.base_url + "signup.php";
        const response_signup = await hospital_pages.postAPI(signup_url,signup_data);
        console.log(response_signup.data);
        form_signup.style.display= 'none';
        

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
    //  get hospitals
    const hospitals_url = hospital_pages.base_url + "get_hospital.php";
    const response_hospital = await hospital_pages.getAPI(hospitals_url);
    const hospitals = response_hospital.data;
    const hospital_select = document.getElementById("hospital");
    const hospital2_select = document.getElementById("hospital_2");
    hospitals.forEach((hospital) => {
        const option = document.createElement("option");
        option.value = hospital.id;
        option.text = hospital.name;
        hospital_select.appendChild(option);
        const option2 = document.createElement("option");
        option2.value = hospital.id;
        option2.text = hospital.name;
        hospital2_select.appendChild(option2);
      });   

    // assign pateints
    const form = document.getElementById("Assign_Patients_form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const hospital= document.getElementById("hospital").value;
        console.log(hospital);
        const patient= document.getElementById("patient").value;
        console.log(patient);
        const token_admin= localStorage.getItem('jwt');
        console.log(token_admin);
        const data = { "hospital_id": hospital, "user_id": patient };
        const assign_patient_url = hospital_pages.base_url + "assign_patient.php";
        const response = await hospital_pages.postAPI(assign_patient_url,data,token_admin);
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
        } })

        // assign employee
        const form_employees = document.getElementById("Assign_employees_form");
        form_employees.addEventListener("submit", async (event) => {
            event.preventDefault();
            const hospital= document.getElementById("hospital_2").value;
            console.log(hospital);
            const token = localStorage.getItem('jwt');
            const employee= document.getElementById("employee").value;
            console.log(employee);
            const data = { "hospital_id": hospital, "user_id": employee };
            const assign_employee_url = hospital_pages.base_url + "assign_employee.php";
            const response2 = await hospital_pages.postAPI(assign_employee_url,data, token);
            console.log( response2.data);
            console.log( response2.status);
            if (response2.status == 200) {
                const error_message2 = document.getElementById("error-message");
                if (error_message2) {
                    error_message2.remove();
                }
                let success_message2 = document.getElementById("success-message");
                if (success_message2 && response2.data != "employee assigned successfully") {
                    success_message2.remove();
                    success_message2 = null;
                }
                if (!success_message2) {
                    success_message2 = document.createElement("p");
                    success_message2.setAttribute("id", "success-message");
                    form_employees.appendChild(success_message2);
                }
                success_message2.textContent = response2.data;
            } else {
                const success_message2 = document.getElementById("success-message");
                if (success_message2) {
                    success_message2.remove();
                }
                const error_message2 = document.createElement("p");
                error_message2.setAttribute("id", "error-message");
                error_message2.textContent = response2.data;
                form_employees.appendChild(error_message2);
            } 

    
})
  // statistics
        // hospital patients
        const AUBMC=document.getElementById('hospital-1-patients')
        const MAKASED=document.getElementById('hospital-2-patients')
        const patient_num_url = hospital_pages.base_url + "patient_num.php";
        const response_stat = await hospital_pages.getAPI(patient_num_url);
        console.log( response_stat.data);
        const pateint_stat=response_stat.data
        pateint_stat.forEach((patient) => {
            if ( patient.hospital_id == 1  ) {
                const patients_aub = pateint_stat.filter((p) => p.hospital_id === 1);
                AUBMC.textContent = patients_aub.length;
        } else {
            const patients_makased = pateint_stat.filter((p) => p.hospital_id === 2);
            MAKASED.textContent = patients_makased.length;
        }
});
        // employee gender
        const females= document.getElementById('female-employees')
        const males= document.getElementById('Male-employees')
        const employee_num_url = hospital_pages.base_url + "get_employee.php";
        const response_stat_employee = await hospital_pages.getAPI(employee_num_url)
        let stat_employee = response_stat_employee.data
        console.log(stat_employee);
        stat_employee.forEach((employee)=>{
            if ( employee.gender == 1  ) {
                const female_employee = stat_employee.filter((p) => p.gender === 1);
                females.textContent = female_employee.length;
        } else {
            const male_employee = stat_employee.filter((p) => p.gender === 0);
                males.textContent = male_employee.length;
        }  
        })


}
hospital_pages.load_pateint = async ()=>{
    
    // get services
    const users_url = hospital_pages.base_url + "get_services.php"
    const services = document.getElementById("services");
    const token2 = localStorage.getItem('jwt');

    const response_services= await hospital_pages.getAPI(users_url)
    service_data=response_services.data
    console.log(service_data[0]);
    for (let i = 0; i < service_data.length; i++) {
        
        services.innerHTML += `<li>
        <input type="checkbox" id="service_${service_data[i].id}" name="services[]" value="${service_data[i].id}" data-price="${service_data[i].service_price}">
                <label for="service_${service_data[i].id}">
                    ${service_data[i].service_name} ${service_data[i].service_price}\$
                </label>
        </li>`
        
    }
    console.log(response_services.data);

    // get medication
    const meds_url = hospital_pages.base_url + "get_meds.php"
const meds = document.getElementById("table_body");

const response_meds= await hospital_pages.getAPI(meds_url)
meds_data=response_meds.data
console.log(meds_data);

for (let i = 0; i < meds_data.length; i++) {   
    table_body.innerHTML += `
        <tr>
            <td>${meds_data[i].name}</td>
            <td>${meds_data[i].price}</td>
            <td><input type="number" name="medication[]" min="0"></td>
            <td><input type="checkbox"  name="selected_medications[]" class="med-checkbox" value="${meds_data[i].name}"></td>
        </tr>
    `;
}
    // calculate invoice 
    const calculateBtn = document.getElementById("calculate");
calculateBtn.addEventListener("click", ()=> {
    let total = 0;
    const services = document.querySelectorAll('input[name="service[]"]:checked');
    const selectedMeds = document.querySelectorAll('input[name="selected_medications[]"]:checked');
    services.forEach(service => {
        const price = service.dataset.price;
        total += parseFloat(price);
    });
    const meds = document.querySelectorAll('input[name="medication[]"]');
    meds.forEach((med, i) => {
        const quantity = med.value;
        const price = meds_data[i].price;
        if (quantity > 0) {
            total += parseFloat(price) * parseInt(quantity);
            if (selectedMeds[i].checked) {
                total += 10;
            }
        }
    });
    alert(`The total price is ${total.toFixed(2)}$`);
});



    // change info
    const saveButton = document.querySelector('#change_info_pateint');
    saveButton.addEventListener('click', async (event)  =>{
        event.preventDefault(); 
  const name = document.querySelector('input[name="name"]').value;
  const ehr = document.querySelector('input[name="ehr"]').value;
  const bloodtype = document.querySelector('input[name="bloodtype"]').value;
  const token4 = localStorage.getItem('jwt');
  console.log(token4);
const info_url = hospital_pages.base_url + "change_info_patient.php"
const data = { "name": name, "ehr": ehr, "bloodtype": bloodtype };
const response_emp= await hospital_pages.postAPI(info_url,data,token4)
patient_data=response_emp.data
console.log(patient_data);
});
}



hospital_pages.load_employee =async ()=>{
    
    const saveButton = document.querySelector('#change_info');
    saveButton.addEventListener('click', async (event)  =>{
        event.preventDefault(); 
  const name = document.querySelector('input[name="name"]').value;
  const ssn = document.querySelector('input[name="ssn"]').value;
  const position = document.querySelector('select[name="position"]').value;
  const token3 = localStorage.getItem('jwt');
  console.log(token3);
const emp_url = hospital_pages.base_url + "change_info_employee.php"
const data = { "name": name, "ssn": ssn, "position": position  };
const response_emp= await hospital_pages.postAPI(emp_url,data,token3)
emp_data=response_emp.data
console.log(emp_data);

});

}
