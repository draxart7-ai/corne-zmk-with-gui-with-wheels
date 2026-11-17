import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { WheelDialog } from "../wheel-dialog/wheel-dialog.component";
import { LayoutContext } from "../../providers/layout/layout.provider";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { isEmpty } from "../../utilities/data-parsing";

export const WheelButton = (props) => {
    const { keyData } = props;
    console.log({ keyData });
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: isOpen ? "red" : "inherit",
            padding: "5px",
            textTransform: "unset",
            width: "100%",
        };
    };

    const labelStyles = {
        display: "flex",
        flexDirection: "column",
        marginBottom: "-5px",
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
    const action = {
        backgroundColor: "rgb(174, 177, 185)",
        width: "100%",
        fontSize: "12px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "2px",
    };
    const isUp = keyData.actions.up
    const isDown = keyData.actions.down
    const isLeft = keyData.actions.left
    const isRight = keyData.actions.right
    return (
        <>
            <Button sx={buttonStyles()} variant="outlined" onClick={handleOpenDialog}>
                <div className="wheel-button-label" style={labelStyles}>
                    {label ? label : "Wheel"}
                </div>
                {isUp && (
                    <div className="wheel-action" style={action}>
                        <ArrowDropUpIcon sx={{ pointerEvents: "none" }} />
                        {isEmpty(isUp.tap) ? "None" : isUp.label ? isUp.label : isUp.tap.label}
                    </div>
                )}
                {isDown && (
                    <div className="wheel-action" style={action}>
                        <ArrowDropDownIcon sx={{ pointerEvents: "none" }} />
                        {isEmpty(isDown.tap) ? "None" : isDown.label ? isDown.label : isDown.tap.label}
                    </div>
                )}
                {isLeft && (
                    <div className="wheel-action" style={action}>
                        <ArrowLeftIcon sx={{ pointerEvents: "none" }} />
                        {isEmpty(isLeft.tap) ? "None" : isLeft.label ? isLeft.label : isLeft.tap.label}
                    </div>
                )}
                {isRight && (
                    <div className="wheel-action" style={action}>
                        <ArrowRightIcon sx={{ pointerEvents: "none" }} />
                        {isEmpty(isRight.tap) ? "None" : isRight.label ? isRight.label : isRight.tap.label}
                    </div>
                )}
            </Button>
            <WheelDialog onClose={handleCloseDialog} isOpen={isOpen} />
        </>
    );
};

/*
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
                */