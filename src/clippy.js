import React, { useEffect, useRef } from "react";
import { load } from "./service";

export const Clippy = React.forwardRef(
  ({ name = "Clippy", onLoad = () => null, onClick = () => null }, ref) => {
    const clippy = useRef(null);

    if (!ref) {
      throw Error("Clippy component requires a ref");
    }

    useEffect(() => {
      let clippyNode;
      const asyncTask = async () => {
        try {
          const agent = await load(name);
          console.log("lol");
          console.log(onClick);
          clippy.current = agent;
          ref.current = agent;
          clippyNode = document.getElementsByClassName("clippy")[0];
          clippyNode.addEventListener(`click`, onClick);

          onLoad();
        } catch (err) {
          console.error(err);
        }
      };

      asyncTask();

      return () => {
        if (clippy.current) {
          ref.current = null;
          clippy.current.hide();
          clippyNode.removeEventListener("click");
        }
      };
    }, []);

    return <></>;
  }
);

export default Clippy;
