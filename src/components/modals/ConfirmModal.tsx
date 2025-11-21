
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
  description: string | null,
  ButtonAction: () => void
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
          <DialogTitle className="text-gray-700">Please Confirm</DialogTitle>
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
          <Button onClick={ButtonAction} className="cursor-pointer">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}
