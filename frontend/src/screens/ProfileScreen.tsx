import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useAppSelector } from "../hooks/useAppSelector";
import AdminPanel from "../components/profile/AdminPanel";

export type ProfileStackParams = {
    Profile: undefined,
    AdminPanel?: undefined
}

const ProfileStack = createNativeStackNavigator<ProfileStackParams>()

export default function ProfileScreen() {
    const { is_staff } = useAppSelector(state => state.login.user)
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={Profile} />
            {is_staff && <ProfileStack.Screen name="AdminPanel" component={AdminPanel} />}
        </ProfileStack.Navigator>
    )
}

const Profile = () => {
    const tw = useTailwind()
    const { user } = useAppSelector(state => state.login)
    const { username, is_staff } = user

    return (
        <View style={tw('p-4')}>
            <Text style={tw('font-medium text-xl')}>Witaj <Text style={tw('text-primary')}>{username}!</Text></Text>
            {is_staff && <Pressable style={tw('bg-blue-400 py-3 px-6')}><Text>Admin Panel</Text></Pressable>}
        </View>
    )
}