import { useRouter } from "next/router";
import Header from "../Header"

type AppShellProps = {
    children: React.ReactNode
}

const disableHeader = ["/auth/login", "/auth/register", "/404"];

const AppShell = (props: AppShellProps) => {
    const { pathname } = useRouter();
    const { children } = props;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {!disableHeader.includes(pathname) && <Header />}
            <main>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default AppShell;