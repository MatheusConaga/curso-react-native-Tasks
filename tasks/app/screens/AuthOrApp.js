import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AuthOrApp() {

    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const userDataJson = await AsyncStorage.getItem('userData');
            let userData = null;

            try {
                userData = JSON.parse(userDataJson);
            } catch (err) {
                console.error(err);
            }

            if (userData && userData.token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
                router.replace({
                    pathname: "/screens/home",
                    params: userData,
                });
            } else {
                router.replace({
                    pathname: "/screens/auth",
                });
            }
        };

        checkUser();
    }, [router]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
});
