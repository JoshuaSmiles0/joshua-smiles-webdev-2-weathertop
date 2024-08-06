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
  
  async register(request,response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`adding user ${user.email}`);
    response.redirect("/")
  },
  
  async authenticate(request,response) {
    const user = await userStore.getUserByEmail(request.body.email)
    if (user) {
      response.cookie("station",user.email);
      console.log(`logging in user ${user.email}`);
      response.redirect("/dashboard");
    }
    else {
      console.log("user does not exist");
      response.redirect("/login");
    }
  },
  
  async getLoggedInUser(request){
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
  
};