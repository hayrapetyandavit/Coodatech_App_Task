import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import {
  createCardAction
} from "../../redux/card/cardSlice";
import { TCard } from "../../types/cardTypes";
import AddBoard from "../AddBoard/AddBoard";
import Card from "../Card/Card";

import "./column.scss";

interface IProps {
  id: number;
  title: string;
  data: TCard[];
  userId: number;
}

const Column: React.FC<IProps> = (props) => {
  const { id, title, data, userId } = props;

  const [cardTitle, setCardlTitle] = useState("");

  const dispatch = useDispatch();

  const myRef = useRef<any>();

  const [x, setX] = useState();
  const [y, setY] = useState();

  const getPosition = () => {
    const x = myRef.current.offsetLeft;
    setX(x);

    const y = myRef.current.offsetTop;
    setY(y);
  };

  useEffect(() => {
    getPosition();
  }, []);

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardlTitle(e.currentTarget.value);
  };

  const handleButtonClick = () => {
    dispatch(
      createCardAction({
        title: cardTitle || "Unknown",
        userId: userId,
        columnId: id,
      })
    );
  };

  const dataForColumn = data.filter((item) => item.columnId === id);

  return (
    <div id={`${id}`} className="column-item" ref={myRef}>
      <h3 className="column-title">{title}</h3>
      {dataForColumn.map((item: TCard) => {
        return (
          <Card id={item.id} title={item.title} key={uuid()} userId={userId} />
        );
      })}
      <AddBoard
        title="add card"
        className="add-column add-card"
        placeholder="Card title..."
        onClick={handleButtonClick}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Column;
