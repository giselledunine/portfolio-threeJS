export default function SIcon({
    color,
    size,
}: {
    color: string;
    size: number;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 127 127"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M78.4363 40.459C87.6775 35.9604 100.171 25.5225 96.2432 19.5402C90.8529 11.33 68.4424 18.0761 48.4578 32.8111C28.4731 47.5463 29.5238 61.7108 43.1225 63.0945C76.8585 66.5272 117.897 34.7021 99.3988 67.0013C87.6759 87.4703 60.4021 109.739 38.9755 110.969C21.5034 111.972 20.9583 88.5949 28.9832 73.0248"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
            />
        </svg>
    );
}
