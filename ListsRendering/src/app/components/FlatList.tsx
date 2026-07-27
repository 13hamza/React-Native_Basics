import { FlatList, Text, View } from 'react-native';

// ✅ GOOD - only renders what's visible
const GoodList = () => {
  const data = Array.from({ length: 1000 }, (_, i) => ({
    id: i.toString(),
    title: `Item #${i + 1}`
  }));

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={{ padding: 20, borderBottomWidth: 1 }}>
          <Text>{item.title}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};
export default GoodList;