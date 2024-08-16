import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

export default function SharePage({
  title,
  url = window.location.href,
  ...props
}: JSX.IntrinsicElements["ul"] & {
  title?: string;
  url?: string;
  props?: JSX.IntrinsicElements["ul"];
}) {
  return (
    <ul {...props}>
      <li>
        <WhatsappShareButton title={title} children={<div>WS</div>} url={url} />
      </li>
      <li>
        <FacebookShareButton children={<div>FB</div>} url={url} />
      </li>
      <li>
        <EmailShareButton children={<div>GM</div>} url={url} />
      </li>
      <li>
        <RedditShareButton children={<div>RD</div>} url={url} />
      </li>
      <li>
        <TelegramShareButton
          title={title}
          children={<div>TLGRM</div>}
          url={url}
        />
      </li>
      <li>
        <LinkedinShareButton children={<div>LD</div>} url={url} />
      </li>
    </ul>
  );
}
