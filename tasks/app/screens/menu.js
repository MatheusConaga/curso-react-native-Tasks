import React, { useState } from "react"
import { ScrollView, View, Text, StyleSheet, Platform, TouchableOpacity, Modal } from "react-native";
import { Gravatar } from "react-native-gravatar"
import { DrawerItemList } from "@react-navigation/drawer"
import commonStyles from "../../components/ui/commonStyles"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/FontAwesome"
import { useRouter } from "expo-router"

export default props => {
    const router = useRouter()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const logout = () => {
        delete axios.defaults.headers.common['Authorization'];
        AsyncStorage.removeItem('userData')
        router.replace({
            pathname: "/screens/AuthOrApp"
        })
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar}
                    options={{
                        email: props.email,
                        secure: true
                    }} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{props.nome}</Text>
                    <Text style={styles.email}>{props.email}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={{
                    borderBottomWidth: 1,
                    borderColor: "#ddd",
                    paddingVertical: 10,
                    backgroundColor: "#C62E2E",
                }}
                onPress={toggleModal} 
            >
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 20, marginRight: 10, color: "#fff", fontWeight: "bold" }}>Deslogar</Text>
                    <Icon name="sign-out" size={30} color="#fff" />
                </View>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirmação</Text>
                        <Text style={styles.modalMessage}>Deseja sair da sua conta?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={toggleModal}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={logout}
                            >
                                <Text style={styles.modalButtonText}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ paddingTop: 10, }}>
                <DrawerItemList {...props} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
        paddingBottom: 10,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 50,
        margin: 10,
        backgroundColor: "#222",
        marginTop: Platform.OS === "ios" ? 30 : 10,
    },
    title: {
        color: "#000",
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: Platform.OS === "ios" ? 50 : 30,
        padding: 10,
    },
    userInfo: {
        alignItems: "center",
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.color.mainText,
        marginBottom: 5
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.color.subText
    },
    logoutIcon: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    confirmButton: {
        backgroundColor: "#C62E2E",
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});
