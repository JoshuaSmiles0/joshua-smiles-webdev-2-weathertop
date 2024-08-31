import { userStore } from "../models/user-store.js";

export const accountsController = {
  //renders Weathertop landing page on request
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    console.log("opening landing page");
    response.render("index", viewData);
  },
  //renders Login page on request
  login(request, response) {
    const viewData = {
      title: "login to weathertop",
    };
    console.log("opening login page");
    response.render("login-view", viewData);
  },
  //renders Login page with invalid password or email message on request
  loginInvalid(request, response) {
    const viewData = {
      title: "Try to login to weathertop again",
    };
    console.log("Incorrect Login Details");
    response.render("login-view-invalid", viewData);
  },
  //redirects user to landing page when account is logged out
  logout(request, response) {
    const viewData = {
      title: "logout of weathertop",
    };
    console.log("returning to landing page");
    response.redirect("/");
  },
  //renders sign in page on request
  signup(request, response) {
    const viewData = {
      title: "sign up to weathertop",
    };
    console.log("opening signup page");
    response.render("signup-view", viewData);
  },
  //opens settings page for updating user details on request
  async updateUser(request, response) {
    const user = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Update User Details",
      user: user,
    };
    console.log("opening update user page");
    response.render("settings-view", viewData);
  },
  /*creates object from input user details in settings view then attempts to replace old
  details with new in user store then redirects user to login page.
  */
  async registerUpdate(request, response) {
    const updatedUser = {
      firstName: request.body.firstName,
      surname: request.body.surname,
      email: request.body.email,
      password: request.body.password,
    };

    const userToUpdate = await accountsController.getLoggedInUser(request);
    console.log(`Updating user ${userToUpdate.email}`);

    await userStore.updateUser(userToUpdate, updatedUser);
    response.redirect("/login");
  },
  /* Retrieves user user from signup view request via route. Attempts to add new user to
  user store. Redirects user to landing page
  */
  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`adding user ${user.email}`);
    response.redirect("/");
  },

  /*retrieves exisitng user from user store using email input in login view form. If user exists
  and user input password matches stored password on user object, creates cookie then redirects user
  to their own dashboard view via route. If conditions not met, redirects user to loginInvalid page via
  route.
  */
  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user && user.password == request.body.password) {
      response.cookie("station", user.email);
      console.log(`logging in user ${user.email}`);
      response.redirect("/dashboard");
    } else {
      console.log("user email or password incorrect");
      response.redirect("/loginInvalid");
    }
  },

  //retrieves user email from set cookie. uses email to return user object from DB by email.

  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
};
