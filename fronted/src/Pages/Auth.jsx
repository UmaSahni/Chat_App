import { Box, Center, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import Login from '../Components/Auth/Login'
import SignUp from '../Components/Auth/SignUp'

const Auth = () => {
  return (
      <Box
          bg={"#2b2d42"}
          minH={"100vh"}
          backgroundImage="url('file.svg')"
          //   backgroundSize="cover"
          backgroundPosition="center"
      
      >
          <Center p={4} ><Heading fontSize={["md", "2xl", "4xl"]} color={"#fff"} >Welcome to BaatCheet !</Heading></Center>
          <Container py={2} maxW={"xl"} bg={"#a0aeb4"} >
            
              <Tabs  isFitted >
                  <TabList >
                      <Tab _selected={{ color: '#e23f4d', borderBottom: '3px solid #e23f4d', fontWeight: "bold" }} >Login</Tab>
                      <Tab _selected={{ color: '#e23f4d', borderBottom: '3px solid #e23f4d', fontWeight:"bold" }} >Signup</Tab>
                  </TabList>

                  <TabPanels>
                      {/* Login Component */}
                      <TabPanel>
                          <Login/>
                      </TabPanel>

                      {/* Signup Component */}
                      <TabPanel>
                          <SignUp/>
                      </TabPanel>
                  </TabPanels>
              </Tabs>
        </Container>
    </Box>
  )
}

export default Auth