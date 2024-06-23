import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightAddon, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useToast } from '@chakra-ui/react'

export const userAuth = (url, obj )=>{
    try {
        return axios(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            data: obj
        })
    } catch (error) {
        return error
    }
}

//& <--- Sign up component starts from here --->

const SignUp = () => {
    const [show, setShow] = useState(true)
    const [ state, setState] = useState({
        name:"",
        password:"",
        email:"",
        pic:""
    })
    const toast = useToast()

// update state function of input field
    const handleChange =  (e) =>{
        const {name, value} = e.target
        setState((pre)=>({...pre,[name]:value}))
    }

    console.log(state)

    const handleSubmit = async (e)=>{
        e.preventDefault()
       
        const loadingToastId =  toast({
            position: 'top-right',
            title: 'Signing up...',
            description: "Please wait",
            status: 'info',
            duration: null,
            isClosable: false,
        })

        try {

            const response = await userAuth("http://localhost:8080/auth/signup", state)
            toast.close(loadingToastId);
            console.log(response)

            // Close the loading toast
            toast.close(loadingToastId);

            // Show success toast with dynamic message from response
            toast({
                position: 'top-right',
                title: "Registration Successful",
                description: response.data.msg,  // Dynamic message from server
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });

            // Reset form state on success
            setState({
                name: "",
                password: "",
                email: "",
                pic: ""
            });
        } catch (error) {
            toast.close(loadingToastId);
            console.log("Error coming from here", error);
            toast({
                position: 'top-right',
                title: "An error occurred",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    
    }

  return (
    <div>
        <form onSubmit={handleSubmit} >
            <Stack gap={7} >
                  <FormControl isRequired  >
                  <FormLabel>Name</FormLabel>
                  <Input  name="name" value={state.name} onChange={handleChange} type='text' />
              </FormControl>

                  <FormControl isRequired  >
                  <FormLabel>Email address</FormLabel>
                      <Input  name="email" value={state.email} onChange={handleChange} type='email' />
                  <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>

                  <FormControl isRequired   >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                          <Input name="password" value={state.password} onChange={handleChange} type={show ? "text" : 'password'} />
                          <InputRightAddon p={0} ><Button borderRadius={0} pr={6} pl={6} onClick={() => setShow(!show)} bg={"transparent"} >{show ? <FaEye /> : <FaEyeSlash />}</Button></InputRightAddon>
                      </InputGroup>

                  </FormControl>

              <FormControl>
                  <FormLabel>Profile pic</FormLabel>
                     <Input  name="pic" value={state.pic} onChange={handleChange} border={"transperent"} type='file' />
                  <FormHelperText>You can upload image up to 1 MB</FormHelperText>
              </FormControl>

                  <FormControl >
                      <Button p={0} w={"100%"} colorScheme='red' >
                          <Input  p={0} type="submit" />
                      </Button> 
                </FormControl>

              </Stack>
              

        </form>
    </div>
  )
}

export default SignUp