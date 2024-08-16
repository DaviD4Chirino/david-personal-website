import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

// import { MdEmail as MailI } from "react-icons/md";
// import {
//   FaFacebook as FacebookI,
//   FaLinkedin as LinkedinI,
//   FaReddit as RedditI,
//   FaTelegram as TelegramI,
// } from "react-icons/fa";
// import { IoLogoWhatsapp as WhatsappI } from "react-icons/io";

// import { IoLink as LinkI } from "react-icons/io5";

export default function SharePage({
  title,
  url = window.location.href,
  iconSize = 16,
  ...props
}: JSX.IntrinsicElements["ul"] & {
  title?: string;
  url?: string;
  iconSize?: number;
}) {
  return (
    <ul {...props}>
      {/* <li>
        <IconButton color="primary">
          <LinkI />
        </IconButton>
      </li> */}
      <li>
        <EmailShareButton
          children={<EmailIcon size={iconSize} round />}
          url={url}
        />
      </li>
      <li>
        <WhatsappShareButton
          title={title}
          children={<WhatsappIcon size={iconSize} round />}
          url={url}
        />
      </li>
      <li>
        <TelegramShareButton
          title={title}
          children={<TelegramIcon size={iconSize} round />}
          url={url}
        />
      </li>
      <li>
        <FacebookShareButton
          children={<FacebookIcon size={iconSize} round />}
          url={url}
        />
      </li>

      <li>
        <RedditShareButton
          children={<RedditIcon size={iconSize} round />}
          url={url}
        />
      </li>

      <li>
        <LinkedinShareButton
          children={<LinkedinIcon size={iconSize} round />}
          url={url}
        />
      </li>
    </ul>
  );
}
