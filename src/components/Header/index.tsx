import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
    title: string;
    action?: ReactNode;
  }

export function Header({ title, action }: HeaderProps) {
  const { secondary100, secondary40, heading } = theme.colors;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <TouchableWithoutFeedback
        onPress={handleGoBack}
      >
        <Feather
          name="arrow-left"
          size={24}
          color={heading}
        />
      </TouchableWithoutFeedback>

      <Text style={styles.title}>
        { title }
      </Text>

      {
        action
        ?
        <View>
          { action }
        </View>
        :
        <View style={{ width: 24 }} />
      }
    </LinearGradient>
  );
}