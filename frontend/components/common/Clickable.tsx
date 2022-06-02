import React, { LegacyRef, MouseEventHandler, ReactElement } from "react";

const Clickable = React.forwardRef(
  (
    props: {
      className?: string;
      onClick?: MouseEventHandler<any>;
      children: ReactElement | ReactElement[];
      type?: "button";
      hoverDisabled?: boolean;
    },
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <div
        onClick={props.onClick}
        className={`
        ${props.className}
        flex flex-row rounded-md cursor-default outline outline-0 outline-transparent items-center px-2 py-1 border border-transparent transition-clickable h-8
        hover:bg-blue-400/10 hover:outline-1 hover:outline-blue-400/30 active:bg-blue-400/20
        dark:hover:bg-pink-400/10 dark:hover:outline-pink-400/30 dark:active:bg-pink-400/20
      `}
      >
        {props.children}
      </div>
    );
  }
);

Clickable.displayName = "Clickable";
export default Clickable;
