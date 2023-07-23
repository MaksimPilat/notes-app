interface Props {
  name: string;
}

export default function Tag({ name }: Props) {
  return (
    <span
      style={{
        padding: "4px 8px",
        fontSize: "15px",
        border: "1px solid var(--blue)",
        borderRadius: "14px",
        color: "var(--blue)",
      }}
    >
      {name}
    </span>
  );
}
