import React from 'react';
import BankingTreeDiagram from './components/BankingTreeDiagram';

function App() {
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Banking App Feature Tree</h1>
      <div className="w-full h-[90vh] bg-white rounded-lg shadow-lg overflow-auto">
        <BankingTreeDiagram />
      </div>
    </div>
  );
}

export default App;