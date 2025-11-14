import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useProductsStore } from '../store/productsStore';

export default function ProductsScreen() {
  const { products, addProduct, removeProduct } = useProductsStore();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const onAdd = () => {
    if (!name || !price) return;
    addProduct({ name, price: parseFloat(price) });
    setName('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Produtos</Text>
      <View style={styles.form}>        
        <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Preço" keyboardType="numeric" value={price} onChangeText={setPrice} />
        <Button title="Adicionar" onPress={onAdd} />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - R$ {item.price.toFixed(2)}</Text>
            <Button title="Remover" onPress={() => removeProduct(item.id)} />
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
