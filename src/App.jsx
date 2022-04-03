import RouteManagement from './routes/RouteManagement'
import React from 'react'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <ErrorBoundary>
          <RouteManagement />
        </ErrorBoundary>
      </div>
    )
  }
}

export default App;
