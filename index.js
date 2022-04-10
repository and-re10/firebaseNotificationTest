/**
 * @format
 */

import React from "react";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//Firebase
import messaging from "@react-native-firebase/messaging"

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Message is handled in the background");
});

const MyApp = ({ isHeadles }) => {

    if (isHeadles) {
        console.log("App lounched by IOS background, ignore it.");
        return null;
    };

    return (
        <App/>
    )
}

AppRegistry.registerComponent(appName, () => MyApp);
