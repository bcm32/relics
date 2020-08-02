import React from "react";
import ReactTooltip from "react-tooltip";

type RelicsButtonProps = {
  onClick: any;
  id?: string; // Must be provided for tooltip to work
  disabled?: any;
  tooltip?: any;
  compact?: boolean;
  className?: string;
}

export class RelicsButton extends React.Component<RelicsButtonProps> {

    render() {
        const { tooltip, id, children, disabled, onClick, compact } = this.props;
        let className = "relics-button";
        if(disabled) className += " relics-button--disabled";
        if(compact) className += " relics-button--compact";
        if(this.props.className) className += " " + this.props.className;

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
            <span { ...dataTipAttr} id={id} key={id} className={className} onClick={clickFunc}>
                {children}
                {tooltip &&
                    <ReactTooltip id={id} key={id} place="bottom" effect="solid">
                        {tooltip}
                    </ReactTooltip>
                }
            </span>
        )
    }
}
