const hospital_pages={};

hospital_pages.base_url='http://localhost/hospital_fullstack/hospital_backend/';

hospital_pages.getAPI = async (api_url) =>{
    try{
        return await axios(api_url)
    }catch(error){
        console.log('Error from GET API')
    }
}

hospital_pages.postAPI = async (api_url,api_data) =>{
    try{
        return await axios.post(
            api_url,
            api_data,
            
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
        event.preventDefault()})
    const email= document.getElementById("email").value;
    const password= document.getElementById("password").value;
    const data = { email: email, password: password };
    const signin_url = hospital_pages.base_url + "signin.php"
    const response=  hospital_pages.postAPI(signin_url,data)
    
    console.log(response.data); 
    if (response.data.status !== null) {
        window.location.href = "adminpanel.html";}
        else {
            const error_message = document.createElement("div");
            error_message.textContent = "Incorrect email or password.";
            form.appendChild(error_message);
          }

    alert("heyyy")
}




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
