import firebase from "../firebase";

import { observable, action, reaction } from "mobx";
import { RootStore } from "./rootStore";
import { User } from "firebase";
import { IUser } from "../models/user";

export default class UserStore {
    rootStore: RootStore;
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        this.auth.onAuthStateChanged( (user: User) => {
            if (user) {
              // User is signed in.
              console.log('Logged  In');
              this.currentUser = user;
            } else {
              // No user is signed in.
              this.currentUser = null;
              console.log('Logged Out');
            }
          });

      reaction(
        () => this.currentUser,
        (currentUser: User | null) => this.isLoggedIn()
      )
    }

    private auth = firebase.auth;
    private userRef = firebase.db.ref('users');

    @observable currentUser: User | null = null;

    @action registerUser = (email: string, type: string) => {
        let actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be whitelisted in the Firebase Console.
          url: `http://localhost:3000/complete-sign-up?email=${email}`,
          // This must be true.
          handleCodeInApp: true
        };
        this.auth.sendSignInLinkToEmail(email,actionCodeSettings)
        .then((response: any) => {
            console.log(response);
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', email);
        })
        .catch(function(error: any) {
          // Some error occurred, you can inspect the code: error.code
        });
    }

    @action completeSignUp = ( email: string | string[] | null | undefined, userType: string) => {
        if (this.auth.isSignInWithEmailLink(window.location.href) && email) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
              // if (!email) {
              //   // User opened the link on a different device. To prevent session fixation
              //   // attacks, ask the user to provide the associated email again. For example:
              //   email = window.prompt('Please provide your email for confirmation');
              // }
             
            // The client SDK will parse the code from the link for you.
            this.auth.signInWithEmailLink(email, window.location.href)
              .then((result: any) => {
                // Clear email from storage.
                // window.localStorage.removeItem('emailForSignIn');
                // You can access the new user via result.user
                this.currentUser = result.user;
                this.userRef.push({uid: this.currentUser!.uid, type: userType});
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
              })
              .catch(function(error: any) {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
              });
          } else {
            // alert("Use the sign in link in your email")
          }
    }

    @action updateUserProfile = ( userInfo: any ) => {
      if (!this.currentUser) {
        alert("User is not logged in!");
      } else {
        this.currentUser.updateProfile({
          displayName: userInfo.fullName,
        }).then(() => {
          // Update displayName successful.
          //Update Password
          this.currentUser!.updatePassword(userInfo.password).then(function() {
            // Update Password successful.
          }).catch(function(error) {
            // An error happened.
            console.log(error);

          });
        }).catch(function(error) {
          // An error happened.
          console.log(error);
        });
      }
    }

    @action login = ( email: string, password: string) => {
      return new Promise((resolve, reject) => {
        this.auth.signInWithEmailAndPassword(email, password)
          .then((result: any) => {
            resolve(result) 
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    }

    @action logOut = () => {
      return new Promise((resolve, reject) => {
        this.auth.signOut().then((authResult: any) => {
          resolve(authResult);
        }).catch((error: any) => reject(error));
      })    
  }
    @action isLoggedIn = () : boolean => {
      console.log(this.currentUser !== null);
      return this.currentUser !== null;
    }

}