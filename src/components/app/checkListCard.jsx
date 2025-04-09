import { useEffect, useReducer, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  addCheckItemApi,
  calProgress,
  deleteCheckItemApi,
  getCheckItemsApi,
  updateCheckItemApi,
} from "../../services/utils";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { Progress } from "../ui/progress";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCheckitem,
  deleteCheckitem,
  insertCheckitems,
  updateCheckItem,
} from "../../redux/slices/CheckitemsSlice";

const CheckListCard = ({ checklist, handleDeleteCheckList }) => {
  const [loading, setLoading] = useState(false);
  const [newCheckItemName, setNewCheckItemName] = useState("");
  const { checkItems } = useSelector((state) => state.checkItem);
  const dispatch = useDispatch();

  const handleDeleteCheckItem = async (checkItemId) => {
    try {
      const response = await deleteCheckItemApi(checklist.id, checkItemId);
      dispatch(
        deleteCheckitem({ checklistId: checklist.id, checkItemId: checkItemId })
      );
    } catch (err) {
      console.log("Error deleting new checkItems ", err.message);
    }
  };

  const handleCheckItemChange = async (checkItemId, checkItemState) => {
    try {
      const state = checkItemState === "complete" ? "incomplete" : "complete";

      const response = await updateCheckItemApi(
        checklist.idCard,
        checkItemId,
        state
      );

      dispatch(
        updateCheckItem({
          checklistId: checklist.id,
          checkItemId: checkItemId,
          latestState: state,
        })
      );
    } catch (err) {
      console.log("Error updating checkItems ", err.message);
    }
  };

  const handleAddCheckItem = async () => {
    try {
      const response = await addCheckItemApi(checklist.id, newCheckItemName);

      dispatch(
        addNewCheckitem({ checklistId: checklist.id, data: response.data })
      );
      setNewCheckItemName("");
    } catch (err) {
      console.log("Error adding checkitem", err.message);
    }
  };

  async function fetchCheckItems() {
    try {
      setLoading(!loading);
      const response = await getCheckItemsApi(checklist.id);
      dispatch(
        insertCheckitems({ checklistId: checklist.id, data: response.data })
      );
    } catch (err) {
      console.log("Error fetching checkItems ", err.message);
    } finally {
      setLoading(!loading);
    }
  }
  let progress = calProgress(checkItems[checklist.id] || []) || 0;
  useEffect(() => {
    fetchCheckItems();
  }, []);
  return (
    <Card className="py-2 gap-1">
      <CardHeader className="flex justify-between">
        <CardTitle>{checklist["name"]}</CardTitle>
        <button
          onClick={handleDeleteCheckList}
          className="cursor-pointer rounded-[50%] p-1 hover:bg-gray-200 "
        >
          <MdOutlineDeleteForever size={"1.5rem"} />
        </button>
      </CardHeader>
      <div className="flex flex-col items-center">
        <Progress className={"w-3/4 m-auto my-1"} value={progress} />
        <span>{progress.toFixed(2)}%</span>
      </div>

      <div className="bg-gray-300 p-2 mx-1.5 rounded-md">
        <CardContent>
          {checkItems[checklist.id] ? (
            (checkItems[checklist.id] || []).map((checkItem) => {
              return (
                <div key={checkItem.id} className="flex justify-between">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={checkItem.state === "complete"}
                      onChange={() =>
                        handleCheckItemChange(checkItem.id, checkItem.state)
                      }
                    />
                    <span>{checkItem["name"]}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCheckItem(checkItem.id)}
                    className="cursor-pointer rounded-[50%] p-1 hover:bg-gray-200 "
                  >
                    <RxCross1 />
                  </button>
                </div>
              );
            })
          ) : (
            <span>No Check items</span>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center gap-1 mt-3">
          <Input
            className={"bg-white"}
            value={newCheckItemName}
            onChange={(e) => setNewCheckItemName(e.target.value)}
            placeholder="Add checkitem"
          />
          <Button variant={"custom"} onClick={handleAddCheckItem}>
            Add
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CheckListCard;
