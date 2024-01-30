import React, { ReactNode } from "react";
import Spinner from "./spinner";

export default function HomeSection({
  title,
  loading,
  children,
}: Readonly<{
  title: string;
  loading?: boolean;
  children?: ReactNode;
}>) {
  return (
    <div className="w-full min-h-50 flex flex-col items-center bg-white">
      <h1 className="text-2xl font-bold py-10">{title}</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full px-10 py-5 flex flex-col items-center">
          {children ? (
            children
          ) : (
            <p className="text-gray-500">No content available</p>
          )}
        </div>
      )}
      {!children && !loading && (
        <p className="text-center font-semibold text-xl text-gray-600">
          No content available
        </p>
      )}
    </div>
  );
}
