import { Link } from 'expo-router'
import {
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

const TEST_DATA: Item[] = [
    { id: '1', title: 'Box 1' },
    { id: '2', title: 'Box 2' },
    { id: '3', title: 'Box 3' },
]

export default function Menu() {
    return (
        <SafeAreaView>
            <FlatList
                data={TEST_DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 1,
                            width: '100%',
                            // backgroundColor: '',
                        }}
                    />
                )}
                ListEmptyComponent={() => (
                    <View style={styles.item}>
                        <Text style={styles.title}>No items found</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

type Item = {
    id: string
    title: string
}

function renderItem({ item }: { item: Item }) {
    return (
        <Link href={`/${item.id}`} asChild>
            <Pressable>
                <View style={styles.row}>
                    <View style={[styles.item, { backgroundColor: '#f9c2ff' }]}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
    row: {
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: 16,
    },
})
