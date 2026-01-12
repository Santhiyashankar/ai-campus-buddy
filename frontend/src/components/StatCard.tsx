
interface StatCardProps {
  title: string;
  value: number | string;
  icon?: string;
  bgColor?: string;
}

export default function StatCard({ title, value, icon, bgColor }: StatCardProps) {
  return (
    <div
      className={`flex items-center p-6 rounded-2xl shadow-lg text-white ${bgColor} hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300`}
    >
      {icon && <span className="text-4xl mr-4">{icon}</span>}
      <div>
        <p className="text-xl font-medium">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
