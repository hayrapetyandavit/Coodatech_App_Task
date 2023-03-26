import React, { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { deleteCardByIdAction } from "../../redux/card/cardSlice";
import {
  deleteFileByIdAction,
  getAllfilesAction,
} from "../../redux/files/filesSlice";
import { downLoadFileService } from "../../services/filesService";
import { cardFiles } from "../../types/cardTypes";

import "./popup.scss";

interface IProps {
  title: string;
  cardId: number;
  userId: number;
  setShow: (arg: boolean) => void;
  cardFiles: cardFiles[];
}

const PopUp: React.FC<IProps> = (props) => {
  const { title, cardId, userId, setShow, cardFiles } = props;

  useEffect(() => {
    dispatch(getAllfilesAction());
  }, []);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setShow);

  const dispatch = useDispatch();

  const handleDeleteCardClick = () => {
    dispatch(
      deleteCardByIdAction({
        id: cardId,
        userId: userId,
      })
    );
  };

  const handleDownloadCFilelick = (e: React.MouseEvent<HTMLDivElement>) => {
    const fileId = e.currentTarget.id;
    const fileName =
      (e.target as HTMLButtonElement).getAttribute("data-name") ||
      "Downloaded-file";
    downLoadFileService(fileId, fileName);
  };

  const handleDeleteFileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id.slice(4, e.currentTarget.id.length);
    dispatch(
      deleteFileByIdAction({
        id: id,
        userId: userId,
      })
    );
  };

  return (
    <div className="popup-container">
      <div className="popup-content" ref={wrapperRef}>
        <h2 className="popup-title">{title}</h2>
        <span
          className="popup-close"
          onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation();
            setShow(false);
          }}
        >
          &#10005;
        </span>
        <div className="card-info">
          <div className="card-info__content">
            {cardFiles.length > 0
              ? cardFiles.map((file: cardFiles) => {
                  return (
                    <div className="file-item" key={uuid()}>
                      <div className="file-name">{file.name}</div>
                      <div className="edit-part">
                        <div
                          className="file-download file-btn"
                          title="Download file"
                          id={`${file.id}`}
                          data-name={file.name}
                          onClick={handleDownloadCFilelick}
                        >
                          &#8595;
                        </div>
                        <div
                          className="file-delete file-btn"
                          id={`del-${file.id}`}
                          title="Delete file"
                          onClick={handleDeleteFileClick}
                        >
                          &#10005;
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No Uploaded Files"}
          </div>
        </div>
        <button className="card-delete" onClick={handleDeleteCardClick}>
          Delete Card
        </button>
      </div>
    </div>
  );
};

export default PopUp;
