import React from 'react';
import AppLayout from './components/Layout/AppLayout';
import BuilderPanel from './components/RequestBuilder/BuilderPanel';
import CurlOutputPanel from './components/Output/CurlOutputPanel';
import RequestSummary from './components/Output/RequestSummary';
import { useRequestConfig } from './hooks/useRequestConfig';

// We can create a Context if we want to avoid passing props, 
// but since it's just two main panels, passing props is fine or using a provider.
// Let's use a simple Context Provider pattern if the tree gets deep.
// For now, let's just use the hook here and pass down.
// Actually, `useRequestConfig` returns { state, actions }.
// Passing these to both panels is clean.

function App() {
  const { state, actions } = useRequestConfig();

  return (
    <AppLayout
      bottomContent={<RequestSummary config={state} />}
    >
      <BuilderPanel config={state} actions={actions} />
      <CurlOutputPanel config={state} actions={actions} />
    </AppLayout>
  );
}

export default App;
