import React, { useEffect, useRef } from "react";
import { load } from "./service";

export const Clippy = React.forwardRef(
  ({ name = "Clippy", onLoad = () => null, onClick = () => null }, ref) => {
    const clippy = useRef(null);

    if (!ref) {
      throw Error("Clippy component requires a ref");
    }

    useEffect(() => {
      const asyncTask = async () => {
        try {
          const agent = await load(name);
          clippy.current = agent;
          ref.current = agent;
          // console.log(typeof clippy.current);
          // clippyNode = document.getElementsByClassName("clippy")[0];
          // clippyNode.addEventListener(`click`, onClick);

          clippy.current._el[0].addEventListener(`click`, onClick);
          // ref.current.addEventListener(`click`, onClick);

          onLoad();
        } catch (err) {
          console.error(err);
        }
      };

      asyncTask();

      return () => {
        if (clippy.current) {
          console.log("lol");
          ref.current = null;
          clippy.current.hide();
          clippy.current._el[0].removeEventListener("click", onClick);
        }
      };
    }, []);

    return <></>;
  }
);

export default Clippy;
