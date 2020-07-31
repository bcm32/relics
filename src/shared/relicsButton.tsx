import React from "react";

type RelicsButtonProps = {
  onClick: any;
  disabled?: any;
}

export class RelicsButton extends React.Component<RelicsButtonProps> {

    render() {
        let className = "relics-button";
        if(this.props.disabled) className += " relics-button--disabled";
        const clickFunc = this.props.disabled ? () => {} : this.props.onClick;
        return (
            <span
                className={className}
                onClick={clickFunc}>
                {this.props.children}
            </span>
        )
    }
}