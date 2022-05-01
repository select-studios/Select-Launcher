/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Box,
  Grid,
  Input,
  Button,
  ButtonGroup,
  Stack,
  HStack,
  Link,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import '../styles/Login.css';

export default function Login() {
  return (
    <Box
      bg="blackAlpha.400"
      p={4}
      color="white"
      borderWidth="1px"
      borderRadius="lg"
      minWidth="75vh"
    >
      <Stack spacing={3}>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            variant="filled"
            placeholder="Username"
            type="email"
            minWidth="100%"
          />
          <FormHelperText className="form-email-text">
            You can also enter an email address.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            variant="outline"
            placeholder="Password"
            type="password"
            minWidth="100%"
          />
        </FormControl>
        <Grid className="btn-grp">
          <ButtonGroup>
            <Button colorScheme="green" type="submit">
              Login
            </Button>
            <Button colorScheme="red" variant="outline">
              Quit
            </Button>
          </ButtonGroup>
        </Grid>
        <HStack spacing="150px">
          <Link color="teal.500" href="#">
            Forgot Password?
          </Link>
          <Link color="teal.500" href="#">
            Create an Account
          </Link>
        </HStack>
      </Stack>
    </Box>
  );
}
