import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer"
import TaskList from "./TaskList"
import { Icon } from "react-native-elements";
import commonStyles from "../../components/ui/commonStyles";
import Menu from "./menu";
import { useLocalSearchParams } from "expo-router"

const Drawer = createDrawerNavigator();


export default function Home() {

    const params = useLocalSearchParams()
    const email = params.email
    const nome = params.name
    const convert = JSON.stringify(params)
    console.log("Os parametros passados foram: " + convert)


    return (

        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={(props) => <Menu nome={nome} email={email} {...props} />}
        >
            <Drawer.Screen
                name="Today"
                options={{ title: "Hoje", drawerActiveTintColor: commonStyles.color.today }}
                component={(props) => <TaskList title="Hoje" daysAhead={0} {...props} />}
            />
            <Drawer.Screen
                name="Tomorrow"
                options={{ title: "Amanhã", drawerActiveTintColor: commonStyles.color.tomorrow }}
                component={(props) => <TaskList title="Amanhã" daysAhead={1} {...props} />}
            />
            <Drawer.Screen
                name="Week"
                options={{ title: "Semana", drawerActiveTintColor: commonStyles.color.week }}
                component={(props) => <TaskList title="Semana" daysAhead={7} {...props} />}
            />
            <Drawer.Screen
                name="Month"
                options={{ title: "Mês", drawerActiveTintColor: commonStyles.color.month }}
                component={(props) => <TaskList title="Mês" daysAhead={30} {...props} />}
            />
        </Drawer.Navigator>

    )


}