import React, { useEffect, useReducer } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  addCheckListApi,
  getCheckListsApi,
  deleteCheckListApi,
} from "../../services/utils";
import CheckListCard from "./checkListCard";
import { toast } from "sonner";

const initialState = {
  checkLists: [],
  loading: false,
  addCheckList: false,
  newCheckListName: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "checkListName":
      return {
        ...state,
        newCheckListName: action.value,
      };
    case "checkLists":
      return {
        ...state,
        checkLists: [...state.checkLists, ...action.data],
        newCheckListName: "",
      };
    case "loading":
      return {
        ...state,
        loading: !state.loading,
      };
    case "deleteCheckList":
      const updated = state.checkLists.filter((item) => item.id != action.id);
      return {
        ...state,
        checkLists: updated,
      };
  }
};

const CheckListModal = ({ open, setOpen, selectedCard }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDeleteCheckList = async (checklistId) => {
    try {
      console.log("in");
      const response = await deleteCheckListApi(checklistId);
      toast.success("New checkList deleted successfully.");
      dispatch({ type: "deleteCheckList", id: checklistId });
    } catch (err) {
      console.log("Error adding new checkList ", err.message);
      toast.error("Error deleting new Checklist");
    }
  };

  const handleAddCheckList = async () => {
    if (state.newCheckListName != "") {
      try {
        const response = await addCheckListApi(
          selectedCard.id,
          state.newCheckListName
        );
        dispatch({ type: "checkLists", data: [response.data] });
        toast.success("New checkList added successfully.");
      } catch (err) {
        console.log("Error adding new checkList ", err.message);
        toast.error("Error adding new Checklist");
      }
    }
  };

  async function fetchCheckList(cardId) {
    try {
      dispatch({ type: "loading" });
      const response = await getCheckListsApi(cardId);
      console.log("fetchchekLists", response);
      dispatch({ type: "checkLists", data: response.data });
    } catch (err) {
      console.log("Error fetching checkList ", err.message);
    } finally {
      dispatch({ type: "loading" });
    }
  }
  useEffect(() => {
    fetchCheckList(selectedCard.id);
  }, [selectedCard]);
  return (
    <Dialog className="max-h-[720px]" open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <span className="text-xl font-semibold m-auto">
            {selectedCard["name"]}
          </span>
          <div className="flex gap-1">
            <Input
              value={state.newCheckListName}
              placeholder="Enter checklist"
              onChange={(e) =>
                dispatch({ type: "checkListName", value: e.target.value })
              }
            />
            <Button onClick={handleAddCheckList} variant={"custom"}>
              Add
            </Button>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2.5  ">
          {state.loading ? (
            <h1>Loading..</h1>
          ) : state.checkLists.length > 0 ? (
            state.checkLists.map((checklist) => {
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
          ) : (
            <h1 className="text-xl font-semibold text-center">No Items</h1>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckListModal;
<DialogHeader>
  <DialogTitle>Are you absolutely sure?</DialogTitle>
</DialogHeader>;
