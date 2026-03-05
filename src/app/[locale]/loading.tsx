export default function Loading() {
  return (
    <div className="w-full flex justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl animate-pulse space-y-8">
        <div className="h-12 bg-white/5 rounded-lg w-1/3"></div>
        <div className="space-y-4">
          <div className="h-8 bg-white/5 rounded w-3/4"></div>
          <div className="h-8 bg-white/5 rounded w-full"></div>
          <div className="h-8 bg-white/5 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
