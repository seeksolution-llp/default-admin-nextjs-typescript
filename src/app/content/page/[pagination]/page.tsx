import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "seeksolution/utils/constant";
const ContentListing = dynamic(
  () => import("seeksolution/components/content/ContentListing"),
  { ssr: false }
);
const ContentListingPage = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value || "";

  return <ContentListing accessToken={accessToken} />;
};
export default ContentListingPage;
