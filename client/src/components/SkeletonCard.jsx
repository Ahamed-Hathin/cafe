export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="h-52 skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton rounded-full w-3/4" />
        <div className="h-3 skeleton rounded-full w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-6 skeleton rounded-full w-16" />
          <div className="h-9 skeleton rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}
