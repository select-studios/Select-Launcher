import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Image,
  theme,
  Box,
  Grid,
  Stack,
} from '@chakra-ui/react';
import ColorModeSwitcher from './components/ColorModeSwitcher';
import Login from './components/Login';
import './styles/App.css';
import Logo from '../../assets/logo.png';

const LoginPage = () => {
  return (
    <Box textAlign="center" fontSize="xl" className="btn">
      <Grid minW="50vh">
        <Stack spacing={5}>
          <h1>Logo</h1>
          <Login />
        </Stack>
      </Grid>
    </Box>
  );
};

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="5vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
      </Box>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
