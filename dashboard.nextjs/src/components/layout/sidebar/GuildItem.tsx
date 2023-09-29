import { Avatar, Card, CardBody, Flex, Skeleton, Text } from '@chakra-ui/react';
import { Guild, iconUrl } from '@/api/discord';
import Link from 'next/link';

export function GuildItem({
  guild,
  active,
  href,
}: {
  guild: Guild;
  active: boolean;
  href: string;
}) {
  return (
<Card
      bg={active ? 'Brand' : 'Guild'}
      color={active ? 'white' : undefined}
      cursor="pointer"
      as={Link}
      href={href}
      rounded="xl"
    >
      <CardBody>
        <Flex direction="row" align="center">
          <Avatar name={guild.name} src={iconUrl(guild)} />
          <Text fontWeight="600" ml={3}>
            {guild.name}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

export function GuildItemsSkeleton() {
  return (
    <>
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
      <Skeleton h="124px" rounded="xl" />
    </>
  );
}
