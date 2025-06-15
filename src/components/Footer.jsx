import { Box, Text, HStack, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const navItems = [
  { label: "ホーム", path: "/" },
  { label: "記録", path: "/record" },
  { label: "履歴", path: "/history" },
]

const Footer = () => (
  <Box bg="teal.600" py={3} mt="auto" textAlign="center">
    <HStack justify="center" spacing={4} mb={2}>
      {navItems.map((item) => (
        <Button
          as={Link}
          to={item.path}
          key={item.path}
          variant="link"
          color="white"
          _hover={{ color: "orange.200" }}
          size="sm"
        >
          {item.label}
        </Button>
      ))}
    </HStack>
    <Text color="white" fontSize="sm">
      &copy; {new Date().getFullYear()} 家計簿アプリ All rights reserved.
    </Text>
  </Box>
)

export default Footer