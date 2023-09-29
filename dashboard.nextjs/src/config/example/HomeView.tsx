import {
  Center,
  Circle,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Icon,
} from '@chakra-ui/react';
import { config } from '@/config/common';
import { StyledChart } from '@/components/chart/StyledChart';
import { dashboard } from '@/config/translations/dashboard';
import Link from 'next/link';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { IoOpen, IoPricetag } from 'react-icons/io5';
import { FaRobot } from 'react-icons/fa';
import { MdVoiceChat } from 'react-icons/md';
import { GuildSelect } from '@/pages/user/home';
import { useEffect, useState } from 'react';

const API_ENDPOINT = 'http://localhost:8080/botstats'; // Replace this with your actual API endpoint

interface BotStats {
  totalServers: number;
  totalCommands: number;
  botUptime: string;
}

export default function HomeView() {
  const t = dashboard.useTranslations();
  const [stats, setStats] = useState<BotStats | null>(null);

  useEffect(() => {
    // Fetch stats from the backend when the component mounts
    const fetchStats = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Flex direction="column" gap={5}>
      <Flex direction="row" alignItems="center" rounded="2xl" bg="Brand" gap={4} p={5}>
        <Circle
          color="white"
          bgGradient="linear(to right bottom, transparent, blackAlpha.600)"
          p={4}
          shadow="2xl"
          display={{ base: 'none', md: 'block' }}
        >
          <Icon as={FaRobot} w="60px" h="60px" />
        </Circle>

        <Flex direction="column" align="start" gap={1}>
          <Heading color="white" fontSize="2xl" fontWeight="bold">
            {t.invite.title}
          </Heading>
          <Text color="whiteAlpha.800">{t.invite.description}</Text>
          <Button
            mt={3}
            as={Link}
            href={config.inviteUrl}
            color="white"
            bg="whiteAlpha.200"
            _hover={{
              bg: 'whiteAlpha.300',
            }}
            _active={{
              bg: 'whiteAlpha.400',
            }}
            leftIcon={<IoOpen />}
          >
            {t.invite.bn}
          </Button>
        </Flex>
      </Flex>

      <Flex direction="column" gap={1} mt={3}>
        <Heading size="md">{t.servers.title}</Heading>
        <Text color="TextSecondary">{t.servers.description}</Text>
      </Flex>
      <GuildSelect />

      {/* Display bot stats */}
      {stats && (
        <Flex direction="column" gap={1}>
          <Heading size="md">Bot Stats</Heading>
          <Text color="TextSecondary">Bot statistics for all servers:</Text>
          <Text>
            Total Servers: {stats.totalServers}
          </Text>
          <Text>
            Total Commands: {stats.totalCommands}
          </Text>
          <Text>
            Bot Uptime: {stats.botUptime}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

// function TestChart() {
//   return (
//     <StyledChart
//       options={{
//         colors: ['#4318FF', '#39B8FF'],
//         chart: {
//           animations: {
//             enabled: false,
//           },
//         },
//         xaxis: {
//           categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
//         },
//         legend: {
//           position: 'right',
//         },
//         responsive: [
//           {
//             breakpoint: 650,
//             options: {
//               legend: {
//                 position: 'bottom',
//               },
//             },
//           },
//         ],
//       }}
//       series={[
//         {
//           name: 'Paid',
//           data: [50, 64, 48, 66, 49, 68],
//         },
//         {
//           name: 'Free Usage',
//           data: [30, 50, 13, 46, 26, 16],
//         },
//       ]}
//       height="300"
//       type="line"
//     />
//   );
// }

// function VoiceChannelItem() {
//   return (
//     <Card rounded="2xl" variant="primary">
//       <CardHeader as={HStack}>
//         <Icon as={MdVoiceChat} color="Brand" fontSize={{ base: '2xl', md: '3xl' }} />
//         <Text>My Channel</Text>
//       </CardHeader>
//       <CardBody mt={3}>
//         <Text color="TextSecondary">89 Members</Text>
//       </CardBody>
//     </Card>
//   );
// }
