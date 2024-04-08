import dynamic from "next/dynamic";
import React from "react";

const Profile = dynamic(
  () => import("seeksolution/components/profile/Profile"),
  { ssr: false }
);
function page() {
  return (
    <div>
      <Profile />
    </div>
  );
}

export default page;
