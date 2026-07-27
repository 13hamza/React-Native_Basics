import { ScrollView, Text, View } from 'react-native';

// ❌ BAD for large lists - renders 1000 items immediately
const BadList = () => (
  <ScrollView>
    {Array.from({ length: 100 }, (_, i) => (
      <View key={i} style={{ padding: 20, borderBottomWidth: 1 }}>
        <Text>Item #{i + 1}</Text>
      </View>
    ))}
  </ScrollView>
);
export default BadList;