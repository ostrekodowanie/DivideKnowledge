import { NavigationContainer } from '@react-navigation/native';

import { useTailwind } from 'tailwind-rn'
import TabNav from './TabNav';

export default function Nav() {
    const tw = useTailwind();
    return (
        <>
            <NavigationContainer>
                <TabNav />
            </NavigationContainer>
        </>
    )
}