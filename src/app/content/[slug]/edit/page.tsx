import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
const EditContent = dynamic(
  () => import("seeksolution/components/content/EditContent"),
  { ssr: false }
);
const Edit = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value || "";

  return <EditContent accessToken={accessToken} />;
};
export default Edit;
