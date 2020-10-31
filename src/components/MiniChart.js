import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { intersection } from "underscore";
import * as d3 from "d3";
import * as venn from "@upsetjs/venn.js";

const MiniChart = ({ active }) => {
  const history = useHistory();

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
        // label: "IKIGAI",
        desc: "IKIGAI",
        items: generateItemsForGroup(["A", "B", "C", "D"]),
        type: "ikigai",
        text: "Edit your ikigai",
        itemsParams: {
          x: 0,
          y: 0,
          width: 120,
          height: 130,
          big: 5,
          medium: 9,
          small: 12,
        },
      },
      {
        sets: ["D"],
        size: 1000,
        label: " ",
        desc:
          "<h6>WHAT YOU ARE GOOD AT</h6><p></p><strong>click to add</strong>",
        items: generateItemsForGroup(["D"]),
        type: "circle",
        text: "Edit what are you good at",
        rotate: "left",
        posLabelX: "50%",
        posLabelY: "0%",
        itemsParams: {
          x: 0,
          y: 0,
          width: 170,
          height: 500,
          big: 20,
          medium: 30,
          small: 40,
        },
      },
      {
        sets: ["B"],
        size: 1000,
        label: " ",
        desc: "WHAT THE WORLD NEEDS",
        items: generateItemsForGroup(["B"]),
        type: "circle",
        text: "Edit what the world needs",
        rotate: "right",
        posLabelX: "50%",
        posLabelY: "0%",
        itemsParams: {
          x: 0,
          y: 0,
          width: 170,
          height: 500,
          big: 20,
          medium: 30,
          small: 40,
        },
      },
      {
        sets: ["A"],
        size: 1000,
        label: " ",
        desc:
          "<h6>Things that you love doing</h6><div><p>What would you do if you didn’t have to worry about making money?</p><p>How would you spend your time on a long vacation or a free weekend?</p><p>What’s exciting to you and gets your juices flowing when you do it?</p><p>What could you enthusiastically talk about for hours on end?</p></div><div><p><span></span>Click to add</p></div>",
        items: generateItemsForGroup(["A"]),
        type: "circle",
        text: "Edit what you love",
        posLabelX: "50%",
        posLabelY: 1,
        itemsParams: {
          x: 0,
          y: 0,
          width: 220,
          height: 160,
          big: 20,
          medium: 30,
          small: 40,
        },
      },
      {
        sets: ["C"],
        size: 1000,
        label: " ",
        desc: "WHAT CAN YOU BE PAID",
        items: generateItemsForGroup(["C"]),
        type: "circle",
        text: "Whan can you be paid for",
        posLabelX: "50%",
        posLabelY: "100%",
        itemsParams: {
          x: 0,
          y: 0,
          width: 230,
          height: 140,
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
          x: 0,
          y: 0,
          width: 160,
          height: 160,
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
          x: 0,
          y: 0,
          width: 160,
          height: 160,
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
          x: 0,
          y: 0,
          width: 160,
          height: 160,
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
          x: 0,
          y: 0,
          width: 160,
          height: 160,
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
          x: 0,
          y: 0,
          width: 100,
          height: 100,
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
          x: 0,
          y: 0,
          width: 90,
          height: 90,
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
          x: 0,
          y: 0,
          width: 100,
          height: 100,
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
          x: 0,
          y: 0,
          width: 90,
          height: 90,
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
    div.datum(sets).call(
      venn
        .VennDiagram()
        .useViewBox()
        // .width(window.innerWidth)
        // .height(
        //   window.innerHeight - document.querySelector("header").clientHeight
        // )
        .width(nativeEl.offsetWidth)
        .height(nativeEl.offsetHeight)
    );

    d3.selectAll("#ikigai .venn-circle path")
      .style("stroke", "black")
      .style("fill", "rgba(0,0,0,0)");
    d3.selectAll(`#ikigai .venn-circle[data-venn-sets="${active}"] path`).style(
      "fill",
      "red"
    );

    d3.selectAll("#ikigai .venn-circle")
      .select("text")
      .style("font-size", "1rem")
      .style("fill", "rgba(128, 128, 0, 1)");
    d3.selectAll("#ikigai .venn-intersection")
      .select("text")
      .style("font-size", "1.4rem")
      .style("fill", "rgba(255, 255, 255, 1)");

    const circles = d3.selectAll("#ikigai .venn-circle");
    const intersections = d3.selectAll("#ikigai .venn-intersection");

    circles.each(insertItems);
    intersections.each(insertItems);

    //fix for mouse over
    [].slice.call(document.getElementsByTagName("g")).forEach((g) => {
      g.dispatchEvent(new MouseEvent("mouseover", { bubbles: false }));
      g.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false }));
    });
  };

  const insertItems = function (d, i) {
    // if (d.label === "gucci") {
    const path = d3.select(this);
    // const text = path.node().childNodes[1]
    // console.log(path.node().childNodes[1]);

    const svg = path.node().closest("svg");
    let defs = svg.querySelectorAll("defs");

    let items = "";
    let labelText = path.node().childNodes[1].childNodes[0];

    // const pathDimensions = path.node().getBoundingClientRect();
    const pathDimensions = path.node().children[0].getBoundingClientRect();
    console.log(pathDimensions);
    if (d.posLabelX && d.posLabelY) {
      labelText.setAttribute("x", d.posLabelX);
      labelText.setAttribute("y", d.posLabelY);
    }
    if (d.rotate) {
      path
        .node()
        .childNodes[1].setAttribute(
          "style",
          `transform: rotate(${
            d.rotate === "left" ? "-" : ""
          }90deg); transform-origin: center; fill: rgb(128, 128, 0); font-size: 1rem`
        );
    }

    if (d.items) {
      d.items.forEach((item) => {
        items += `<div class="item">${item}</div>`;
      });
    }

    // console.log(path.node());

    path
      .append("foreignObject")
      .attr(
        "x",
        pathDimensions.x
        // window.innerWidth < 832
        //   ? pathDimensions.x +
        //       pathDimensions.width / 2 +
        //       d.itemsParams.x +
        //       (832 - window.innerWidth) / 2
        //   : pathDimensions.x + pathDimensions.width / 2 + d.itemsParams.x
      )
      .attr("y", pathDimensions.y)
      // .attr(
      //   "style",
      //   `width: ${d.itemsParams.width}px; height: ${d.itemsParams.height}px;`
      // )
      .attr("width", pathDimensions.width)
      .attr("height", pathDimensions.height)
      .attr(
        "class",
        `items-${
          d.items.length > d.itemsParams.big
            ? d.items.length > d.itemsParams.medium
              ? "small"
              : "medium"
            : "big"
        }`
      )
      .append("xhtml:div")
      .attr("class", "items")
      .html(items);

    // if (d.shape) {
    //   //append image
    //   let image = path.append("image").attr("href", d.shape.img);
    //   if (d.shape.scaleby !== "both") {
    //     image.attr(d.shape.scaleby, pathDimensions[d.shape.scaleby]);
    //   } else {
    //     image.attr("width", pathDimensions.width + d.shape.width);
    //     image.attr("height", pathDimensions.height + d.shape.height);
    //   }

    //   image.attr("x", pathDimensions.x + d.shape.x);
    //   image.attr("y", pathDimensions.y + d.shape.y);
    //   // .attr("width", pathDimensions.width)
    //   // .attr("height", pathDimensions.height)
    //   // .attr("x", pathDimensions.x + d.shape.x)
    //   // .attr("y", pathDimensions.y + d.shape.y);
    // }
  };

  useEffect(() => draw(), [sets]);

  return (
    <div id="ikigai" className="chart-mini" style={{ height: "100%" }}></div>
  );
};

export default MiniChart;
