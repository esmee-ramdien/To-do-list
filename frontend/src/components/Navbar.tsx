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
                                <a onClick={() => navigateTo('/overzicht')}>
                                    Mijn overzicht
                                </a>
                            </li>
                            <li>
                            <a onClick={() => navigateTo('/nieuwe-lijst')}>
                                    Nieuwe taaklijst
                                </a>
                            </li>
                        </div>
                        <li>
                        <a onClick={() => navigateTo('/overzicht')}>
                                Inloggen
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
