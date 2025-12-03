import SideBar from "@/components/Layout/Dashboard/DashboardSidebar/SideBar";
import ProfileLayout from "@/components/Layout/Dashboard/ProfileLayoutSidebar/ProfileLayout";

export const metadata = {
  title: "Dashboard Page",
  description: "This is the dashboard layout",
};
export default function DashboardLayout({ children }) {
  return (
    <div className=" lg:grid grid-cols-12 max-w-[1500px] mx-auto pt-6 gap-6 justify-center bg-gray-50 rounded-xl">
      <div className="hidden lg:block col-span-2 h-full sticky top-0 ">
        <SideBar />
      </div>
      <main className=" col-span-7 h-full bg-blue-500">{children}</main>
      <div className="profile-info col-span-3 border border-gray-300">
        <ProfileLayout />
      </div>
    </div>
  );
}
