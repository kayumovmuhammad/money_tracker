
import { Skeleton } from "@mui/material";

const DashboardSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center">
      <div className="w-full max-w-250">
        <div className="mb-5 flex items-center ">
          <div className="flex-1"></div>
          <Skeleton
            variant="rectangular"
            height={60}
            className="rounded-xl flex-1"
            />
          <div className="flex-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 mb-7.5">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={150}
              className="rounded-xl"
            />
          ))}
        </div>

        {/* Stats Charts Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7.5 w-full">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={280}
              className="rounded-xl"
            />
          ))}
        </div>

        {/* Transactions Header Skeleton */}
        <div className="mb-5 flex justify-between items-center">
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rectangular" width={100} height={40} className="rounded-lg" />
        </div>

        {/* Transaction List Skeleton */}
        <div className="space-y-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 rounded-lg">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </div>
              <Skeleton variant="text" width={80} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
