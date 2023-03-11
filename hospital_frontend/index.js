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
                    "Content-Type": "application/json",
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
        // const response_string = JSON.stringify(response.data);
        // const parsed_data = JSON.parse(response.data);
        console.log(typeof response.data);
        // console.log(typeof response.data['user_type']); 
        if (response.data.user_type == 3) {
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


       
    // localStorage.setItem('jwt', token);




hospital_pages.load_admin = ()=>{
    alert(' helloadmin')
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