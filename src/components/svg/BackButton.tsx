import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 11l-4 4 4 4m-4-4h11a4 4 0 000-8h-1"
      />
    </Svg>
  );
}

export default SvgComponent;
