import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFinancialReport } from "../hooks/useFinancialReport"; 

export default function FinancialReportScreen() { 
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    totalReceivable,
    totalPayable,
  } = useFinancialReport();

  const handleDateChange = (setter, setShow) => (_, selected) => {
    setShow(false);
    if (selected) setter(selected);
  };
  
const chartData = [
    {
      name: "A Receber", 
      amount: totalReceivable,
      color: "#4CAF50",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "A Pagar", 
      amount: totalPayable,
      color: "#F44336",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório Financeiro</Text> 

      <View style={styles.datePickerContainer}>
        <Pressable
          onPress={() => setShowStartPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {startDate.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </Pressable>
        <Text style={styles.dateSeparator}>até</Text> 
        <Pressable
          onPress={() => setShowEndPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {endDate.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </Pressable>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleDateChange(setStartDate, setShowStartPicker)}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleDateChange(setEndDate, setShowEndPicker)}
        />
      )}

      <ScrollView>
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={300}
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"amount"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.totalCard}>
            <Text style={styles.totalTitle}>Total a Receber</Text> 
            <Text style={styles.totalValue}>R$ {totalReceivable.toFixed(2)}</Text>
          </View>
          <View style={styles.totalCard}>
            <Text style={styles.totalTitle}>Total a Pagar</Text> 
            <Text style={styles.totalValue}>R$ {totalPayable.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0056B3",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  dateSeparator: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  totalContainer: {
    paddingHorizontal: 10,
  },
  totalCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
  },
  totalTitle: {
    fontSize: 16,
    fontFamily: "Montserrat",
    color: "#2C2F33",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#0056B3",
    marginTop: 5,
  },
});