import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Record = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [inputIncome, setInputIncome] = useState("");
  const [inputExpense, setInputExpense] = useState("");

  const balance = income - expense;
  const maxAmount = Math.max(income, expense, 1); // 0割防止

  const getBarWidth = (amount) => `${(amount / maxAmount) * 100}%`;

  const addIncome = () => {
    const num = Number(inputIncome);
    if (num > 0) {
      setIncome(income + num);
      setInputIncome("");
    }
  };

  const addExpense = () => {
    const num = Number(inputExpense);
    if (num > 0) {
      setExpense(expense + num);
      setInputExpense("");
    }
  };

  return (
    <Box maxW="480px" mx="auto" p={4} borderWidth="1px" borderRadius="md">
      <Heading size="lg" mb={4}>今月の収支概要</Heading>

      <Box mb={4}>
        <label>
          収入を追加:{" "}
          <input
            type="number"
            min="0"
            value={inputIncome}
            onChange={(e) => setInputIncome(e.target.value)}
            style={{ marginRight: 8 }}
          />
        </label>
        <button onClick={addIncome}>追加</button>
      </Box>

      <Box mb={4}>
        <label>
          支出を追加:{" "}
          <input
            type="number"
            min="0"
            value={inputExpense}
            onChange={(e) => setInputExpense(e.target.value)}
            style={{ marginRight: 8 }}
          />
        </label>
        <button onClick={addExpense}>追加</button>
      </Box>

      <Text mb={2}>収入: {income.toLocaleString()} 円</Text>
      <Text mb={2}>支出: {expense.toLocaleString()} 円</Text>
      <Text mb={4} fontWeight="bold">残高: {balance.toLocaleString()} 円</Text>

      <Heading size="md" mb={2}>収入と支出の比較</Heading>
      <Box display="flex" gap={4}>
        <Box flex="1">
          <Box
            bg="green.400"
            height="24px"
            width={getBarWidth(income)}
            borderRadius="md"
            transition="width 0.3s"
          />
          <Text textAlign="center" mt={1}>収入</Text>
        </Box>
        <Box flex="1">
          <Box
            bg="red.400"
            height="24px"
            width={getBarWidth(expense)}
            borderRadius="md"
            transition="width 0.3s"
          />
          <Text textAlign="center" mt={1}>支出</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Record;




// import { useState } from "react"
// import {
//   Box,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   NumberInput,
//   NumberInputField,
//   Button,
//   RadioGroup,
//   Radio,
//   Stack,
//   useToast,
// } from "@chakra-ui/react"

// const categories = [
//   "食費", "日用品", "交通費", "交際費", "趣味", "給料", "その他"
// ]

// const Record = () => {
//   const [type, setType] = useState("支出")
//   const [amount, setAmount] = useState("")
//   const [category, setCategory] = useState(categories[0])
//   const [memo, setMemo] = useState("")
//   const toast = useToast()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // ここでデータ保存処理を実装
//     toast({
//       title: "登録しました",
//       description: `${type}：${amount}円（${category}）`,
//       status: "success",
//       duration: 2000,
//       isClosable: true,
//     })
//     setAmount("")
//     setCategory(categories[0])
//     setMemo("")
//     setType("支出")
//   }

//   return (
//     <Box p={6} maxW="md" mx="auto">
//       <Heading size="lg" mb={6}>入出金の登録</Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl mb={4}>
//           <FormLabel>種別</FormLabel>
//           <RadioGroup value={type} onChange={setType}>
//             <Stack direction="row">
//               <Radio value="支出">支出</Radio>
//               <Radio value="収入">収入</Radio>
//             </Stack>
//           </RadioGroup>
//         </FormControl>
//         <FormControl mb={4} isRequired>
//           <FormLabel>金額</FormLabel>
//           <NumberInput min={0} value={amount} onChange={setAmount}>
//             <NumberInputField placeholder="金額を入力" />
//           </NumberInput>
//         </FormControl>
//         <FormControl mb={4} isRequired>
//           <FormLabel>カテゴリ</FormLabel>
//           <Select value={category} onChange={(e) => setCategory(e.target.value)}>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl mb={4}>
//           <FormLabel>メモ</FormLabel>
//           <Input
//             value={memo}
//             onChange={(e) => setMemo(e.target.value)}
//             placeholder="メモ（任意）"
//           />
//         </FormControl>
//         <Button colorScheme="teal" type="submit" width="full">
//           登録
//         </Button>
//       </form>
//     </Box>
//   )
// }

// export default Record