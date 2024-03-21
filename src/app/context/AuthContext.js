'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider,createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, doc, setDoc, getDocs,  Timestamp } from "firebase/firestore";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDatas, setUserData] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };

  const appleSignIn = () => {
    const provider = new OAuthProvider('apple.com');
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const updateProfile = async (displayName, bio, phoneNumber, location, profileimgae) => {
    try {
      // Update user's data in Firestore
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = {
          displayName: displayName,
          email: auth.currentUser.email,
          bio: bio,
          phoneNumber: phoneNumber,
          location: location,
          profileimgae: profileimgae,
        };
        await setDoc(userRef, userData, { merge: true });
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const PaymentUpdate = async (cardNumber, expireDate, country, cvc, zip) => {
    try {
      // Update user's data in Firestore
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = {

          payment: {
            cardNumber: cardNumber,
            expireDate: expireDate,
            country: country,
            cvc: cvc,
            zip: zip,
          },

        };
        await setDoc(userRef, userData, { merge: true });
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };
  const bussinessInfo = async (country, taxId) => {
    try {
      // Update user's data in Firestore
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = {

          bussinessRegistration: {
            country: country,
            taxId: taxId,
          }

        };
        await setDoc(userRef, userData, { merge: true });
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const AddressDetails = async (name, streetaddress, country, apt, state, zipcode) => {
    try {
      // Update user's data in Firestore
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = {
          addressname: name,
          streetaddress: streetaddress,
          country: country,
          apt: apt,
          state: state,
          zipcode: zipcode,
        };
        await setDoc(userRef, userData, { merge: true }); // Changed to setDoc
        console.log("Address updated successfully");
        // Assuming you want to display a success toast here
      } else {
        console.error("No user logged in");
      }
    } catch (error) {
      console.error("Error updating address:", error.message);
      // Assuming you want to display an error toast here
      toast.error("Failed to update address");
    }
  };
  // for the developer 
 
  // for the developer  after add pyament method work with the feedback section remove the dummy data form it
  const FeebackFunction = async (sellerID, date, description, bacth, productName, customerId, customerDisplayName, desinger, productimgae) => {
    try {
      // Update user's data in Firestore
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = {

          feedbacks: [
            {
              sellerID: sellerID,// seller Id is on monodb models product Scheema
              date: Date.now(),
              reting: 0,
              description: description,
              bacth: bacth,
              productName: productName,
              desinger: desinger, //seller name
              productimgae: productimgae,
              customerId: customerId,
              customerDisplayName: customerDisplayName, // customer id is the user uid
            },

          ],

        };
        await setDoc(userRef, userData, { merge: true });
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };



  const createAccountWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      setUser(user);
      // You can add additional actions after successful account creation, such as updating user profile.
    } catch (error) {
      console.error("Error creating account:", error.message);
    }
  };




  
  const getAllUsersData = async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const snapshot = await getDocs(usersCollectionRef);
      const usersData = snapshot.docs.map(doc => doc.data());
      console.log(usersData)

      // Log the retrieved users data
      return usersData;
    } catch (error) {
      console.error("Error fetching all users data:", error.message);
      return [];
    }
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Save user name and email to Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          userid: currentUser.uid,
          feedbacks: [
            {
              sellerID: currentUser.uid,
              date: Date.now(),
              reting: 1,
              description: 'very nice',
              bacth: 'Item as described',
              productName: "Nike Vintage Y2K Nylon Baggy Track Pants Double Swoosh",
              desinger: "",
              productimgae: "https://media-assets.grailed.com/prd/listing/temp/9bd7f114f90e4c85a799184484e5aa2f?w=120&fit=clip&q=40&auto=format",
              customerId: "",
              customerDisplayName: "freed"
            },
            {
              sellerID: currentUser.uid,
              date: Date.now(),
              reting: 4,
              description: "very nice",
              bacth: 'fast shipper',
              productName: "Nike Vintage Y2K Nylon Baggy Track Pants Double Swoosh",
              desinger: "",
              productimgae: "https://media-assets.grailed.com/prd/listing/temp/542cf3edad86493a9600e874434abe0c?w=120&fit=clip&q=40&auto=format",
              customerId: "",
              customerDisplayName: "jhon"

            },
            {
              sellerID: currentUser.uid,
              date: Date.now(),
              reting: 3,
              description: "very nice",
              bacth: 'quick reply',
              productName: "Nike Vintage Y2K Nylon Baggy Track Pants Double Swoosh",
              desinger: currentUser.displayName,
              productimgae: "https://media-assets.grailed.com/prd/listing/temp/542cf3edad86493a9600e874434abe0c?w=120&fit=clip&q=40&auto=format",
              customerId: "",
              customerDisplayName: "roman"
            }
          ],

          follow: [],
          wishlist: [],
          transtion: 0,
          joinDate: Timestamp.now(), 
    


        };
        await setDoc(userRef, userData, { merge: true });
        getAllUsersData()
      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ user, googleSignIn,  facebookSignIn, appleSignIn, logOut, updateProfile, PaymentUpdate, AddressDetails, bussinessInfo, getAllUsersData,createAccountWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
