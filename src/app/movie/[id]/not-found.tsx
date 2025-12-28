export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Movie Not Found</h2>
        <p className="text-muted-foreground">
          The movie you're looking for doesn't exist or has been removed.
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
