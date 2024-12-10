import { cn } from "@/lib/utils";

interface CustomRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeName: string
    color: string;
    label?: string;
    value: number;
};

export const radioColor: { [key: string]: string } = {
    0: "border-[#FFB1AF] peer-checked:bg-[#FFB1AF]",
    25: "border-[#FFB1AF] peer-checked:bg-[#FFB1AF]",
    50: "border-[#DEDEDE] peer-checked:bg-[#DEDEDE]",
    75: "border-[#C0ECB1] peer-checked:bg-[#C0ECB1]",
    100: "border-[#C0ECB1] peer-checked:bg-[#C0ECB1]",
};

export const buttonColor: { [key: string]: string } = {
    0: "text-point border-[rgba(255,177,175, 0.2)] bg-medium",
    25: "text-point border-[rgba(255,177,175, 0.2)] bg-medium",
    50: "text-[#474C51] border-[#CACDD2] bg-[#F3F4F5]",
    75: "text-[#5EA146] border-[#C0ECB1] bg-[#E7FAE0]",
    100: "text-[#5EA146] border-[#C0ECB1] bg-[#E7FAE0]",
};

const CustomRadio = ({ placeName, color, value, label, ...props }: CustomRadioProps) => {
    return (
        <label className="flex items-center z-10 mx-2 cursor-pointer relative">
            <input type="radio" name={`${placeName}-vote`} className="peer hidden" value={value} {...props} />
            <span
                className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white",
                    radioColor[value] || "border-gray-500"
                )}
            ></span>
            {label && <span className='absolute  block w-[75px] font-regular text-xs translate-x-[-37.5%] translate-y-[150%] text-center'>{label}</span>}
        </label>
    );
};

export default CustomRadio