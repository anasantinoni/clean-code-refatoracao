import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Button from "../components/CustomButton"; 
import { logout, verifyAuth } from "../actions/auth";
import { useNavigation } from "@react-navigation/native"; 

export default function HomeScreen() {
  const navigation = useNavigation();
  
  // Lógica de Logout isolada (SRP)
  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  // Lógica de verificação de autenticação inicial
  useEffect(() => {
    const isAuth = verifyAuth();
    if (!isAuth) {
      navigation.navigate("Login");
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Menu Principal</Text> 
      
      <ScrollView contentContainerStyle={styles.mainContentContainer}>
        <Button
          title="Alunos"
          icon="person"
          onPress={() => navigation.navigate("StudentSearchScreen")} 
          style={styles.button}
        />
        <Button
          title="Financeiro"
          icon="attach-money"
          onPress={() => navigation.navigate("FinancialReportScreen")} 
          style={styles.button}
        />
        <Button
          title="Agenda"
          icon="event"
          onPress={() => navigation.navigate("ScheduleScreen")}
          style={styles.button}
        />
      </ScrollView>
      
      <View style={styles.logoutContainer}>
        <Button
          title="Sair"
          icon="exit-to-app"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0056B3",
    marginBottom: 40,
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  mainContentContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 100,
  },
  button: {
    marginVertical: 15,
    width: "90%",
    height: 60,
    backgroundColor: "#0056B3",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: "center",
    backgroundColor: '#F4F4F4',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutButton: {
    width: "90%", 
    height: 60,
    backgroundColor: "#D32F2F", 
    borderRadius: 12,
  },
});