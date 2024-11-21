
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCOtML6mEnFXtBhZcSgFJ6EWoPMnhz9ONA",
  authDomain: "auctiongems-aa8d5.firebaseapp.com",
  projectId: "auctiongems-aa8d5",
  storageBucket: "auctiongems-aa8d5.appspot.com",
  messagingSenderId: "81772822293",
  appId: "1:81772822293:web:de5845573aace7c26ab31c",
  measurementId: "G-9LWX6VB9X1"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging,{vapidKey:'BHZsbJRrrSr9OH50FMvf04BJdowUihkG8xeQaKKUbklq5x3RxTcVCeb8GN8RdOPN_3hwp_FgiXhZ1pHQSueMPbo'});
      console.log(token);
      return token;
    } else {
      console.log("Permission for notification was denied");
      return null;
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

export const onMessageListener = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      onMessage(messaging, (payload) => {
        if (payload) {
          resolve(payload);
        } else {
          reject(new Error("Message payload is empty"));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};