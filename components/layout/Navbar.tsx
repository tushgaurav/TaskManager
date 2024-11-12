import Logo from "./Logo";

export default function Navbar() {
    return (
        <header className="container mx-auto pt-4 flex justify-between items-center">
            <Logo size="large" />

            <span className="font-bold text-gray-700">Frontend Assignment</span>
        </header>
    )
}