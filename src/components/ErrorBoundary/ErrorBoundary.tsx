import React, { PureComponent } from 'react';
import ErrorIndicator from './ErrorIndicator';

export default class ErrorBoundary extends PureComponent<{}, { hasError: boolean }> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorIndicator />;
    }

    return children;
  }
}
