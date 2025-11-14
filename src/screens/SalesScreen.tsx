import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import { useProductsStore } from '../store/productsStore';
import { useSalesStore } from '../store/salesStore';

export default function SalesScreen() {
  const { products } = useProductsStore();
  const { addSale } = useSalesStore();
  const [selected, setSelected] = useState<{ id: string; qty: number }[]>([]);
  const [customer, setCustomer] = useState('');

  const toggle = (id: string) => {
    const exists = selected.find((s) => s.id === id);
    if (exists) {
      setSelected(selected.filter((s) => s.id !== id));
    } else {
      setSelected([...selected, { id, qty: 1 }]);
    }
  };

  const changeQty = (id: string, qty: number) => {
    setSelected((prev) => prev.map((s) => (s.id === id ? { ...s, qty } : s)));
  };

  const onConfirm = () => {
    if (selected.length === 0) return;
    addSale({ customer, items: selected });
    setSelected([]);
    setCustomer('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Venda</Text>
      <TextInput placeholder="Cliente (opcional)" style={styles.input} value={customer} onChangeText={setCustomer} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const sel = selected.find((s) => s.id === item.id);
          return (
            <View style={styles.item}>
              <Text>{item.name} - R$ {item.price.toFixed(2)}</Text>
              {sel ? (
                <View style={styles.qtyRow}>
                  <Button title="-" onPress={() => changeQty(item.id, Math.max(sel.qty - 1, 1))} />
                  <Text style={{ marginHorizontal: 8 }}>{sel.qty}</Text>
                  <Button title="+" onPress={() => changeQty(item.id, sel.qty + 1)} />
                  <Button title="Remover" onPress={() => toggle(item.id)} />
                </View>
              ) : (
                <Button title="Selecionar" onPress={() => toggle(item.id)} />
              )}
            </View>
          );
        }}
      />
      <Button title="Confirmar Venda" onPress={onConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 8 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }
});
