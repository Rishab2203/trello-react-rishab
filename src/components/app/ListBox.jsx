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

const initialState = {
  cards: [],
  loading: false,
  addCard: false,
  newCardName: "",
  selectedCard: "",
};

const reducer = (state, action) => {
  if (action.type === "cardsData") {
    return {
      ...state,
      cards: [...state.cards, ...action.value],
    };
  } else if (action.type === "loading") {
    return {
      ...state,
      loading: !state.loading,
    };
  } else if (action.type === "cardName") {
    return {
      ...state,
      newCardName: action.value || "",
    };
  } else if (action.type === "addCard") {
    return {
      ...state,
      addCard: !state.addCard,
      newCardName: "",
    };
  } else if (action.type === "deleteCard") {
    const updated = state.cards.filter((card) => card.id != action.id);
    return {
      ...state,
      cards: updated,
    };
  } else if (action.type === "card") {
    return {
      ...state,
      selectedCard: action.selectCard,
    };
  }
};

const ListBox = ({ list, handleArchiveList }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(false);

  const handleDeleteCard = async (id, e) => {
    try {
      const response = await deleteCardApi(id);
      dispatch({ type: "deleteCard", id: id });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCardClick = (card, e) => {
    if (e.target === e.currentTarget) {
      setOpen(!open);
      console.log(card);
      dispatch({ type: "card", selectCard: card });
    }
  };

  const handleAddCard = () => {
    async function addCard() {
      try {
        const response = await createCardInListApi(state.newCardName, list.id);
        if (response.status == 200) {
          console.log("addCard", response, [response.data]);
          dispatch({ type: "cardsData", value: [response.data] });
          dispatch({ type: "addCard" });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    if (state.newCardName != "") {
      addCard();
    }
  };

  useEffect(() => {
    async function fetchCards() {
      try {
        dispatch({ type: "loading" });
        const response = await getCardsInListApi(list.id);
        console.log("fetch", response);
        if (response) {
          dispatch({ type: "cardsData", value: response });
        }

        // setCards(response);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch({ type: "loading" });
      }
    }
    fetchCards();
  }, []);

  return (
    <>
      <CheckListModal
        open={open}
        setOpen={setOpen}
        selectedCard={state.selectedCard}
      />
      <Card className="w-[350px] h-fit min-w-[300px] ">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{list["name"]}</CardTitle>
          <Button className="r" onClick={handleArchiveList} variant={"custom"}>
            <IoArchiveOutline />
          </Button>
        </CardHeader>
        <CardContent>
          {!state.loading && state.cards.length === 0 ? (
            <h3>No cards available</h3>
          ) : (
            state.cards.map((card) => (
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
          {state.addCard ? (
            <div className="flex flex-col gap-2 w-full ">
              <Input
                value={state.newCardName}
                placeholder="Enter card name"
                onChange={(e) =>
                  dispatch({ type: "cardName", value: e.target.value })
                }
              />
              <div className="flex items-center justify-end gap-1">
                <Button onClick={() => handleAddCard()} variant={"custom"}>
                  Add
                </Button>
                <Button
                  onClick={() => dispatch({ type: "addCard" })}
                  variant={"custom"}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => dispatch({ type: "addCard" })}
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
