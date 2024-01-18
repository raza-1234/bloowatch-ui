import api from "../axios/api";

const logOut = async () => {  
  try {
    await api.get("/logOut");
    localStorage.removeItem("access_token");
  } catch (err){
    console.log(err)
  }
}

export default logOut