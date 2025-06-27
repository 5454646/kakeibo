import { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [incomes, setIncomes] = useState(0);   // APIからの収入
  const [expenses, setExpenses] = useState(0); // APIからの支出
  const [balance, setBalance] = useState(0);   // 残高

  useEffect(() => {
    setBalance(incomes - expenses);
  }, [incomes, expenses]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/expenses/allAmount`)
      .then((res) => res.json())
      .then((data) => setExpenses(data.total)) // ← JSON形式に注意
      .catch(() => setExpenses(0));

    fetch(`${API_BASE_URL}/incomes/allAmount`)
      .then((res) => res.json())
      .then((data) => setIncomes(data.total))
      .catch(() => setIncomes(0));
  }, []);

  const maxAmount = Math.max(incomes, expenses);

  const getBarWidth = (amount) => {
    return maxAmount === 0 ? "0%" : `${(amount / maxAmount) * 100}%`;
  };

  return (
    <Box maxW="400px" mx="auto" p={6} borderWidth="1px" borderRadius="md" boxShadow="sm">
      <Heading size="lg" mb={6}>すべての収支概要</Heading>

      <Box mb={3}>
        <Text fontWeight="bold">収入:</Text>
        <Text>{incomes.toLocaleString()} 円</Text>
      </Box>

      <Box mb={3}>
        <Text fontWeight="bold">支出:</Text>
        <Text>{expenses.toLocaleString()} 円</Text>
      </Box>

      <Box mb={6}>
        <Text fontWeight="bold">残高:</Text>
        <Text>{balance.toLocaleString()} 円</Text>
      </Box>

      <Heading size="md" mb={3}>収入と支出の比較</Heading>

      <Box display="flex" gap={4}>
        <Box flex="1">
          <Box bg="green.400" height="24px" width={getBarWidth(incomes)} borderRadius="md" transition="width 0.5s" />
          <Text textAlign="center" mt={1}>収入</Text>
        </Box>
        <Box flex="1">
          <Box bg="red.400" height="24px" width={getBarWidth(expenses)} borderRadius="md" transition="width 0.5s" />
          <Text textAlign="center" mt={1}>支出</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
