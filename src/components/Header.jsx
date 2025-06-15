import { Box, Flex, Heading, Spacer, HStack, Button } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"

const navItems = [
  { label: "ホーム", path: "/" },
  { label: "記録", path: "/record" },
  { label: "履歴", path: "/history" },
]

const Header = () => {
  const location = useLocation()
  return (
    <Box bg="teal.600" px={6} py={4} boxShadow="md">
      <Flex align="center">
        <Heading color="white" size="md" letterSpacing="wide">
          家計簿アプリ
        </Heading>
        <Spacer />
        <HStack spacing={4}>
          {navItems.map((item) => (
            <Button
              as={Link}
              to={item.path}
              key={item.path}
              variant={location.pathname === item.path ? "solid" : "ghost"}
              colorScheme="orange"
              size="sm"
            >
              {item.label}
            </Button>
          ))}
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header