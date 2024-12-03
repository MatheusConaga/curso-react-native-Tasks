import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="screens/AuthOrApp" options={{title: "Auth ou Home", headerShown: false}}/>
                <Stack.Screen name="screens/auth" options={{ title: "Login/Cadastro", headerShown: false }} />
                <Stack.Screen name="screens/home" options={{ title: "Tela incial", headerShown: false }} />
            </Stack>
        </>
    )
}