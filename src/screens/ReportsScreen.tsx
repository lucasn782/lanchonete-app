import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSalesStore } from '../store/salesStore';
import { useProductsStore } from '../store/productsStore';

export default function ReportsScreen() {
  const { sales, getRevenueByDay, getTopProducts } = useSalesStore();
  const { getById } = useProductsStore();

  const top = getTopProducts(5);
  const byDay = getRevenueByDay();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Faturamento por Dia (últimos 7)</Text>
        {byDay.slice(-7).map((d) => (
          <Text key={d.date}>{d.date}: R$ {d.revenue.toFixed(2)}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top Produtos</Text>
        <FlatList
          data={top}
          keyExtractor={(i) => i.productId}
          renderItem={({ item }) => (
            <Text>{getById(item.productId)?.name || 'Produto'} - {item.qty} un</Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: '700' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
});
