import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tooltip,
} from "@nextui-org/react";
import Icon from "@/lib/IconSprite";
import { signIn } from "next-auth/react";

const ModalAuthorization = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pt-8">
              <h1 className="text-large font-semibold">
                Авторизируйтесь, чтобы оставлять комментарии
              </h1>
            </ModalHeader>
            <ModalBody className="pb-8">
              <div className="flex gap-2">
                <Tooltip content="Вконтакте">
                  <Button
                    color="primary"
                    onPress={() => signIn("vk")}
                    isIconOnly
                  >
                    <Icon name="vk" size={24} className="fill-white" />
                  </Button>
                </Tooltip>
                <Tooltip content="Яндекс">
                  <Button
                    color="danger"
                    onPress={() => signIn("yandex")}
                    isIconOnly
                  >
                    <Icon name="yandex" size={24} className="fill-white" />
                  </Button>
                </Tooltip>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalAuthorization;
