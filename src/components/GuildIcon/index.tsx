import { Image, View } from "react-native";
import DiscordSvg from '../../assets/discord.svg';
import { styles } from './styles';

type GuildIconProps = {
  guildId: string;
  iconId: string | null;
}

const { CDN_IMAGE } = process.env;

export function GuildIcon({ guildId, iconId }: GuildIconProps) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
  
  // 'https://icon-library.com/images/what-is-the-discord-icon/what-is-the-discord-icon-18.jpg';

  return (
    <View style={styles.container}>
      { iconId ?
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
        />
        :
        <DiscordSvg
          width={40}
          height={40}
        />
      }
    </View>
  );
}