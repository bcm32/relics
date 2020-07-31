import React from "react";
import {RelicsButton} from "./relicsButton";
import ReactTooltip from "react-tooltip";

type AssignWorkerOptionProps = {
    id?:string,
    tooltip?: string,
    assignWorkers: any,
    removeWorkers: any,
    currentlyAssigned: number,
    availableWorkers: number,
}

export class AssignWorkerOptions extends React.Component<AssignWorkerOptionProps>{
    render() {
        const {
            id,
            tooltip,
            children,
            assignWorkers,
            removeWorkers,
            currentlyAssigned,
            availableWorkers,
        } = this.props;

        const dataTipAttr = {};
        if(tooltip)
        {
            // @ts-ignore
            dataTipAttr['data-tip'] = '';
            // @ts-ignore
            dataTipAttr['data-for'] = id;
        }
        return (
            <span { ...dataTipAttr} id={id} >
                {children}: {currentlyAssigned || 0}
                <span>
                    <RelicsButton
                        compact={true}
                        disabled={currentlyAssigned <= 0}
                        onClick={() => removeWorkers(1)}
                    >
                        -
                    </RelicsButton>
                    <RelicsButton
                        compact={true}
                        disabled={availableWorkers <= 0}
                        onClick={() => assignWorkers(1)}>
                        +
                    </RelicsButton>
                    <RelicsButton
                        compact={true}
                        disabled={availableWorkers <= 0}
                        onClick={() => assignWorkers(availableWorkers)}>
                        <u>+</u>
                    </RelicsButton>
                </span>
                {tooltip &&
                    <ReactTooltip id={id} place="bottom" effect="solid">
                        {tooltip}
                    </ReactTooltip>
                }
            </span>
        );
    }
}
