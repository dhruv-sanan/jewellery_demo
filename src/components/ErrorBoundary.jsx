import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-primary text-[clamp(36px,5vw,64px)] text-text-light mb-6">
              Something went wrong
            </h1>
            <p className="font-secondary text-text-muted mb-10 text-[15px]">
              Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-secondary text-[13px] tracking-wider uppercase text-background bg-gold px-8 py-4 hover:bg-gold-hover transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
