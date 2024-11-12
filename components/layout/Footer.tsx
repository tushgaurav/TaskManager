import Link from "next/link";

export default function Footer() {
    return (
        <footer className="container mx-auto py-4 text-center text-gray-500 mt-auto">
            <span className="text-sm">&copy; {new Date().getFullYear()} <Link href="https://tushgaurav.in">Tushar Gaurav</Link> - SuperDM Assignment</span>
        </footer>
    )
}