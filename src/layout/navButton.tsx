import React from "react";

type NavButtonProps = {
  onClick: any;
  disabled?: any | undefined;
  selected?: boolean | undefined;
}

export class NavButton extends React.Component<NavButtonProps> {

    render() {
        let className = "nav-button";
        if(this.props.disabled) className += " nav-button--disabled";
        if(this.props.selected) className += " nav-button--selected";

        const clickFunc = this.props.disabled ? () => {} : this.props.onClick;
        return (
            <div
                className={className}
                onClick={clickFunc}>
                {this.props.children}
            </div>
        )
    }
}
