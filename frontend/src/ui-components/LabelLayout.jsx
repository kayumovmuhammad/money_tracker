import capitalizeFirstLatter from "../api/capitalizeFirstLatter";

export default function LabelLayout({ children, label }) {
    return <div className="relative flex-1">
        {children}
        <div className="absolute -top-2 left-3 bg-white text-[12px] text-black/70 px-1">
            {capitalizeFirstLatter(label)}
        </div>
    </div>;
}