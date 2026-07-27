import { FlatList, Text, View, Image } from 'react-native';

const UserList = () => {
  const users = [
    { id: '1', name: 'Alice', avatar: 'https://...' },
    { id: '2', name: 'Bob', avatar: 'https://...' },
    { id: '3', name: 'Charlie', avatar: 'https://...' }
  ];

  return (
    <FlatList
      data={users}
      renderItem={({ item, index, separators }) => (
        <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: item.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: 'gray' }}>User #{index + 1}</Text>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};
export default UserList;