import { styles } from 'consts/styles';
import { font400 } from 'helpers/styleHelpers';
import { Component } from 'react';
import { ScrollView } from 'react-native';
import { FastText } from 'ui/FastText';

type State = { error: Error | undefined };

export class ErrorBoundary extends Component<{ children?: React.ReactNode }, State> {
  state: State = { error: undefined };

  static getDerivedStateFromError(e: Error) {
    return { error: e }; // Fixed to match your state type
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
          <FastText style={{ ...font400(60, styles.COLORS.GREYSCALE.GRAYSCALE6) }}>
            {this.state.error.name}
          </FastText>
          <FastText style={{ ...font400(40, styles.COLORS.GREYSCALE.GRAYSCALE6), marginTop: 20 }}>
            {this.state.error.message}
          </FastText>
          <FastText style={{ ...font400(40, styles.COLORS.GREYSCALE.GRAYSCALE6), marginTop: 20 }}>
            {this.state.error.stack}
          </FastText>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}
