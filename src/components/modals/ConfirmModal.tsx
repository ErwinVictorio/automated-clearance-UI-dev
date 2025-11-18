
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { DialogClose } from "@radix-ui/react-dialog"


interface DialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  description: string,
  ButtonAction: string
}

export default function ConfirmModal({
  open,
  onOpenChange,
  description,
  ButtonAction
}: DialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant={'destructive'}>
              Cancel
            </Button>
          </DialogClose>
          <Button className="cursor-pointer">
            {ButtonAction}
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}
