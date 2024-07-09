import React, { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin } from "../config/ChatLogics"
import { Avatar, Flex, Tooltip } from '@chakra-ui/react'
import { ChatContext } from '../Context/ChatProvider'

const SrcollableChat = ({messages}) => {
    const {user} = useContext(ChatContext)
    console.log(messages, user)
  return (
      <ScrollableFeed>
        {messages && messages.map((m,i)=>{
            return <div style={{display:"flex"}} key={m._id} >
            {(isSameSender (messages,m,i, user._id))
            || isLastMessage(messages, i, user._id)
            && (<Tooltip label={m.sender.name} 
            placement='bottom-start'
            hasArrow
            >
                <Avatar
                mt={"7px"}
                mr={1}
                size={"sm"}
                cursor={"pointer"}
                name={m.sender.name}
                src={m.sender.pic}
                />

                
            </Tooltip>)}
                   
                <span
                    style={{
                        backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                        borderRadius: "1.5rem",
                        padding: "0.4rem 1rem",
                        maxWidth: "75%",
                        color: "#242424",
                        alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
                        margin: m.sender._id === user._id ? "0px 0px 5px auto" : "0px 0px 5px 0px"
                    }}
                >
                    {m.content} - {i}

                </span>
                
            </div>
        })}
      </ScrollableFeed>
  )
}

export default SrcollableChat