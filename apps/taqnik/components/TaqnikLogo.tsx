import { StyleSheet, Text, View } from 'react-native';

export default function TaqnikLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TAQNIK</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
}); 