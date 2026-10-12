import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { KeyDialog } from "../key-dialog/key-dialog.component";
import { LayoutContext } from "../../providers/layout/layout.provider";
import { Height } from "@mui/icons-material";

export const KeyButton = (props) => {
  const { keyData } = props;
  const { index, tap, held, label } = keyData;
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedBindingIndex } = useContext(LayoutContext);

  const handleOpenDialog = () => {
    setSelectedBindingIndex(index);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedBindingIndex(null);
    setIsOpen(false);
  };

  const buttonStyles = () => {
    return {
      backgroundColor: isOpen ? "red" : "inherit",
      textTransform: "unset",
    };
  };

  const labelStyles = {
    display: "flex",
    flexDirection: "column",
  };

  const noneStyles = {
    display: "flex",
    flexDirection: "column",
    opacity: ".5",
  };

  const bold = {
    fontWeight: "bold",
  };
  const small = {
    fontSize: "10px",
    margin: "-4px",
  };

  const buttonModes = {
    display: "flex",
    flexDirection: "column",
  };

  const labelWithMods = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };

  const modStyles = {
    ...small,
    backgroundColor: "rgb(219, 183, 106)",
    borderRadius: "8px",
    padding: "0px 2px",
    marginLeft: "3px",
  };
  return (
    <>
      <button variant="outlined" onClick={handleOpenDialog}>
        <div style={labelStyles}>
          {label ? (
            <div style={bold}>{label}</div>
          ) : (
            <>
              {tap.label && (
                <div style={buttonModes}>
                  <div style={small}>Tap:</div>
                  <div style={bold}>
                    <div style={labelWithMods}>
                      {tap.label}
                      {tap?.modifiers?.length > 0 && (
                        <div style={modStyles}>{"mods"}</div>
                      )}
                    </div>
                    {tap?.layer?.label && (
                      <div style={small}>{tap.layer.label}</div>
                    )}
                  </div>
                </div>
              )}
              {held.label && (
                <div style={buttonModes}>
                  <div style={small}>Hold:</div>
                  <div style={bold}>
                    <div style={labelWithMods}>
                      {held.label}
                      {held?.modifiers.length > 0 && (
                        <div style={modStyles}>{"mods"}</div>
                      )}
                    </div>
                    {held?.layer?.label && (
                      <div style={small}>{held.layer.label}</div>
                    )}
                  </div>
                </div>
              )}
              {/* if neiter tap or held have values display none */}
              {!tap.label && !held.label && (
                <div style={buttonModes}>
                  <div style={noneStyles}>
                    <div style={bold}>
                      <div>None</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </button>
      <KeyDialog onClose={handleCloseDialog} isOpen={isOpen} />
    </>
  );
};
