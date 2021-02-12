import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ErrorIndicator from './ErrorIndicator';
import { RootState } from '../../redux/reducers';

class ErrorBoundaryComponent extends PureComponent<{ isError: boolean; children?: React.ReactElement }> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { isError, children } = this.props;

    if (hasError || isError) {
      return <ErrorIndicator />;
    }

    return children;
  }
}

const mapStateToProps = (state: RootState) => ({
  isError: state.articles.isError,
});

export default connect(mapStateToProps)(ErrorBoundaryComponent);
