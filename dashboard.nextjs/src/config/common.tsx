import { createIcon } from '@chakra-ui/react';
import { PermissionFlags } from '@/api/discord';
import { AppConfig } from './types';

const BotIcon = createIcon({
  displayName: 'OmagizeLogo',
  viewBox: '0 0 512 512',
  path: (
    <image
      href={"/logoRewind.png"}
      width="512"
      height="512"
    />
  ),
});

export const config: AppConfig = {
  name: 'Rewind',
  icon: BotIcon,
  inviteUrl:
    'https://discord.com/api/oauth2/authorize?client_id=1127674277290852353&permissions=8&scope=bot',
  guild: {
    //filter guilds that user has no permissions to manage it
    filter: (guild) => (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0,
  },
};
