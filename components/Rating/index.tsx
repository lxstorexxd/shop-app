import { useState } from "react";
import Icon from "@/lib/IconSprite";

const Rating = ({
  value,
  onValueChange,
  label,
  head,
  isDisable = false,
  isCompact = false,
}: {
  value?: number;
  onValueChange?: (value: number) => void;
  label?: string;
  head?: string;
  isDisable?: boolean;
  isCompact?: boolean;
}) => {
  const [rating, setRating] = useState(Math.round(value ?? 0));

  const handleRatingChange = (v: number) => {
    setRating(v);
    if (onValueChange) {
      onValueChange(v);
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${
        isCompact ? "flex-col" : ""
      }`}
    >
      <div className="max-w-fit">
        {head && (
          <h3 className="text-medium font-medium leading-8 text-default-600">
            {head}
          </h3>
        )}
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => (
              <label
                key={index}
                className={`group relative inline-flex items-center justify-start cursor-pointer tap-highlight-transparent -m-2 active:scale-90 select-none ${
                  isCompact ? "p-1" : "p-2"
                }`}
              >
                <input
                  disabled={isDisable}
                  type="radio"
                  value={index + 1}
                  checked={index + 1 === rating}
                  onChange={() => handleRatingChange(index + 1)}
                  className="hidden"
                />
                <Icon
                  name="star"
                  size={isCompact ? 20 : 24}
                  className={`pointer-events-none transition-transform-colors ${
                    index + 1 <= rating ? "fill-primary" : "fill-default-200"
                  }`}
                />
              </label>
            ))}
          </div>
          {label && (
            <p
              className={`text-small text-default-400 ${
                isCompact ? "text-center" : ""
              }`}
            >
              {label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rating;
