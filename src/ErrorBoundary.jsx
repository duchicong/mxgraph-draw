import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          error: null,
          errorInfo: null
      };
    }
  
    // static getDerivedStateFromError(error) {
    //   // Update state so the next render will show the fallback UI.
    //   return { hasError: true };
    // }
  
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
      // You can also log the error to an error reporting service
      this.setState({ error, errorInfo })
    }
  
    render() {
      if (this.state.error) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }