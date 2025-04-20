import { useState } from "react";

function Visibility() {
    const [isOpen, setIsOpen] = useState(false);

    function clickHandler() {
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 150);
    }

    return (
        <div className="relative inline-block cursor-pointer rounded-2xl hover:bg-bg-card p-1 px-2">
            <div
                onMouseEnter={clickHandler}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div className="text-text-secondary">🔒 Private</div>
            </div>
            {isOpen && (
                <div className="absolute top-full mt-2 left-0 w-max rounded-md p-2 bg-neutral-800 text-sm text-white shadow-lg border border-neutral-700 z-100">
                    Only you can see this page.
                </div>
            )}
        </div>
    );
}

export default Visibility;
