
import './App.scss';
import ChatWindow from './components/ChatWindow';
import SidePanel from './components/SidePanel';

function App() {
  return (
    <div className="App">
      <SidePanel />
      <ChatWindow />
    </div>
  );
}

export default App;
