import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";


const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const navData = [
    {
        name: "Contact",
        link:"/"
    },
    {
        name: "About",
        link:"/"
    },
  ]

  return (
    <Box>
      <Flex
    
        p={2}
        align="center"
        
        justify="space-between"
        border={"1px solid #262a3b"}
        bgColor={"#262a3b"}
        color={"rgb(235, 235, 235)"}
      >
        <Link to={"/"}>
          <Box fontWeight="bold" fontSize="xl">
            <Text> Batcheet </Text>
          </Box>
        </Link>

        <Box marginRight={"1%"}>
          <IconButton
            aria-label="Open menu"
            display={{ base: "block", md: "none" }}
            onClick={onOpen}
            icon={<HamburgerIcon margin={"auto"} />}
            ref={btnRef}
            color={"black"}
          />
        </Box>
        <HStack
          as="nav"
          spacing={8}
          display={{ base: "none", md: "flex" }}
          justifyContent="flex-end"
          paddingRight={"10"}
        >
          {navData.map((el, i) => {
            return (
              <Link key={i} to={el.link}>
                <Text
                  _hover={{
                    color: "#ff6733",
                  }}
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                >
                  {el.name}
                </Text>
              </Link>
            );
          })}

          
          <Link to={"/auth"}>
            <Button
              _hover={{
                color: "#ff6733",
              }}
              variant={"link"}
              color={"rgb(235, 235, 235)"}
            >
              <Text
                _hover={{
                  color: "#ff6733",
                }}
                fontSize={"1.2rem"}
                fontWeight={"semibold"}
              >
                {" "}
                Log In
              </Text>
            </Button>
          </Link>
        </HStack>
      </Flex>
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          placement="top"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerContent>
            <DrawerCloseButton />
            <VStack m={8} align={"stretch"} spacing={10}>
            {navData.map((el, i) => {
            return (
              <Link key={i} to={el.link}>
                <Text
                  _hover={{
                    color: "#ff6733",
                  }}
                  fontSize={"1.2rem"}
                  fontWeight={"semibold"}
                >
                  {el.name}
                </Text>
              </Link>
            );
          })}

              <Link to={"/auth"}>
                <Button
                  _hover={{
                    color: "#ff6733",
                  }}
                  width={"5rem"}
                  bg="white"
                  border={"1px solid black"}
                >
                  Log In
                </Button>
              </Link>
            </VStack>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default Navbar;