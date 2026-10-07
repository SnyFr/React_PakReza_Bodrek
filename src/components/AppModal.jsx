//props 

// import { Modal, Button } from "react-bootstrap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

export default function AppModal({show, onClose, size="md", title, children, onSubmit, submitLabel = 'Save', cancelLabel = 'Cancel', isLoading= false, showFooter=true}) {
  return (
    <Dialog open={show} openChange={onClose}>
    <DialogContent className="sm:max-w [540px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <div className="py-2">{children}</div>

        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : submitLabel}
          </Button>
          <Button variant="outline" onClick={() => onClose(false)}>
            {cancelLabel}
          </Button>
        </DialogFooter>
      </form>
  </DialogContent>
</Dialog>
  )
}