import { Button } from "@/components/ui/button";
import { addNewBoard } from "../../services/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function AddBoardModal({ setBoards }) {
  const [newBoardName, setNewBoardName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreateBoard = (board) => {
    async function newBoard() {
      try {
        const result = await addNewBoard(board);
        console.log(result.data);
        toast.success("Board has been created.");

        setNewBoardName("");
        setOpen(false);
        setBoards((prev) => [...prev, result.data]);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong while creating the board.");
      }
    }
    newBoard();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"projectDefault"} size={"card"}>
          create new board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#333333]">
        <DialogHeader>
          <DialogTitle className={"text-white text-2xl"}>
            Create new board
          </DialogTitle>
          <DialogDescription className={"text-white"}>
            Add name of your board here. Click add when you're done.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Name the board"
          id="name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          className="bg-white text-black"
        />

        <DialogFooter>
          <Button
            type="submit"
            className={
              "border border-white text-white hover:bg-white hover:text-black"
            }
            onClick={() => handleCreateBoard(newBoardName)}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
