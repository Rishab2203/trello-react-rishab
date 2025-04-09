import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  addCheckListApi,
  getCheckListsApi,
  deleteCheckListApi,
} from "../../services/utils";
import CheckListCard from "./checkListCard";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewChecklist,
  deleteChecklist,
  insertChecklists,
} from "../../redux/slices/CardSlice";

const CheckListModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [newCheckListName, setNewCheckListName] = useState("");

  const { selectedCard, checklists } = useSelector((state) => state.card);
  const dispatch = useDispatch();

  const handleDeleteCheckList = async (checklistId) => {
    try {
      const response = await deleteCheckListApi(checklistId);
      dispatch(deleteChecklist(checklistId));
      toast.success("New checkList deleted successfully.");
    } catch (err) {
      console.log("Error adding new checkList ", err.message);
      toast.error("Error deleting new Checklist");
    }
  };

  const handleAddCheckList = async () => {
    if (newCheckListName != "") {
      try {
        const response = await addCheckListApi(
          selectedCard.id,
          newCheckListName
        );
        dispatch(addNewChecklist(response.data));
        setNewCheckListName("");

        toast.success("New checkList added successfully.");
      } catch (err) {
        console.log("Error adding new checkList ", err.message);
        toast.error("Error adding new Checklist");
      }
    }
  };

  async function fetchCheckList(cardId) {
    try {
      setLoading(true);
      const response = await getCheckListsApi(cardId);

      dispatch(insertChecklists(response.data));
    } catch (err) {
      console.log("Error fetching checkList ", err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!checklists[selectedCard.id]) {
      fetchCheckList(selectedCard.id);
    }
  }, [selectedCard, checklists]);
  return (
    <Dialog className="max-h-[720px]" open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <span className="text-xl font-semibold m-auto">
            {selectedCard["name"]}
          </span>
          <div className="flex gap-1">
            <Input
              value={newCheckListName}
              placeholder="Enter checklist"
              onChange={(e) => setNewCheckListName(e.target.value)}
            />
            <Button onClick={handleAddCheckList} variant={"custom"}>
              Add
            </Button>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2.5  ">
          {loading ? (
            <h1>Loading..</h1>
          ) : (
            (checklists[selectedCard.id] || []).map((checklist) => {
              return (
                <CheckListCard
                  key={checklist.id}
                  checklist={checklist}
                  handleDeleteCheckList={() =>
                    handleDeleteCheckList(checklist.id)
                  }
                />
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckListModal;
