type CircularProgressProps = {
  size: number;
  strokeWidth: number;
  progress: number;
  color?: string;
  text?: string;
};

export default function CircularProgress(props: CircularProgressProps) {
  const {
    size, strokeWidth, progress, color = '#000', text = '',
  } = props;
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (progress / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      <circle
        fill="none"
        stroke="#ccc"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        fill="none"
        stroke={color}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={`${[dash, circumference - dash]}`}
        // strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        dy="0.3em"
        textAnchor="middle"
        fill={color}
        fontSize="50"
        fontWeight="bold"
      >{text}</text>
    </svg>
  );
}
