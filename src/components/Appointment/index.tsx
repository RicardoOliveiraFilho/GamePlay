import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import { theme } from "../../global/styles/theme";
import { styles } from './styles';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
import { GuildProps } from "../Guild";
import { GuildIcon } from "../GuildIcon";
import { categories } from "../../utils/categories";
import { LinearGradient } from "expo-linear-gradient";

export type DataAppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
}

type AppointmentProps = TouchableOpacityProps & {
  data: DataAppointmentProps;
}

export function Appointment({ data, ...rest }: AppointmentProps) {
  const [categoryFiltered] = categories.filter(item => item.id === data.category);
  const { owner } = data.guild;
  const { primary, on, secondary50, secondary70 } = theme.colors;

  return (
    <TouchableOpacity { ...rest }>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary50, secondary70]}
        >
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              { data.guild.name }
            </Text>

            <Text style={styles.categoryDescription}>
              { categoryFiltered?.title }
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />

              <Text style={styles.date}>
                { data.date }
              </Text>
            </View>
          
            <View style={styles.playersInfo}>
              <PlayerSvg fill={ owner ? primary : on } />

              <Text
                style={[
                  styles.player,
                  { color: owner ? primary : on }
                ]}
              >
                { owner ? 'Anfitrião' : 'Visitante' }
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}