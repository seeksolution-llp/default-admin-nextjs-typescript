import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import UsersListing from "seeksolution/components/users/UsersListing";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
const StatisticCompo = dynamic(
  () => import("seeksolution/components/dashboard/StatisticCompo"),
  { ssr: false }
);
const DashboardPage = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value || "";
  return (
    <>
      <StatisticCompo />
      <UsersListing accessToken={accessToken} />
    </>
  );
};
export default DashboardPage;
