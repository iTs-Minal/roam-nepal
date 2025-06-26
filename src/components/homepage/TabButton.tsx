// components/TabButton.tsx
export default function TabButton({ icon, label, isActive, onClick }: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 py-2 px-4 border-b-2 transition-all
        ${isActive ? "border-black text-black font-semibold" : "border-transparent text-gray-500"}`}
    >
      {icon}
      {label}
    </button>
  );
}
