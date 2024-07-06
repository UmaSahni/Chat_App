import { CloseIcon } from '@chakra-ui/icons'
import { Badge, Box, Flex } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({ handleFunction, name }) => {

  return (
    <Badge
      m={2}
      cursor={"pointer"}
      p={1}
      variant='solid' onClick={handleFunction} >{name}
      <CloseIcon ml={2} />
    </Badge>
  )
}

export default UserBadgeItem