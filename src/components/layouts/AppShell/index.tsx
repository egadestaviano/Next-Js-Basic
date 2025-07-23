import { useRouter } from "next/router";
import Navbar from "../Navbar"

type AppShellProps = {
    children: React.ReactNode
}

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

const AppShell = (props: AppShellProps) => {
    const {pathname} = useRouter();
    const {children} = props;
    
    
    return (
        <div>
            <main>
                {!disableNavbar.includes(pathname) && <Navbar />}
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default AppShell;