import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Loader() {
  return (
    <div className="sweet-loading">
      <HashLoader css={override} size={60} color={"#36d7b7"} />
    </div>
  );
}
