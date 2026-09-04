
// loading screens 
export function LoadingView({ label = "Loading weather..." }) {
    return (
        <div className="status-view status-view--loading" role="status">
            <span className="spinner" aria-hidden="true" />
            <p>{label}</p>
        </div>
    );
}

export function ErrorView({ message = "Something went wrong.", onRetry }) {
    return (
        <div className="status-view status-view--error" role="alert">
            <p>{message}</p>
            {onRetry && (
                <button type="button" onClick={onRetry} className="retry-btn">
                    Try again
                </button>
            )}
        </div>
    );
}
