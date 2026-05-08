import { Star } from 'lucide-react';

interface Props {
  value: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export default function StarRating({ value, onRate, readonly, size = 20 }: Props) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRate?.(star)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: readonly ? 'default' : 'pointer', display: 'flex' }}
          disabled={readonly}
        >
          <Star
            size={size}
            fill={star <= value ? "currentColor" : "none"}
            strokeWidth={2}
          />
        </button>
      ))}
    </div>
  );
}
