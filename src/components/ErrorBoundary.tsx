import React from 'react';

export default class ErrorBoundary extends React.Component {
  componentDidCatch(error: any, errorInfo: any) {
    console.error({ error });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
