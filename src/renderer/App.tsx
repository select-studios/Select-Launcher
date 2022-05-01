import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Button, theme, Box, Grid } from '@chakra-ui/react';
import ColorModeSwitcher from './components/ColorModeSwitcher';
import './styles/App.css';

const Hello = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Box textAlign="center" className="btn">
          <Grid maxWidth="50vh">
            <Button colorScheme="blue">Hello</Button>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
