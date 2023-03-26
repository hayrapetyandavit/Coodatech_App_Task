import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  columnsSelector,
  loadingSelector,
  errorSelector,
  messageSelector,
} from "../../redux/column/columnSelector";
import {
  columnsReset,
  getAllColumnsAction,
  createColumnAction,
} from "../../redux/column/columnSlice";
import { getAllfilesAction } from "../../redux/files/filesSlice";
import { cardsSelector } from "../../redux/card/cardSelector";
import { userSelector } from "../../redux/auth/authSelector";
import { getAllCardsAction } from "../../redux/card/cardSlice";
import { getAllUsersAction } from "../../redux/auth/authSlice";
import { motion } from "framer-motion";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import AddBoard from "../AddBoard/AddBoard";
import Column from "../Column/Column";

import "./board.scss";

const Board: React.FC = () => {
  const columns = useSelector(columnsSelector);
  const cards = useSelector(cardsSelector);
  const user = useSelector(userSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const message = useSelector(messageSelector);

  const dispatch = useDispatch();

  const [colTitle, setColTitle] = useState("");

  useEffect(() => {
    dispatch(getAllColumnsAction());
    dispatch(getAllCardsAction());
    dispatch(getAllUsersAction());
    dispatch(getAllfilesAction());

    return () => {
      dispatch(columnsReset());
    };
  }, []);

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColTitle(e.target.value);
  };

  const handleButtonClick = (title: string) => {
    dispatch(
      createColumnAction({
        title: title || "Unknown",
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="board__container"
    >
      <div className="board__content">
        <div className="columns">
          {!loading && !error ? (
            <>
              {columns.map((item: { id: number; title: string }) => {
                return (
                  <React.Fragment key={uuid()}>
                    <Column
                      id={item.id}
                      title={item.title}
                      data={cards}
                      userId={user.id}
                    />
                  </React.Fragment>
                );
              })}
              <AddBoard
                title="add column"
                className="add-column"
                placeholder="Column title..."
                onClick={() => handleButtonClick(colTitle)}
                onBlur={handleBlur}
              />
            </>
          ) : null}
          {loading && !error ? <Spinner /> : null}
          {error ? (
            <>
              <ErrorMessage message={message} />
            </>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default Board;
function filesReset(): any {
  throw new Error("Function not implemented.");
}

