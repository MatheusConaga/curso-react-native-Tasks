import { Alert } from "react-native";

const server = "http://10.0.0.32:3000";

function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert("Ocorreu um erro inesperado!", `Mensagem: ${err.response.data}`);
    } else {
        Alert.alert("Ocorreu um erro inesperado!", `Mensagem: ${err.message}`);
    }
}

function showSuccess(msg) {
    Alert.alert("Sucesso!", msg);
}

export { server, showError, showSuccess };
