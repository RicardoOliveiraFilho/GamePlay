import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  Platform,
  Share
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { theme } from "../../global/styles/theme";
import { api } from "../../services/api";
import { styles } from "./styles";
import BannerImg from '../../assets/banner.png';
import { DataAppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Load } from "../../components/Load";

type Params = {
  guildSelected: DataAppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor! Será que a opção Widget está habilitada?');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;
    
    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <TouchableWithoutFeedback
            onPress={handleShareInvitation}
          >
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableWithoutFeedback>
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            { guildSelected.guild.name }
          </Text>

          <Text style={styles.subtitle}>
            { guildSelected.description }
          </Text>
        </View>
      </ImageBackground>

      { loading ? <Load /> :
        <>
          { widget.members &&
              <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />
          }

          <FlatList
            style={styles.members}
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
          />
        </>
      }

      { guildSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      }
    </Background>
  );
}