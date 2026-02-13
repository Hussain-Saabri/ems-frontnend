import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <AlertCircle size={40} />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">Oops! Something went wrong</h1>
                    <p className="mb-8 max-w-md text-gray-600">
                        An unexpected error has occurred in the application. We have recorded this issue.
                    </p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                        <RefreshCcw size={18} />
                        Refresh Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
