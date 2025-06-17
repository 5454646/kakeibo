import { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const mockData = {
  income: 300000,   // 収入
  expense: 150000,  // 支出
};
const Home = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(mockData.income - mockData.expense);
  }, []);

  const maxAmount = Math.max(mockData.income, mockData.expense);

  // 棒グラフの幅をパーセンテージで計算
  const getBarWidth = (amount) => {
    return maxAmount === 0 ? "0%" : `${(amount / maxAmount) * 100}%`;
  };

  return (
    <Box maxW="400px" mx="auto" p={6} borderWidth="1px" borderRadius="md" boxShadow="sm">
      <Heading size="lg" mb={6}>今月の収支概要</Heading>

      <Box mb={3}>
        <Text fontWeight="bold">収入:</Text>
        <Text>{mockData.income.toLocaleString()} 円</Text>
      </Box>

      <Box mb={3}>
        <Text fontWeight="bold">支出:</Text>
        <Text>{mockData.expense.toLocaleString()} 円</Text>
      </Box>

      <Box mb={6}>
        <Text fontWeight="bold">残高:</Text>
        <Text>{balance.toLocaleString()} 円</Text>
      </Box>

      <Heading size="md" mb={3}>収入と支出の比較</Heading>

      <Box display="flex" gap={4}>
        <Box flex="1">
          <Box bg="green.400" height="24px" width={getBarWidth(mockData.income)} borderRadius="md" transition="width 0.5s" />
          <Text textAlign="center" mt={1}>収入</Text>
        </Box>
        <Box flex="1">
          <Box bg="red.400" height="24px" width={getBarWidth(mockData.expense)} borderRadius="md" transition="width 0.5s" />
          <Text textAlign="center" mt={1}>支出</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default Home