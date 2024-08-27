import {
  Button,
  ButtonProps,
  Modal as Dialog,
  ModalProps,
} from "flowbite-react";
import { useToggle } from "react-use";

type ConsentModalProps = ButtonProps & {
  button: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  acceptText?: string;
  declineText?: string;
  dialogProps?: ModalProps;
  onAccept?: Function;
  onDecline?: Function;
};

export default function ConsentModal(props: ConsentModalProps) {
  const [open, toggleOpen] = useToggle(false);
  const {
    button,
    children,
    dialogProps,
    title,
    acceptText,
    declineText,
    onAccept,
    onDecline,
    ...rest
  } = props;

  function handleAccept() {
    if (onAccept) {
      onAccept();
    }
    toggleOpen(false);
  }

  function handleDecline() {
    if (onDecline) {
      onDecline();
    }
    toggleOpen(false);
  }
  return (
    <>
      <Button type="button" onClick={toggleOpen} {...rest}>
        {button}
      </Button>
      <Dialog
        show={open}
        onClose={() => toggleOpen(false)}
        {...dialogProps}
        className={`${
          dialogProps?.className ? dialogProps.className : ""
        } animate-fade animate-duration-150 `}
      >
        <Dialog.Header>
          <p className="text-center text-xl">{title ? title : "Attention!"}</p>
        </Dialog.Header>
        <Dialog.Body>
          {children ? (
            children
          ) : (
            <p className="text-center">Are you certain you want to continue?</p>
          )}
        </Dialog.Body>
        <Dialog.Footer className="grid grid-cols-[2fr_1fr]">
          <Button
            type="button"
            className="bg-primary-darkest text-primary-lightest hover:bg-primary-dark h-full"
            id="AcceptButton"
            onClick={handleAccept}
          >
            {acceptText || "Yes"}
          </Button>
          <Button
            type="button"
            className="
          h-max
          border-2 
          border-primary-darkest hover:border-primary-dark
          text-primary-darkest
          "
            id="DeclineButton"
            onClick={handleDecline}
          >
            {declineText || "No"}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}
