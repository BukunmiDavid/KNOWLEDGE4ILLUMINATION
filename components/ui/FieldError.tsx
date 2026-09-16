export function FieldError({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <p id={id} role="alert" className="text-xs font-medium text-red-600">
      {children}
    </p>
  );
}