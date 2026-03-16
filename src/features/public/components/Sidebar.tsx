import Link from "next/link"

// icons
import { FaHome } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";


export default function Sidebar() {
    return (
        <aside className="w-64 bg-[#1D232C] text-white py-8 px-6">
            <h2 className="text-2xl font-bold mb-6">Clinic App</h2>
            <nav>
                <ul>
                    <li>
                        <Link className="px-6 text-[#586A84] py-2 rounded-lg w-full block mb-4"
                            href="/dashboard">
                            <div className="flex items-center space-x-3">
                                <FaHome /><span>Home</span>
                            </div>
                        </Link>
                    </li>
                    <li className="bg-[#0077E4] text-white mb-4 px-6 py-2 rounded-md">
                        <Link href="/roles">
                            <div className="flex items-center space-x-3">
                                <FaGear /> <span>Roles</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside >
    )
}