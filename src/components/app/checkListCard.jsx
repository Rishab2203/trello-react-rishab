import { useEffect, useReducer } from "react";
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

const initialState = {
  checkItems: [],
  loading: false,
  addCheckItem: false,
  newCheckItemName: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "checkItemName":
      return {
        ...state,
        newCheckItemName: action.value,
      };
    case "checkItems":
      return {
        ...state,
        checkItems: [...state.checkItems, ...action.data],
        newCheckItemName: "",
      };
    case "loading":
      return {
        ...state,
        loading: !state.loading,
      };
    case "deletedCheckItem":
      const updateDeleted = state.checkItems.filter(
        (item) => item.id != action.id
      );
      return {
        ...state,
        checkItems: updateDeleted,
      };

    case "updateCheckItem":
      let updateCheck = state.checkItems.map((item) => {
        if (item.id === action.id) {
          item.state = action.latestState;
        }
        return item;
      });
      return {
        ...state,
        checkItems: updateCheck,
      };
  }
};

const CheckListCard = ({ checklist, handleDeleteCheckList }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDeleteCheckItem = async (checkItemId) => {
    try {
      const response = await deleteCheckItemApi(checklist.id, checkItemId);
      console.log("deletedCheckItem", response);
      dispatch({ type: "deletedCheckItem", id: checkItemId });
    } catch (err) {
      console.log("Error adding new checkItems ", err.message);
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
      console.log("updateCheckItem", response);
      dispatch({
        type: "updateCheckItem",
        id: checkItemId,
        latestState: state,
      });
    } catch (err) {
      console.log("Error updating checkItems ", err.message);
    }
  };

  const handleAddCheckItem = async () => {
    try {
      const response = await addCheckItemApi(
        checklist.id,
        state.newCheckItemName
      );
      console.log("newCheckItem", response);
      dispatch({ type: "checkItems", data: [response.data] });
    } catch (err) {
      console.log("Error adding new checkItems ", err.message);
    }
  };

  async function fetchCheckItems() {
    try {
      dispatch({ type: "loading" });
      const response = await getCheckItemsApi(checklist.id);
      dispatch({ type: "checkItems", data: response.data });
    } catch (err) {
      console.log("Error fetching checkItems ", err.message);
    } finally {
      dispatch({ type: "loading" });
    }
  }
  let progress = calProgress(state.checkItems) || 0;
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
          {state.checkItems.length > 0 ? (
            state.checkItems.map((checkItem) => {
              return (
                <div className="flex justify-between">
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
            value={state.newCheckItemName}
            onChange={(e) =>
              dispatch({ type: "checkItemName", value: e.target.value })
            }
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
