import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import "./layer-panel.styles.scss";
import { KeyButton } from "../key-button/key-button.component";
import { IconButton, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { DeleteLayerButton } from "../delete-layer-button/delete-layer-button.compnent";
import { LayoutContext } from "../../providers/layout/layout.provider";

export const LayerPanel = (props) => {
  const { children, index, layer, ...other } = props;
  const { updateLayerLabel, moveLayer, selectedLayerIndex } =
    useContext(LayoutContext);
  const [isEdit, setIsEdit] = useState(false);
  const [label, setLabel] = useState(layer.label);
  const [error, setError] = useState(false);

  // const gridLeft = () => {
  //   return (
  //     <div className="grid-left">
  //       {layer.bindings.map((key, index) => {
  //         const button = <KeyButton key={key.index} keyData={key} />;
  //         if (
  //           index < 5 ||
  //           (index > 9 && index < 15) ||
  //           (index > 19 && index < 25) ||
  //           (index > 29 && index < 33)
  //         ) {
  //           return button;
  //         }
  //         return null;
  //       })}
  //     </div>
  //   );
  // };

  // const gridRight = () => {
  //   return (
  //     <div className="grid-right">
  //       {layer.bindings.map((key, index) => {
  //         const button = <KeyButton key={key.index} keyData={key} />;
  //         if (
  //           (index > 4 && index < 10) ||
  //           (index > 14 && index < 20) ||
  //           (index > 24 && index < 30) ||
  //           index > 32
  //         ) {
  //           return button;
  //         }
  //         return null;
  //       })}
  //     </div>
  //   );
  // };

  const handleOnChange = (e) => {
    const input = e.target.value;
    setLabel(input);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setError(false);
    setLabel(layer.label);
  };

  const handleSave = () => {
    const input = label;
    if (!label) {
      setError(true);
    } else {
      updateLayerLabel({ input });
      setError(false);
      setIsEdit(false);
    }
  };

  const handleMoveLayer = (e) => {
    const direction = e.target.value;
    moveLayer({ direction, index });
  };

  const fakeKey = {
    "index": 0,
    "label": "K",
    "tap": {
      "id": 5218,
      "key_category_id": 61,
      "code": "Q",
      "label": "Q",
      "description": null,
      "created_at": "2021-12-28T09:52:59.183Z",
      "updated_at": "2022-12-16T10:18:30.014Z",
      "deleted": false,
      "modifiable": true,
      "shifted": false,
      "tap": true,
      "hold": true,
      "doubleTap": true,
      "tapHold": true,
      "searchLabel": null,
      "tag": null,
      "glyph": null,
      "jsCode": "KeyQ",
      "url": null,
      "os": null,
      "geometry": null,
      "params": null,
      "models": null,
      "priority": null,
      "macro": true,
      "shape": null,
      "comboPickable": true,
      "comboTrigger": true,
      "modifiers": []
    }
  }

  const x = 20;
  const buttonArrayLeft = Array.from({ length: x }, (_, index) => {
    return <KeyButton key={index} keyData={fakeKey} />
  });
  const buttonArrayRight = Array.from({ length: x }, (_, index) => {
    return <KeyButton key={index} keyData={fakeKey} />
  });

  return (
    <div
      className="layer-panel"
      role="tabpanel"
      hidden={selectedLayerIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {selectedLayerIndex === index && (
        <Box sx={{ p: 3 }}>
          <div className="layer-actions">
            <div className="move-buttons">
              <IconButton
                color="default"
                onClick={handleMoveLayer}
                value="left"
                className="move-button"
              >
                <ArrowCircleLeftIcon sx={{ pointerEvents: "none" }} />
              </IconButton>
              <Typography>Move Layer</Typography>
              <IconButton
                color="default"
                onClick={handleMoveLayer}
                value="right"
                className="move-button"
              >
                <ArrowCircleRightIcon sx={{ pointerEvents: "none" }} />
              </IconButton>
            </div>
            <div className="label">
              <TextField
                id="layer-label"
                value={label}
                label="Layer Name"
                variant="standard"
                onChange={handleOnChange}
                disabled={!isEdit}
                required
                helperText={error ? "Label required." : " "}
                error={error}
              />
              {isEdit ? (
                <>
                  <IconButton color="primary" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="warning" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    className="edit-button"
                    color="default"
                    onClick={handleEdit}
                  >
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </div>
            <div className="delete-button">
              <DeleteLayerButton />
            </div>
          </div>

          <div className="full-keyboard">
            <div className="container">
              <img src="/keyboard-pcb.png" alt="Logo" />
              <div className="keyboard">
                <div className="grid-left">
                  {buttonArrayLeft}

                </div>
                <div className="grid-right">
                  {buttonArrayRight}

                </div>

              </div>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

LayerPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
};
