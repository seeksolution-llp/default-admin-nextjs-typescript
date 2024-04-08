import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
const AddContent = dynamic(
  () => import("seeksolution/components/content/AddContent"),
  { ssr: false }
);
const Add = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value || "";

  return <AddContent accessToken={accessToken} />;
};
export default Add;
