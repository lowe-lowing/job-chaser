"use client";
import { type FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface ConfirmDialogProps {
  onConfirm: () => void;
  message: string;
  children: React.ReactNode;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ children, message, onConfirm }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-72">
        <DialogHeader>
          <DialogTitle className="font-semibold">{message}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => onConfirm()}>Confirm</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
