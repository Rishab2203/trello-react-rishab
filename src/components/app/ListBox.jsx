import { useEffect, useReducer, useState } from "react";
import {
  getCardsInListApi,
  createCardInListApi,
  deleteCardApi,
} from "../../services/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IoArchiveOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import CheckListModal from "./checkListModal";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCard,
  selectCard,
  insertCards,
  deleteCard,
} from "../../redux/slices/CardSlice";

const ListBox = ({ list, handleArchiveList }) => {
  const [addCard, setAddCard] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { cards } = useSelector((state) => state.card);

  const handleDeleteCard = async (id, e) => {
    try {
      const response = await deleteCardApi(id);
      dispatch(deleteCard({ listId: list.id, cardId: id }));
      toast.success("Card deleted successfully.");
    } catch (err) {
      console.log(err.message);
      toast.error("Error deleting card.");
    }
  };

  const handleCardClick = (card, e) => {
    if (e.target === e.currentTarget) {
      setOpen(!open);
      console.log(card);
      dispatch(selectCard(card));
    }
  };

  const handleAddCard = async () => {
    if (newCardName != "") {
      try {
        const response = await createCardInListApi(newCardName, list.id);

        console.log("addCard", response, [response.data]);

        dispatch(addNewCard({ listId: list.id, data: response.data }));
        setAddCard(!addCard);
        setNewCardName("");
        toast.success("Card added successfully.");
      } catch (err) {
        console.log(err.message);
        toast.error("Error adding card.");
      }
    }
  };

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(!loading);
        const response = await getCardsInListApi(list.id);
        dispatch(insertCards({ listId: list.id, data: response }));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(!loading);
      }
    }
    fetchCards();
  }, []);

  return (
    <>
      {open && <CheckListModal open={open} setOpen={setOpen} />}

      <Card className="w-[350px] h-fit min-w-[300px] ">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{list["name"]}</CardTitle>
          <Button className="r" onClick={handleArchiveList} variant={"custom"}>
            <IoArchiveOutline />
          </Button>
        </CardHeader>
        <CardContent>
          {!loading && cards[list.id] ? (
            <h3>No cards available</h3>
          ) : (
            (cards[list.id] || []).map((card) => (
              <div
                onClick={(e) => handleCardClick(card, e)}
                key={card.id}
                className="flex w-full justify-between hover:bg-gray-200 p-1 px-1.5 mb-0.5"
              >
                <span>{card["name"]}</span>
                <button
                  className="relative z-10 p-0.5 rounded-[50%] hover:bg-white cursor-pointer w-6"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <MdOutlineDeleteForever size={"1.5rem"} />
                </button>
              </div>
            ))
          )}
        </CardContent>
        <CardFooter>
          {addCard ? (
            <div className="flex flex-col gap-2 w-full ">
              <Input
                value={newCardName}
                placeholder="Enter card name"
                onChange={(e) => setNewCardName(e.target.value)}
              />
              <div className="flex items-center justify-end gap-1">
                <Button onClick={() => handleAddCard()} variant={"custom"}>
                  Add
                </Button>
                <Button onClick={() => setAddCard(!addCard)} variant={"custom"}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setAddCard(!addCard)}
              className="w-full "
              variant={"custom"}
            >
              Add Card
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ListBox;
