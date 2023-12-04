import { ManageAccount } from '../../config/firebaseconect.js';


function logout(){

    const account = new ManageAccount();
    account.signOut();

    console.log("buen dia");
}