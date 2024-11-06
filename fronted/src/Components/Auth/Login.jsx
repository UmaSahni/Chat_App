import { Box, Button, Center, Flex, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightAddon, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userAuth } from './SignUp';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { ChatContext } from '../../Context/ChatProvider';
import { AuthContext } from '../../Context/AuthContext';

//& <--- Login up component starts from here --->

const Login = () => {
    const [show, setShow] = useState(true)
    const navigate = useNavigate()
    const [state, setState] = useState({
        password: "",
        email: "",
    })
    const toast = useToast()
    const { user, setUser } = useContext(ChatContext)
    const { token, setToken } = useContext(AuthContext)

    // update state function of input field
    const handleChange = (e) => {
        const { name, value } = e.target
        setState((pre) => ({ ...pre, [name]: value }))
    }

    console.log(state)
    // state = { name: "guestUser.example.com", password: "guestUser890"}
    const handleSubmit = async(e, ) => {
        e.preventDefault()
        

        const loadingToastId = toast({
            position: 'top-right',
            title: 'Signing in...',
            description: "Please wait",
            status: 'info',
            duration: null,
            isClosable: false,
        })
        try {
            
           const response = await userAuth("http://localhost:8080/user/login", state )
           console.log(response)
            // Close the loading toast
            toast.close(loadingToastId);

            // Show success toast with dynamic message from response
            toast({
                position: 'top-right',
                title: response.data.msg,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });


            setState({
                password: "",
                email: "",
            })

            setUser(response.data.user)
            let userInfo = JSON.stringify(response.data.user)
            localStorage.setItem("userInfo", userInfo )  
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token )
            navigate("/chat")

        } catch (error) {
            toast.close(loadingToastId);

            console.log("Error coming from here", error.response.status);
            if (error.response.status === 401){
                toast({
                    position: 'top-right',
                    title: error.response.statusText,
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                
            }
            else if (error.response.status === 404){
                toast({
                    position: 'top-right',
                    title: error.response.statusText,
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }else{
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

        console.log(user)
       
    }


    const handleGuestSubmit = async() =>{
        const loadingToastId = toast({
            position: 'top-right',
            title: 'Signing in...',
            description: "Please wait",
            status: 'info',
            duration: null,
            isClosable: false,
        })
        try {
            const response = await userAuth("http://localhost:8080/user/login", { email: "guestUser@example.com", password: "guestUser890" })
            // Close the loading toast
            toast.close(loadingToastId);

            setUser(response.data.user)
            let userInfo = JSON.stringify(response.data.user)
            localStorage.setItem("userInfo", userInfo )  
            localStorage.setItem("token",response.data.token )
            setToken(response.data.token)
            navigate("/chat")

            // Show success toast with dynamic message from response
            toast({
                position: 'top-right',
                title: "Guest User Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
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
                  

                    <FormControl isRequired >
                        <FormLabel>Email address</FormLabel>
                        <Input name="email" value={state.email} onChange={handleChange} type='email' />
                    </FormControl>

                    <FormControl isRequired >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input name="password" value={state.password} onChange={handleChange} type={show ? "text" : 'password'} />
                            <InputRightAddon p={0} ><Button borderRadius={0} pr={6} pl={6} onClick={() => setShow(!show)} bg={"transparent"} >{show ? <FaEye /> : <FaEyeSlash />}</Button></InputRightAddon>
                        </InputGroup>
                    </FormControl>

                    

                    <FormControl >
                        <Button p={0} w={"100%"} colorScheme='red' >
                            <Input p={0} type="submit" />
                        </Button>
                    </FormControl>

                    
                </Stack>


            </form>

            <Center py={3} >
                <b>OR</b>
            </Center>


            <Button
            w={"100%"}
                onClick={handleGuestSubmit}
            >Get Guest User Crediential</Button>
        </div>
    )
}

export default Login