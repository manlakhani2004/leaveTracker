import Sidebar from "../_components/Sidebar";
import {AdminSidebar} from "../data/data"
export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-900">
            <Sidebar data={AdminSidebar} />

            <section className="flex-1 overflow-y-auto bg-slate-900 p-6 sm:p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </section>
        </div>
    );
}