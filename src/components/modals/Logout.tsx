
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { DialogClose } from "@radix-ui/react-dialog"

interface DialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void

}

function Logout({ open, onOpenChange }: DialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you you wan't to logout</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button className="bg-blue-500">Confirm</Button>
                    <DialogClose asChild>
                        <Button variant={'destructive'}>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Logout
