/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

// Firebase
import messaging from "@react-native-firebase/messaging"
const fcmUnsubscrib = null;



const App = () => {

  useEffect(() => {
    messaging()
    .requestPermission()
    .then( authStatus => {
      console.log("APNs Status: ", authStatus);

      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus == messaging.AuthorizationStatus.PROVISIONAL) {
        messaging()
        .getToken()
        .then( token => {
          console.log("messaging.getToken: ", token);
        })

        messaging()
        .onTokenRefresh( token => {
          console.log("messaging.onTokenRefresh: ", token);
        })

        messaging()
        .subscribeToTopic('dailyword')
        .then( () => {
          console.log("Subscribe to topic - Dailyword")
        })

        fcmUnsubscrib = messaging().onMessage( async remoteMessage => {
          console.log("A new message arrived! ", remoteMessage);
            Alert.alert(
              remoteMessage.notification.title,
              remoteMessage.notification.body
            )
        })

        messaging()
        .onNotificationOpenedApp( remoteMessage => {
          console.log("Notification caused app to open from background state: ", remoteMessage);
        })

        messaging()
        .getInitialNotification()
        .then( remoteMessage => {
          if (remoteMessage) {
            console.log("Notification caused app to open from quit state: ", remoteMessage);
          }
        })
      }

    })
    .catch( err => {
      console.log("messaging.requestPermission Error: ", err)
    }) 
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "red", margin: 0, padding: 0}}>
      <StatusBar/>
      <ScrollView
      contentContainerStyle={{flex: 1, justifyContent: "center", alignItems: "center"}}
        style={{backgroundColor: "red", margin: 0, padding: 0}}
        contentInsetAdjustmentBehavior="automatic">
        <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
          <TouchableOpacity style={{backgroundColor: "pink", paddingVertical: 20, paddingHorizontal: 10, borderRadius: 15}}>
            <Text style={{fontSize: 35, fontWeight: "bold", color: "orange"}}>Firebase Message Test</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
