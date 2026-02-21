import { firebase } from '../config/firebase';

export const sendPushNotification = async (token: string, title: string, body: string) => {
  return firebase.messaging().send({ token, notification: { title, body } });
};
