import React from "react";

const Chart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const getSlicePath = (startAngle, endAngle, radius) => {
    const start = polarToCartesian(radius, startAngle);
    const end = polarToCartesian(radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      "M",
      200,
      200,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
      "Z",
    ].join(" ");
  };

  const polarToCartesian = (radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: 200 + radius * Math.cos(angleInRadians),
      y: 200 + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div className="w-full flex flex-row items-center">
      <div className="relative">
        <svg viewBox="0 0 400 400" className="w-full">
          {data.map((item, index) => {
            const sliceAngle = (item.value / total) * 360;
            const path = getSlicePath(
              currentAngle,
              currentAngle + sliceAngle,
              150
            );
            const midAngle = currentAngle + sliceAngle / 2;
            const labelPos = polarToCartesian(180, midAngle);

            const startAngle = currentAngle;
            currentAngle += sliceAngle;

            return (
              <g key={index}>
                <path
                  d={path}
                  fill={item.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <title>{`${item.name}: ${((item.value / total) * 100).toFixed(
                    1
                  )}%`}</title>
                </path>
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  className="text-xs fill-white font-medium"
                >
                  {((item.value / total) * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid grid-rows-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center ">
            <div
              className="w-3 h-3 rounded-sm mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">
              {item.name} ({((item.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
