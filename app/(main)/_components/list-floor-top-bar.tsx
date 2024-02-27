import { cn } from "@/lib/utils";

interface TopToggleMenuProps {
  selected: boolean;
  title: string;
  onClick?: () => void;
}

const TopToggleMenu = ({ selected, title, onClick }: TopToggleMenuProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl w-2/5 flex py-1 mt-5 cursor-pointer justify-center items-center",
        selected ? "bg-black" : "bg-white"
      )}
    >
      <span className={cn(selected ? "text-white" : "text-gray-400")}>
        {title}
      </span>
    </div>
  );
};

export default TopToggleMenu;
