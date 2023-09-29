import { Icon } from '@chakra-ui/react';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';
import { IoHappy } from 'react-icons/io5';
import { MdAddReaction, MdMessage } from 'react-icons/md';
import { FeaturesConfig } from './types';
import { provider } from '@/config/translations/provider';
import { createI18n } from '@/utils/i18n';
import { useWelcomeMessageFeature } from './example/WelcomeMessageFeature';
import { useMemeFeature } from './example/MemeFeature';

/**
 * Support i18n (Localization)
 */
const { T } = createI18n(provider, {
  en: {
    level: 'Leveling System',
    'level description': 'Gain experience and levels in your server',
    community: 'Community',
    'community description': 'Enhance your server community',
    economy: 'Economy System',
    'economy description': 'Manage virtual economy in your server',
    moderation: 'Moderation Tools',
    'moderation description': 'Manage and control your server efficiently',
    misc: 'Miscellaneous',
    'misc description': 'Various and miscellaneous features for your server',
    automod: 'Auto-Moderation',
    'automod description': 'Automatically moderate and prevent spam/abuse',
    poll: 'Poll System',
    'poll description': 'Create polls and gather opinions from your community',
    giveaway: 'Giveaway',
    'giveaway description': 'Host and manage giveaways for your members',
  },
  cn: {
    level: '等級制度',
    'level description': '在您的 Discord 服務器中獲得經驗和等級',
    community: '社區',
    'community description': '增強您的服務器社區',
    economy: '經濟制度',
    'economy description': '管理服務器中的虛擬經濟',
    moderation: '管理工具',
    'moderation description': '高效地管理和控制您的服務器',
    misc: '其他功能',
    'misc description': '各種其他功能供您的服務器使用',
    automod: '自動審查',
    'automod description': '自動審查並防止垃圾郵件/濫用',
    poll: '投票系統',
    'poll description': '創建投票並收集社區意見',
    giveaway: '抽獎',
    'giveaway description': '為成員舉辦和管理抽獎活動',
  },
});

/**
 * Define information for each features
 */
export const features: FeaturesConfig = {
  level: {
    name: <T text="level" />,
    description: <T text="level description" />,
    icon: <Icon as={BsMusicNoteBeamed} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  community: {
    name: <T text="community" />,
    description: <T text="community description" />,
    icon: <Icon as={FaGamepad} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  economy: {
    name: <T text="economy" />,
    description: <T text="economy description" />,
    icon: <Icon as={MdAddReaction} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  moderation: {
    name: <T text="moderation" />,
    description: <T text="moderation description" />,
    icon: <Icon as={IoHappy} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  misc: {
    name: <T text="misc" />,
    description: <T text="misc description" />,
    icon: <Icon as={MdMessage} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  automod: {
    name: <T text="automod" />,
    description: <T text="automod description" />,
    icon: <Icon as={BsMusicNoteBeamed} />,
    useRender: useWelcomeMessageFeature,
  },
  poll: {
    name: <T text="poll" />,
    description: <T text="poll description" />,
    icon: <Icon as={FaGamepad} />,
    useRender() {
      return {
        component: <></>,
        onSubmit: () => {},
      };
    },
  },
  giveaway: {
    name: <T text="giveaway" />,
    description: <T text="giveaway description" />,
    icon: <Icon as={IoHappy} />,
    useRender: useMemeFeature,
  },
};
