import { setupDatabase } from '@/database/db'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
    useEffect(() => {
        setupDatabase()
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack />
        </GestureHandlerRootView>
    )
}
