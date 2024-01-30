const logOut = async () => {  
  try {
    localStorage.removeItem("access_token");
  } catch (err){
    console.log(err)
  }
}

export default logOut