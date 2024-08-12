import React from 'react';
import TopNavbar from "@/components/ui-components/TopNavbar";

type Props = {
    children: React.ReactNode;
}

const TicketsLayout = ({children}:Props) => {
    return (
        <div>
            <TopNavbar/>
            {children}
        </div>
    );
};

export default TicketsLayout;