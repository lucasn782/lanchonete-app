import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSalesStore } from '../store/salesStore';
import { useStockStore } from '../store/stockStore';

export default function HomeScreen() {
  const todaySales = useSalesStore((s) => s.getTodaySummary());
  const lowStock = useStockStore((s) => s.getLowStock());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel - Lanchonete Sabor Caseiro</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo do Dia</Text>
        <Text>Vendas: {todaySales.totalSales}</Text>
        <Text>Itens vendidos: {todaySales.itemsSold}</Text>
        <Text>Faturamento: R$ {todaySales.revenue.toFixed(2)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estoque Baixo</Text>
        {lowStock.length === 0 ? (
          <Text>Sem alertas.</Text>
        ) : (
          lowStock.map((p) => (
            <Text key={p.id}>{p.name} - {p.quantity} {p.unit}</Text>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
});
