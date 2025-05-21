import { ROUTES } from '@/constants/routes'
import { addContainer, getContainers, removeContainer } from '@/database/db'
import { Link, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import {
    Alert,
    FlatList,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import type { Container } from '@/types/storage'

export default function Menu() {
    const navigation = useNavigation()
    const [containers, setContainers] = useState<Container[]>(
        getContainers() as Container[]
    )

    const onAddPress = () => {
        Alert.prompt('Add container', 'Enter a name for your new container', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: (text) => {
                    if (!text || text.trim() === '') {
                        Alert.alert(
                            'Name required',
                            'Please enter a container name.'
                        )
                        return
                    }
                    onAddContainer(text)
                },
            },
        ])
    }

    const onAddContainer = (text: string) => {
        addContainer(text)
        setContainers(getContainers() as Container[])
        Keyboard.dismiss()
    }

    const onDeleteContainer = (id: string) => {
        removeContainer(id)
        setContainers(getContainers() as Container[])
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={onAddPress} style={{ marginRight: 25 }}>
                    <Text style={{ fontSize: 28, lineHeight: 32 }}>+</Text>
                </Pressable>
            ),
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={containers}
                renderItem={({ item, index }) =>
                    renderItem({ item, index, onDeleteContainer })
                }
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={renderSeparator}
                ListEmptyComponent={renderEmpty}
            />
        </SafeAreaView>
    )
}

function renderItem({
    item,
    index,
    onDeleteContainer,
}: {
    item: Container
    index: number
    onDeleteContainer: (id: string) => void
}) {
    const renderRightActions = () => (
        <Pressable
            onPress={() => {
                Alert.alert(
                    'Delete this container?',
                    'Are you sure you want to delete this container?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => onDeleteContainer(item.id),
                        },
                    ]
                )
            }}
            style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                width: 80,
                height: '100%',
            }}
        >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
        </Pressable>
    )

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            overshootRight={false}
        >
            <Link
                href={ROUTES.STORAGE_CONTAINER_DETAIL(item.id) as any}
                asChild
            >
                <Pressable>
                    <View style={styles.row}>
                        <View
                            style={[
                                styles.item,
                                { backgroundColor: '#f9c2ff' },
                            ]}
                        >
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                    </View>
                </Pressable>
            </Link>
        </Swipeable>
    )
}

function renderSeparator() {
    return (
        <View
            style={{
                height: 1,
                width: '100%',
                backgroundColor: '#CED0CE',
            }}
        />
    )
}

function renderEmpty() {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>No items found</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '90%',
    },
    item: {
        width: '100%',
        padding: 12,
    },
    title: {
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
    },
})
