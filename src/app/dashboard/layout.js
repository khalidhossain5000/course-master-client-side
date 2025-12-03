import DashboardBanner from "@/components/Layout/Dashboard/DashboardBanner/DashboardBanner";
import SideBar from "@/components/Layout/Dashboard/DashboardSidebar/SideBar";
import ProfileLayout from "@/components/Layout/Dashboard/ProfileLayoutSidebar/ProfileLayout";

export const metadata = {
  title: "Dashboard Page",
  description: "This is the dashboard layout",
};
export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="">
        <DashboardBanner />
      </div>
      <div className="mt-5 py-24 lg:grid grid-cols-12 max-w-[1600px] mx-auto pt-6 gap-6 justify-center  rounded-xl">
        <div className="hidden lg:block col-span-2 h-full sticky top-0 ">
          <SideBar />
        </div>
        <main className=" col-span-7 h-full ">{children}</main>
        <div className="profile-info col-span-3 border border-gray-300 ">
          <ProfileLayout />
        </div>
      </div>
    </div>
  );
}
