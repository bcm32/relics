import React from "react";
import ReactTooltip from "react-tooltip";

type RelicsButtonProps = {
  onClick: any;
  id?: string; // Must be provided for tooltip to work
  disabled?: any;
  tooltip?: string
}

export class RelicsButton extends React.Component<RelicsButtonProps> {

    render() {
        const { tooltip, id, children, disabled, onClick } = this.props;
        console.log(tooltip);
        let className = "relics-button";
        if(disabled) className += " relics-button--disabled";
        const clickFunc = disabled ? () => {} : onClick;
        const dataTipAttr = {};
        if(tooltip)
        {
            // @ts-ignore
            dataTipAttr['data-tip'] = '';
            // @ts-ignore
            dataTipAttr['data-for'] = id;
        }
        return (
            <span { ...dataTipAttr} id={id} className={className} onClick={clickFunc}>
                {children}
                {tooltip &&
                    <ReactTooltip id={id} place="bottom" effect="solid">
                        {tooltip}
                    </ReactTooltip>
                }
            </span>
        )
    }
}
