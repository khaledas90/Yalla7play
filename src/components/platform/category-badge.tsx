type CategoryBadgeProps = {
  name: string;
};

export function CategoryBadge({ name }: CategoryBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
      {name}
    </span>
  );
}
