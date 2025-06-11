import { ReactNode } from "react";

function StorageLayout({ children }: { children: React.ReactNode }) {
    return <div className=" w-full">
       {children}
       </div>;
  }

  export default StorageLayout
