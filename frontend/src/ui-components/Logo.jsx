import { Link } from "react-router-dom"

export default function Logo({ transparent = true, className = "" }) {
    return (
        <Link to="/" className={`flex items-center gap-3 ${className}`}>
            <img src="/logo/transparent.png" alt="" className="h-13"/>
            <h3 className="text-2xl font-bold text-[#805efd]">Aura Budget</h3>
        </Link>
    )
}