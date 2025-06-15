import { Box, Heading, Text } from "@chakra-ui/react"

const Record = () => (
  <Box p={6}>
    <Heading size="lg" mb={4}>ダッシュボード</Heading>
    <Text>今月の収支・残高・グラフの概要などを表示</Text>
  </Box>
)

export default Record


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