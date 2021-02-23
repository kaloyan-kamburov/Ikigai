import React, { useState, useEffect /*, useContext*/ } from "react";
// import { useHistory } from "react-router-dom";
import { intersection } from "underscore";
import * as d3 from "d3";
import * as venn from "@upsetjs/venn.js";

const MiniChart = ({ active, redraw }) => {
  // const history = useHistory();

  const reduceItems = (items) => {
    // console.log(items);
    // if (!items) {
    //   return history.push("/");
    // }
    return items.reduce((acc, item) => {
      acc.push(item.value);
      return acc;
    }, []);
  };

  const generateItemsForGroup = (group = ["A", "B", "C", "D"]) => {
    const items = [];

    const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));

    // if (
    //   !ikiSettings ||
    //   !ikiSettings ||
    //   !ikiSettings.step_A ||
    //   !ikiSettings.step_B ||
    //   !ikiSettings.step_C ||
    //   !ikiSettings.step_D
    // ) {
    //   return history.push("/");
    // }

    const allItems = {
      A: ikiSettings.step_A || [],
      B: ikiSettings.step_B || [],
      C: ikiSettings.step_C || [],
      D: ikiSettings.step_D || [],
    }; //location.state;
    group.forEach((g) => items.push(reduceItems(allItems[g])));

    return intersection(...items);
  };

  const removeDuplicates = (sets) => {
    // const ikiSettings = JSON.parse(localStorage.getItem("ikigai"));

    // if (
    //   !ikiSettings ||
    //   !ikiSettings ||
    //   !ikiSettings.step_A ||
    //   !ikiSettings.step_B ||
    //   !ikiSettings.step_C ||
    //   !ikiSettings.step_D
    // ) {
    //   return history.push("/");
    // }
    //TODO fix this dummy sorting pls
    let setsForSend = {
      ...sets.reduce((acc, set) => {
        acc[set.sets.join("")] = set;
        return acc;
      }, {}),
    };
    [
      "A",
      "B",
      "AB",
      "ABC",
      "ABD",
      "ACD",
      "AD",
      "B",
      "BC",
      "BCD",
      "C",
      "CD",
      "D",
    ].forEach((item) => {
      setsForSend[item].items = setsForSend[item].items.filter(
        (i) => !setsForSend["ABCD"].items.includes(i)
      );
    });

    //AB
    setsForSend["AB"].items = setsForSend["AB"].items.filter(
      (i) => !setsForSend["ABD"].items.includes(i)
    );

    setsForSend["AB"].items = setsForSend["AB"].items.filter(
      (i) => !setsForSend["ABC"].items.includes(i)
    );

    //AD
    setsForSend["AD"].items = setsForSend["AD"].items.filter(
      (i) => !setsForSend["ABD"].items.includes(i)
    );

    setsForSend["AD"].items = setsForSend["AD"].items.filter(
      (i) => !setsForSend["ACD"].items.includes(i)
    );

    //CD
    setsForSend["CD"].items = setsForSend["CD"].items.filter(
      (i) => !setsForSend["ACD"].items.includes(i)
    );

    setsForSend["CD"].items = setsForSend["CD"].items.filter(
      (i) => !setsForSend["BCD"].items.includes(i)
    );

    //BC
    setsForSend["BC"].items = setsForSend["BC"].items.filter(
      (i) => !setsForSend["BCD"].items.includes(i)
    );

    setsForSend["BC"].items = setsForSend["BC"].items.filter(
      (i) => !setsForSend["ABC"].items.includes(i)
    );

    //A
    setsForSend["A"].items = setsForSend["A"].items.filter(
      (i) => !setsForSend["ABD"].items.includes(i)
    );

    setsForSend["A"].items = setsForSend["A"].items.filter(
      (i) => !setsForSend["AD"].items.includes(i)
    );

    setsForSend["A"].items = setsForSend["A"].items.filter(
      (i) => !setsForSend["AB"].items.includes(i)
    );

    setsForSend["A"].items = setsForSend["A"].items.filter(
      (i) => !setsForSend["ACD"].items.includes(i)
    );
    setsForSend["A"].items = setsForSend["A"].items.filter(
      (i) => !setsForSend["ABC"].items.includes(i)
    );

    //B
    setsForSend["B"].items = setsForSend["B"].items.filter(
      (i) => !setsForSend["AB"].items.includes(i)
    );

    setsForSend["B"].items = setsForSend["B"].items.filter(
      (i) => !setsForSend["BC"].items.includes(i)
    );

    setsForSend["B"].items = setsForSend["B"].items.filter(
      (i) => !setsForSend["ABC"].items.includes(i)
    );

    setsForSend["B"].items = setsForSend["B"].items.filter(
      (i) => !setsForSend["ABD"].items.includes(i)
    );

    setsForSend["B"].items = setsForSend["B"].items.filter(
      (i) => !setsForSend["BCD"].items.includes(i)
    );

    //C
    setsForSend["C"].items = setsForSend["C"].items.filter(
      (i) => !setsForSend["BC"].items.includes(i)
    );

    setsForSend["C"].items = setsForSend["C"].items.filter(
      (i) => !setsForSend["CD"].items.includes(i)
    );

    setsForSend["C"].items = setsForSend["C"].items.filter(
      (i) => !setsForSend["BCD"].items.includes(i)
    );

    setsForSend["C"].items = setsForSend["C"].items.filter(
      (i) => !setsForSend["ACD"].items.includes(i)
    );

    setsForSend["C"].items = setsForSend["C"].items.filter(
      (i) => !setsForSend["ABC"].items.includes(i)
    );

    //D
    setsForSend["D"].items = setsForSend["D"].items.filter(
      (i) => !setsForSend["CD"].items.includes(i)
    );

    setsForSend["D"].items = setsForSend["D"].items.filter(
      (i) => !setsForSend["AD"].items.includes(i)
    );

    setsForSend["D"].items = setsForSend["D"].items.filter(
      (i) => !setsForSend["ACD"].items.includes(i)
    );

    setsForSend["D"].items = setsForSend["D"].items.filter(
      (i) => !setsForSend["ABD"].items.includes(i)
    );

    setsForSend["D"].items = setsForSend["D"].items.filter(
      (i) => !setsForSend["BCD"].items.includes(i)
    );

    return Object.keys(setsForSend).reduce((acc, setName) => {
      acc.push(setsForSend[setName]);
      return acc;
    }, []);
  };

  const defaultSets = () =>
    removeDuplicates([
      {
        sets: ["A", "B", "C", "D"],
        size: 300,
        label: "IKIGAI",
        desc: "IKIGAI",
        items: generateItemsForGroup(["A", "B", "C", "D"]),
        type: "ikigai",
        text: "Edit your ikigai",
        itemsParams: {
          x: 2,
          y: 2,
          width: 70,
          height: 68,
          big: 5,
          medium: 9,
          small: 12,
        },
      },
      {
        sets: ["D"],
        size: 1000,
        label: "What you are good at",
        desc:
          "<h6>WHAT YOU ARE GOOD AT</h6><p></p><strong>click to add</strong>",
        items: generateItemsForGroup(["D"]),
        type: "circle",
        text: "Edit what are you good at",
        rotate: "left",
        posLabelX: "50%",
        posLabelY: "0%",
        itemsParams: {
          x: -125,
          y: -150,
          width: 90,
          height: 300,
          big: 20,
          medium: 30,
          small: 40,
        },
      },
      {
        sets: ["B"],
        size: 1000,
        label: "What the world needs",
        desc: "WHAT THE WORLD NEEDS",
        items: generateItemsForGroup(["B"]),
        type: "circle",
        text: "Edit what the world needs",
        rotate: "right",
        posLabelX: "50%",
        posLabelY: "0%",
        itemsParams: {
          x: 35,
          y: -150,
          width: 90,
          height: 300,
          big: 20,
          medium: 30,
          small: 40,
        },
      },
      {
        sets: ["A"],
        size: 1000,
        label: "What you love",
        desc:
          "<h6>Things that you love doing</h6><div><p>What would you do if you didn’t have to worry about making money?</p><p>How would you spend your time on a long vacation or a free weekend?</p><p>What’s exciting to you and gets your juices flowing when you do it?</p><p>What could you enthusiastically talk about for hours on end?</p></div><div><p><span></span>Click to add</p></div>",
        items: generateItemsForGroup(["A"]),
        type: "circle",
        text: "Edit what you love",
        posLabelX: "50%",
        posLabelY: "0%",
        itemsParams: {
          x: -90,
          y: -100,
          width: 180,
          height: 54,
          big: 20,
          medium: 30,
          small: 40,
        },
      },
      {
        sets: ["C"],
        size: 1000,
        label: "What you can be paid for",
        desc: "WHAT CAN YOU BE PAID",
        items: generateItemsForGroup(["C"]),
        type: "circle",
        text: "Whan can you be paid for",
        posLabelX: "50%",
        posLabelY: "100%",
        itemsParams: {
          x: -90,
          y: 45,
          width: 180,
          height: 54,
          big: 20,
          medium: 30,
          small: 40,
        },
      },
      {
        sets: ["A", "B"],
        size: 300,
        // label: "AB",
        desc:
          "<h6>This is your mission</h6><div><p>The place where the things you love intersect what the world needs.</p></div><div><p><span></span>Click to view</p></div>",
        items: generateItemsForGroup(["A", "B"]),
        type: "intersection",
        text: "Edit your mission",
        itemsParams: {
          x: 80,
          y: -170,
          width: 80,
          height: 100,
          big: 15,
          medium: 25,
          small: 30,
        },
      },
      {
        sets: ["B", "C"],
        size: 300,
        // label: "BC",
        desc: "VOCATION",
        items: generateItemsForGroup(["B", "C"]),
        type: "intersection",
        text: "Edit your vocation",
        itemsParams: {
          x: 70,
          y: 70,
          width: 90,
          height: 80,
          big: 15,
          medium: 25,
          small: 30,
        },
      },
      {
        sets: ["C", "D"],
        size: 300,
        // label: "CD",
        desc: "PROFESSION",
        items: generateItemsForGroup(["C", "D"]),
        type: "intersection",
        text: "Edit your profession",
        itemsParams: {
          x: 14,
          y: -100,
          width: 80,
          height: 100,
          big: 15,
          medium: 25,
          small: 30,
        },
      },
      {
        sets: ["A", "D"],
        size: 300,
        // label: "AD",
        desc: "PASSION",
        items: generateItemsForGroup(["A", "D"]),
        type: "intersection",
        text: "Edit your passion",
        itemsParams: {
          x: 5,
          y: 5,
          width: 80,
          height: 100,
          big: 15,
          medium: 25,
          small: 30,
        },
      },
      {
        // label: "ABC",
        sets: ["A", "B", "C"],
        size: 300,
        desc:
          "<h6>Great but uneasy</h6><div><p>Things you do with excitement and complacency, but sense of uncertainty.</p></div><div><p><span></span>Click to add</p></div>",
        items: generateItemsForGroup(["A", "B", "C"]),
        type: "intersection",
        text: "Edit your things",
        itemsParams: {
          x: 79,
          y: 15,
          width: 36,
          height: 40,
          big: 2,
          medium: 5,
          small: 8,
        },
      },
      {
        // label: "ABD",
        sets: ["A", "B", "D"],
        size: 300,
        desc: "Some text",
        items: generateItemsForGroup(["A", "B", "D"]),
        type: "intersection",
        text: "Edit your things",
        itemsParams: {
          x: 10,
          y: -120,
          width: 60,
          height: 40,
          big: 2,
          medium: 5,
          small: 8,
        },
      },
      {
        // label: "ACD",
        sets: ["A", "C", "D"],
        size: 300,
        desc: "Some desc",
        items: generateItemsForGroup(["A", "C", "D"]),
        type: "intersection",
        text: "Edit your things",
        itemsParams: {
          x: 19,
          y: -20,
          width: 36,
          height: 40,
          big: 2,
          medium: 5,
          small: 8,
        },
      },
      {
        // label: "BCD",
        sets: ["B", "C", "D"],
        size: 300,
        desc: "Some desc",
        items: generateItemsForGroup(["B", "C", "D"]),
        type: "intersection",
        text: "Edit your things",
        itemsParams: {
          x: 10,
          y: 80,
          width: 50,
          height: 60,
          big: 2,
          medium: 5,
          small: 8,
        },
      },
    ]);

  const [sets, setSets] = useState(defaultSets() || []);

  const draw = () => {
    // draw venn diagram
    document.getElementById("ikigai").innerHTML = "";
    const nativeEl = document.getElementById("ikigai");
    nativeEl.innerHTML = "";
    const div = d3.select("#ikigai");
    div
      .datum(sets)
      .call(
        venn
          .VennDiagram()
          .useViewBox()
          .width(nativeEl.offsetWidth)
          .height(nativeEl.offsetHeight)
      );

    d3.selectAll("#ikigai .venn-circle path")
      .style("stroke", "black")
      .style("fill", "transparent");
    d3.selectAll(`#ikigai .venn-circle[data-venn-sets="${active}"] path`)
      .style("fill", "rgba(245,200,88)")
      .style("fill-opacity", "0.5");

    d3.selectAll("#ikigai .venn-circle")
      .select("text")
      .style("font-size", "12px")
      .style("fill", "#131415")
      .style("font-weight", "bold");
    d3.selectAll("#ikigai .venn-intersection")
      .select("text")
      .style("font-size", "1.4rem")
      .style("fill", "rgba(0, 0, 0, 1)")
      .style("font-weight", "bold");

    // const circles = d3.selectAll("#ikigai .venn-circle");
    // const intersections = d3.selectAll("#ikigai .venn-intersection");

    // circles.each(insertItems);
    // intersections.each(insertItems);

    //fix for mouse over
    // [].slice.call(document.getElementsByTagName("g")).forEach((g) => {
    //   g.dispatchEvent(new MouseEvent("mouseover", { bubbles: false }));
    //   g.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false }));
    // });
  };

  // const insertItems = function (d, i) {
  //   const path = d3.select(this);

  //   const svg = path.node().closest("svg");
  //   let defs = svg.querySelectorAll("defs");

  //   let items = "";
  //   let labelText = path.node().childNodes[1].childNodes[0];

  //   const boundingRect = path.node().getBoundingClientRect();
  //   const pathDimensions = path.node().children[0];

  //   if (d.posLabelX && d.posLabelY) {
  //     labelText.setAttribute("x", d.posLabelX);
  //     labelText.setAttribute("y", d.posLabelY);
  //   }

  //   if (d.rotate) {
  //     path
  //       .node()
  //       .childNodes[1].setAttribute(
  //         "style",
  //         `transform: rotate(${
  //           d.rotate === "left" ? "-" : ""
  //         }90deg); transform-origin: center; fill: #131415; font-size: 12px`
  //       );
  //   }

  //   if (d.items) {
  //     d.items.forEach((item) => {
  //       items += `<div class="item">${item}</div>`;
  //     });
  //   }

  //   path
  //     .append("foreignObject")
  //     .attr("x", pathDimensions.getPointAtLength(0).x)
  //     .attr("x", pathDimensions.getPointAtLength(0).x + d.itemsParams.x)
  //     .attr("y", pathDimensions.getPointAtLength(0).y + d.itemsParams.y)
  //     .attr("width", pathDimensions.width)
  //     .attr("height", pathDimensions.height)
  //     .attr(
  //       "class",
  //       `items-${
  //         d.items.length > d.itemsParams.big
  //           ? d.items.length > d.itemsParams.medium
  //             ? "small"
  //             : "medium"
  //           : "big"
  //       }`
  //     )
  //     .append("xhtml:div")
  //     .attr("class", d.items.length === 0 ? "items none" : "items")
  //     .attr(
  //       "style",
  //       `width: ${d.itemsParams.width}px; height: ${d.itemsParams.height}px;`
  //     )
  //     .html(items);
  // };

  const resetSets = () => {
    setSets(removeDuplicates(defaultSets()));
  };

  const handleResize = () => resetSets();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => draw(), [sets]);

  useEffect(() => {
    redraw && resetSets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redraw]);

  return (
    <div
      id="ikigai"
      className="chart-mini"
      style={{ height: "100%", maxHeight: "500px" }}
    ></div>
  );
};

export default MiniChart;
