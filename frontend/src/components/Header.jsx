import Visibility from "./Visibility";

function Header() {
    return (
        <div className="relative w-full max-w-none min-h-full bg-bg-primary overflow-hidden">
            <nav className="bg-bg-primary text-text-primary text-xl p-4">
                <div className="sticky flex items-center space-x-2 z-10">
                    <span>📁 My Journal</span>
                    <Visibility />
                </div>
            </nav>
            <section className="relative w-screen max-w-none h-[400px] overflow-hidden">
                <img
                    src="/img/carina.webp"
                    alt="Carina Nebula"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-b from-transparent to-bg-primary z-10"></div>

                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl text-text-primary font-bold">
                        Welcome Back
                    </h1>
                    <p className="text-text-primary">
                        Capture your thoughts and reflections
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Header;
