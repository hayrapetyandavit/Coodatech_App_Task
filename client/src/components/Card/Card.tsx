import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateCardByIdAction } from "../../redux/card/cardSlice";
import { uploadFileAction } from "../../redux/files/filesSlice";
import { cardFiles, TCard } from "../../types/cardTypes";
import { filesSelector } from "../../redux/files/filesSelector";
import PopUp from "../PopUp/PopUp";
import { usersSelector } from "../../redux/auth/authSelector";
import { cardsSelector } from "../../redux/card/cardSelector";
import { Users } from "../../types/authTypes";

import "./card.scss";

interface IProps {
  id: number;
  title: string;
  userId: number;
}

const Card: React.FC<IProps> = (props) => {
  const { id, title, userId } = props;

  const [fileList, setFileList] = useState<FileList | null>(null);
  const [display, setDisplay] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const liRef = useRef<HTMLLIElement>(null);

  const dispatch = useDispatch();

  const users = useSelector(usersSelector) as Users[];
  const cards = useSelector(cardsSelector) as TCard[];
  const allFiles = useSelector(filesSelector);

  const card = cards.find((card) => card.id == id);
  const userName = users.find((user) => user.id == card?.userId);
  const name = `Created by ${
    userName ? userName.name.toLocaleUpperCase() : "unknown user"
  }`;
  const files = fileList ? Array.from(fileList) : [];
  const cardFiles = allFiles.filter((item: cardFiles) => item.cardId === id);

  const filesCount = cardFiles.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const handleFileUpload = () => {
    const data = new FormData();

    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    if (fileList) {
      dispatch(
        uploadFileAction({
          file: fileList,
          userId: `${userId}`,
          cardId: `${id}`,
        })
      );
    }

    if (liRef.current) {
      liRef.current.innerText = "";
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const elementId = (document.elementFromPoint(e.clientX, 80) as HTMLElement)
      .id;
    if (elementId) {
      dispatch(
        updateCardByIdAction({
          id: id,
          userId: userId,
          columnId: +elementId!,
        })
      );
    }
  };

  const handleOpenPopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inputRef.current !== e.target && btnRef.current !== e.target) {
      setDisplay(true);
    }
  };

  const handleClosePopup = (arg: boolean) => {
    setDisplay(arg);
  };

  return (
    <div
      id={`${id}`}
      draggable
      className="card-item"
      onDragEnd={handleDragEnd}
      onClick={handleOpenPopup}
    >
      {display ? (
        <PopUp
          title={title}
          cardId={id}
          userId={userId}
          setShow={handleClosePopup}
          cardFiles={cardFiles}
          name={name}
        />
      ) : null}
      <div className="card-title">
        {`${title} (${filesCount} ${filesCount > 1 ? "files" : "file"})`}
      </div>
      <div className="card-subtitle">
        {name}
        <hr />
      </div>
      <div className="card__file-upload">
        <input
          type="file"
          onChange={handleFileChange}
          ref={inputRef}
          accept="application/pdf, image/*, video/mp4"
        />
        <ul>
          {files.map((file) => (
            <li key={uuid()} ref={liRef}>
              {file.name} - {file.type}
            </li>
          ))}
        </ul>
        <button ref={btnRef} onClick={handleFileUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Card;
