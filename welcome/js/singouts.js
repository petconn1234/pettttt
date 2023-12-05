import { ManageAccount } from '../../config/firebaseconect.js';

function signOutUser(){
    const account = new ManageAccount();
account.signOut();

}
