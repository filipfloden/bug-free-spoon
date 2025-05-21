import { getContainerById } from '@/database/db'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { Text, View } from 'react-native'

export default function ContainerDetail() {
    const { id } = useLocalSearchParams()
    const container = useMemo(() => getContainerById(id as string), [id])

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={{ fontSize: 24 }}>Container ID: {container.id}</Text>
            <Text style={{ fontSize: 24 }}>
                Container Name: {container.name}
            </Text>
        </View>
    )
}
