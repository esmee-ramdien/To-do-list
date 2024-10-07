import router from "../router";

function Navbar() {
    const navigateTo = (to: string) => {
        router.navigate(to)
    }
    return (
        <>
            <nav className='fixed top-0 left-0 z-50 w-full mb-4 bg-cyan-800'>
                <div className='block p-4'>
                    <ul className="flex flex-row justify-between font-medium text-xl space-x-4 w-full">
                        <div className="flex space-x-4">
                            <li>
                                <a onClick={() => navigateTo('/overview')}>
                                    Overview
                                </a>
                            </li>
                            <li>
                            <a onClick={() => navigateTo('/new-list')}>
                                    New Task List
                                </a>
                            </li>
                        </div>
                        <li>
                        <a onClick={() => navigateTo('/overview')}>
                                Log in/Sign up
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
