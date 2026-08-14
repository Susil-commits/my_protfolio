import React from 'react';

/**
 * Enterprise-grade React Error Boundary with graceful fallback UI
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl border border-pearl/15 bg-obsidian/80 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl">
              ⚠️
            </div>
            <div>
              <h2 className="text-xl font-bold text-pearl">Something went wrong</h2>
              <p className="text-sm text-mist mt-2">
                An unexpected interface error occurred. Please refresh or return to the main view.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={this.handleReload}
                className="btn-primary !py-2.5 !px-6 text-sm font-medium w-full justify-center"
              >
                Reload Portfolio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
