import { Router } from './src/components/router/Router';
import AuthProvider, {  } from './src/components/contexts/AuthProvider';


function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;