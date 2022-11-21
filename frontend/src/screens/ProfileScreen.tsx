import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useAppSelector } from "../hooks/useAppSelector";
import AdminPanel from "../components/profile/AdminPanel";
import { logout } from "../../reducers/login";
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp } from "@react-navigation/native";

export type ProfileStackParams = {
    ProfileStack: undefined,
    AdminPanel?: undefined
}

const ProfileStack = createNativeStackNavigator<ProfileStackParams>()

export default function ProfileScreen() {
    const { is_staff } = useAppSelector(state => state.login.user)
    return (
        <ProfileStack.Navigator initialRouteName="ProfileStack">
            <ProfileStack.Screen name="ProfileStack" component={Profile} options={{
                title: 'Profil'
            }} />
            {is_staff && <ProfileStack.Screen name="AdminPanel" component={AdminPanel} options={{
                title: 'Panel administracyjny'
            }} />}
        </ProfileStack.Navigator>
    )
}

type ProfileNavigation = NavigationProp<ProfileStackParams, 'ProfileStack'>

const Profile = ({ navigation }: { navigation: ProfileNavigation}) => {
    const tw = useTailwind()
    const dispatch = useDispatch()
    const { user } = useAppSelector(state => state.login)
    const { username, is_staff } = user

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user')
        dispatch(logout())
    }

    return (
        <View style={tw('p-4')}>
            <Text style={tw('font-medium text-xl')}>Witaj <Text style={tw('text-primary')}>{username}!</Text></Text>
            {is_staff && <Pressable onPress={() => navigation.navigate('AdminPanel')} style={tw('bg-blue-400 py-3 px-6 my-4')}><Text style={tw('text-white font-medium')}>Admin Panel</Text></Pressable>}
            <Pressable onPress={handleLogout}><Text style={tw('text-red-400 font-medium')}>Wyloguj</Text></Pressable>
        </View>
    )
}