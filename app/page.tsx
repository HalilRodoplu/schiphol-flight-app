import TopNavbar from "@/components/ui-components/TopNavbar";
import Flights from "@/components/ui-components/Flights";
import Advertises from "@/components/ui-components/Advertises";

export default function Home() {
    return (
        <div className="">
            <TopNavbar/>
            <div className="flex flex-row gap-4">
                <Flights/>
                <Advertises/>
            </div>

        </div>
    );
}
