const hospital_pages={};

hospital_pages.basee_url='http://localhost/hospital_backend/hospital_backend/';

hospital_pages.getAPI = async (api_url) =>{
    try{
        return await axios(api_url)
    }catch(error){
        console.log('Erro from GET API')
    }
}

hospital_pages.postAPI = async (api_url,api_data,api_token = null) =>{
    try{
        return await axios.post(
            api_url,
            api_data,
            {
                headers: {'Athourization' : "token" + api_token} 
            }
            )
    }catch(error){
        console.log('Erro from POST API')
    }
}

hospital_pages.loadFor = (page) => {
    eval ("hospital_pages.load_" + page+"();")
    
}

hospital_pages.laod_landing = ()=>{
    alert('hey')
}

