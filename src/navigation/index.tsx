import React, { useEffect } from "react";
import { initializeApp, getApps} from 'firebase/app';
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./AuthStack";
import Main from "./MainStack";
import { apiKey, databaseURL, authDomain, storageBucket } from '@env'
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ActivityIndicator } from "react-native";

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: "",
    storageBucket: storageBucket,
    messagingSenderId: "",
    appId: "",
};
if (getApps.length === 0) {
    initializeApp(firebaseConfig)
}

const Navigation = () => {

    const { user, authenticated } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        checkLogin();
    }, []);

    function checkLogin() {
        const auth = getAuth();

        onAuthStateChanged(auth, function (u) {
            if (u) {
                dispatch({ type: "USER", payload: { user: u, auth: true } })
            } else {
                dispatch({ type: "USER", payload: { user: null, auth: false } })
            }
        });
    }

    return (
        <NavigationContainer>
            {authenticated === null && <ActivityIndicator style={{ flex: 1 }} />}
            {authenticated === false && <Auth />}
            {authenticated === true && <Main />}
        </NavigationContainer>
    );
};

export default Navigation