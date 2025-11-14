import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useStockStore } from '../store/stockStore';

export default function StockScreen() {
  const { items, addStockItem, updateQuantity } = useStockStore();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('un');
  const [qty, setQty] = useState('0');
  const [min, setMin] = useState('5');

  const onAdd = () => {
    if (!name) return;
    addStockItem({ name, unit, quantity: parseFloat(qty), min: parseFloat(min) });
    setName(''); setUnit('un'); setQty('0'); setMin('5');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Estoque</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Item (ex: Pão)" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Unidade (ex: un, kg, L)" value={unit} onChangeText={setUnit} />
        <TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" value={qty} onChangeText={setQty} />
        <TextInput style={styles.input} placeholder="Mínimo" keyboardType="numeric" value={min} onChangeText={setMin} />
        <Button title="Adicionar" onPress={onAdd} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.quantity} {item.unit} (min: {item.min})</Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <Button title="-" onPress={() => updateQuantity(item.id, item.quantity - 1)} />
              <Button title="+" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  form: { flexDirection: 'column', gap: 8, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
