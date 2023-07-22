import { Typography } from "@mui/material";

export default function HighlightTags({ children }: React.PropsWithChildren) {
  const tagRegex = /#([^#\s]+)/g;
  let match;
  const parts = [];
  let lastIndex = 0;

  const content = children?.toString() || "";

  while ((match = tagRegex.exec(content))) {
    const tag = match[0];
    const tagStartIndex = match.index;
    const tagEndIndex = tagStartIndex + tag.length;

    if (tagStartIndex > lastIndex) {
      parts.push(content.slice(lastIndex, tagStartIndex));
    }

    parts.push(
      <span key={tagStartIndex} style={{ color: "var(--blue)" }}>
        {tag}
      </span>
    );

    lastIndex = tagEndIndex;
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return <Typography>{parts}</Typography>;
}
