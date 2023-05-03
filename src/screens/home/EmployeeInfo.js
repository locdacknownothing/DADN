import React, { useState, useEffect } from "react";
import Background from '../../components/Background';
import Header from '../../components/Header';
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../core/theme";

export default function EmployeeInfo({ navigation, route }) {
  const { id } = route.params;
  return (
    <Background>
      <Header>Thông tin nhân viên</Header>
      <Text>Id của nhân viên là {id}</Text>
    </Background>
  )
}