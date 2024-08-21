import {userStore} from "../models/user-store.js"

export const accountsController = {
  
  index(request,response) {
    const viewData = {
      title: "Login or Signup"
    };
    console.log("opening landing page");
    response.render("index",viewData);
  },
  
  login(request,response) {
    const viewData = {
      title: "login to weathertop"
    };
    console.log ("opening login page");
    response.render("login-view",viewData);
  },
  
  logout(request,response) {
    const viewData = {
      title: "logout of weathertop"
    };
    console.log("returning to landing page");
    response.redirect("/");
  },
  
  signup(request,response) {
    const viewData = {
      title: "sign up to weathertop"
    };
    console.log("opening signup page");
    response.render("signup-view",viewData);
  },
  
  updateUser(request,response){
    const viewData = {
      title: "Update User Details",
    };
    console.log("opening update user page");
    response.render("settings-view",viewData);
    
  },
  
  async registerUpdate(request,response){
    
    const updatedUser = {
      firstName: request.body.firstName,
      surname: request.body.surname,
      email: request.body.email,
      password:request.body.password,
      
    };
    
    const userToUpdate = await userStore.getUserByEmail(request.body.currentEmail);
    console.log(`Updating user ${userToUpdate.firstName}`)
    await userStore.updateUser(userToUpdate,updatedUser);
    response.redirect("/login");
  },
  
  async register(request,response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`adding user ${user.email}`);
    response.redirect("/")
  },
  
  async authenticate(request,response) {
    const user = await userStore.getUserByEmail(request.body.email)
    if ((user) && (user.password == request.body.password))  {
      response.cookie("station",user.email);
      console.log(`logging in user ${user.email}`);
      response.redirect("/dashboard");
    }
    else {
      console.log("user email or password incorrect");
      response.redirect("/login");
    }
  },
  
  async getLoggedInUser(request){
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
  
};