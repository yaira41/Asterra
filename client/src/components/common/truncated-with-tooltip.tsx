import { Tooltip } from "@mui/material";

type TruncatedWithTooltipProps = {
  text: string;
};

const TruncatedWithTooltip = ({ text }: TruncatedWithTooltipProps) => {
  return text.length > 7 ? (
    <Tooltip title={text} arrow>
      <span>{text.substring(0, 7)}...</span>
    </Tooltip>
  ) : (
    <span>{text}</span>
  );
};

export default TruncatedWithTooltip;
