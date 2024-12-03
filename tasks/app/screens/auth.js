import React, { useState } from "react";
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backgroundImage from "../../assets/imgs/login.jpg";
import commonStyles from "../../components/ui/commonStyles";
import AuthInput from "../../components/AuthInput";
import { server, showError, showSuccess } from "../common";
import { useRouter } from "expo-router";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    stageNew: false,
};

export default function Auth() {
    const [state, setState] = useState(initialState);
    const router = useRouter();

    const signinOrSignup = () => {
        if (state.stageNew) {
            signup();
        } else {
            signin();
        }
    };

    const signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: state.name,
                email: state.email,
                password: state.password,
                confirmPassword: state.confirmPassword,
            });

            showSuccess("Usuário cadastrado!");
            setState({ ...initialState });
        } catch (e) {
            showError(e);
        }
    };

    const signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: state.email,
                password: state.password,
            });

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common["Authorization"] = `bearer ${res.data.token}`;
            router.replace({
                pathname: "/screens/home",
                params: res.data,
            })

        } catch (e) {
            showError(e)
        }
    };

    const validations = [];
    validations.push(state.email && state.email.includes("@"))
    validations.push(state.password && state.password.length >= 6)

    if (state.stageNew) {
        validations.push(state.name && state.name.trim().length >= 3)
        validations.push(state.confirmPassword === state.confirmPassword)
    }

    const validForm = validations.reduce((t, a) => t && a)

    return (


        <ImageBackground source={backgroundImage} style={styles.background}>
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>
                    {state.stageNew ? "Crie a sua conta" : "Informe seus dados"}
                </Text>
                {state.stageNew && (
                    <AuthInput
                        icon="user"
                        style={styles.input}
                        placeholder="Insira seu Nome"
                        value={state.name}
                        onChangeText={(name) => setState({ ...state, name })}
                    />
                )}
                <AuthInput
                    icon="at"
                    style={styles.input}
                    placeholder="Insira seu Email"
                    value={state.email}
                    onChangeText={(email) => setState({ ...state, email })}
                />
                <AuthInput
                    icon="lock"
                    style={styles.input}
                    placeholder="Insira sua Senha"
                    value={state.password}
                    secureTextEntry={true}
                    onChangeText={(password) => setState({ ...state, password })}
                />
                {state.stageNew && (
                    <AuthInput
                        icon="lock"
                        style={styles.input}
                        placeholder="Confirme sua Senha"
                        value={state.confirmPassword}
                        secureTextEntry={true}
                        onChangeText={(confirmPassword) =>
                            setState({ ...state, confirmPassword })
                        }
                    />
                )}
                <TouchableOpacity onPress={signinOrSignup}
                    disabled={!validForm}>
                    <View style={[styles.button, validForm ? {} : { backgroundColor: "#aaa" }]}>
                        <Text style={styles.buttonText}>
                            {state.stageNew ? "Cadastrar" : "Entrar"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => setState({ ...state, stageNew: !state.stageNew })}>
                <Text style={styles.buttonText}>
                    {state.stageNew ? "Já possui conta?" : "Ainda não possui conta?"}
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.secondary,
        fontSize: 60,
        marginBottom: 10,
        fontWeight: "bold",
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    formContainer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 20,
        width: "90%",
    },
    input: {
        marginTop: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#080",
        marginTop: 10,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: "#fff",
        fontSize: 20,
    },
});
