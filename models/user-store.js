import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

//initalises users.json file using lowdb
const db = initStore("users");

//initialises userStore object
export const userStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  //Reads usersDb. Takes user as input. Adds UUID from lowDB to user. adds user to DB
  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  //Reads usersDb. Takes userId as input. filters Db where userId = database userId and return user.

  async getUserById(id) {
    await db.read();
    const list = db.data.users.find((user) => user._id === id);
    return list;
  },

  //Reads usersDb. Takes userEmail as input. filters Db where userEmail = database userEmail and return user.

  async getUserByEmail(email) {
    await db.read();
    return db.data.users.find((user) => user.email === email);
  },

  /*Reads usersDb. Takes userId as input. filters Db where userId = database userId and retrieves index.
  deletes report from DB using splice from index position and deleting 1 position.
  */

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },

  //replaces users contents with blank array

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },

  /*takes user and updated user as parameters. sets user.details with updatedUser.details and writes to DB.
   */

  async updateUser(details, updatedDetails) {
    details.firstName = updatedDetails.firstName;
    details.surname = updatedDetails.surname;
    details.email = updatedDetails.email;
    details.password = updatedDetails.password;
    await db.write();
  },
};
