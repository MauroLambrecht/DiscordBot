import {
  Avatar,
  Box,
  Card,
  CardBody,
  createIcon,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useActiveSidebarItem, SidebarItemInfo } from '@/utils/router';
import { useGuilds, useSelfUserQuery } from '@/api/hooks';
import { SearchBar } from '@/components/forms/SearchBar';
import { useMemo, useState } from 'react';
import { config } from '@/config/common';
import { FiSettings as SettingsIcon } from 'react-icons/fi';
import { avatarUrl } from '@/api/discord';
import { GuildItem, GuildItemsSkeleton } from './GuildItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SidebarItem } from './SidebarItem';
import items from '@/config/sidebar-items';

export function SidebarContent() {
  const [filter, setFilter] = useState('');
  const guilds = useGuilds();
  const { guild: selectedGroup } = useRouter().query as {
    guild: string;
  };

  const filteredGuilds = useMemo(
    () =>
      guilds.data?.filter((guild) => {
        const contains = guild.name.toLowerCase().includes(filter.toLowerCase());

        return config.guild.filter(guild) && contains;
      }),
    [guilds.data, filter]
  );

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

  return (
    <>
    <VStack align="center" py="2rem" m={3} rounded="xl">
      <HStack spacing={8} align="center">
        {/* Use the BotIcon component here to display the logo */}
        <BotIcon boxSize={12} color="white" />
      </HStack>
    </VStack>

      <Stack direction="column" mb="auto">
        <Items />
        <Box my={4} />
        <Box my={4} />
        <Box px="10px" mt={50}>
          <SearchBar
            w="full"
            input={{
              value: filter,
              onChange: (e) => setFilter(e.target.value),
            }}
          />
        </Box>
        <Flex direction="column" px="10px" gap={3}>
          {filteredGuilds == null ? (
            <GuildItemsSkeleton />
          ) : (
            filteredGuilds?.map((guild) => (
              <GuildItem
                key={guild.id}
                guild={guild}
                active={selectedGroup === guild.id}
                href={`/guilds/${guild.id}`}
              />
            ))
          )}
        </Flex>
      </Stack>
    </>
  );
}

export function BottomCard() {
  const user = useSelfUserQuery().data;
  if (user == null) return <></>;

  return (
    <Card pos="sticky" left={0} bottom={0} w="full" py={2}>
      <CardBody as={HStack}>
        <Avatar src={avatarUrl(user)} name={user.username} size="sm" />
        <Text fontWeight="600">{user.username}</Text>
        <Spacer />
        <Link href="/user/profile">
          <IconButton icon={<SettingsIcon />} aria-label="settings" />
        </Link>
      </CardBody>
    </Card>
  );
}

function Items() {
  const active = useActiveSidebarItem();

  return (
    <Flex direction="column" px="10px" gap={0}>
      {items
        .filter((item) => !item.hidden)
        .map((route: SidebarItemInfo, index: number) => (
          <SidebarItem
            key={index}
            href={route.path}
            name={route.name}
            icon={route.icon}
            active={active === route}
          />
        ))}
    </Flex>
  );
}
