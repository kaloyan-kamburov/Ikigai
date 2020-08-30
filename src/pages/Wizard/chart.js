/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import * as venn from "@upsetjs/venn.js";
import { intersection } from "underscore";

import ItemsModal from "./itemsModal";

const IkigaiChart = () => {
  const [groupForEdit, setGroupForEdit] = useState({ items: [], sets: [] });
  const reduceItems = (items) =>
    items.reduce((acc, item) => {
      acc.push(item.value);
      return acc;
    }, []);

  const generateItemsForGroup = (group = ["A", "B", "C", "D"]) => {
    const items = [];
    const allItems = {
      A: JSON.parse(sessionStorage.getItem("step_A")),
      B: JSON.parse(sessionStorage.getItem("step_B")),
      C: JSON.parse(sessionStorage.getItem("step_C")),
      D: JSON.parse(sessionStorage.getItem("step_D")),
    }; //location.state;
    group.forEach((g) => items.push(reduceItems(allItems[g])));

    return intersection(...items);
  };

  const defaultSets = [
    {
      sets: ["A", "B", "C", "D"],
      size: 300,
      label: "IKIGAI",
      desc: "IKIGAI",
      items: generateItemsForGroup(["A", "B", "C", "D"]),
    },
    {
      sets: ["D"],
      size: 1000,
      label: "WHAT YOU ARE GOOD AT",
      desc: "WHAT YOU ARE GOOD AT",
      items: generateItemsForGroup(["D"]),
    },
    {
      sets: ["B"],
      size: 1000,
      label: "WHAT THE WORLD NEEDS",
      desc: "WHAT THE WORLD NEEDS",
      items: generateItemsForGroup(["B"]),
    },
    {
      sets: ["A"],
      size: 1000,
      label: "WHAT YOU LOVE",
      desc: "WHAT YOU LOVE",
      items: generateItemsForGroup(["A"]),
    },
    {
      sets: ["C"],
      size: 1000,
      label: "WHAT CAN YOU BE PAID FOR",
      desc: "WHAT CAN YOU BE PAID FOR",
      items: generateItemsForGroup(["C"]),
    },
    {
      sets: ["A", "B"],
      size: 300,
      label: "MISSION",
      desc: "MISSION",
      items: generateItemsForGroup(["A", "B"]),
    },
    {
      sets: ["B", "C"],
      size: 300,
      label: "VOCATION",
      desc: "VOCATION",
      items: generateItemsForGroup(["B", "C"]),
    },
    {
      sets: ["C", "D"],
      size: 300,
      label: "PROFESSION",
      desc: "PROFESSION",
      items: generateItemsForGroup(["C", "D"]),
    },
    {
      sets: ["A", "D"],
      size: 300,
      label: "PASSION",
      desc: "PASSION",
      items: generateItemsForGroup(["A", "D"]),
    },
    {
      label: ".",
      sets: ["A", "B", "C"],
      size: 300,
      desc:
        "LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE",
      items: generateItemsForGroup(["A", "B", "C"]),
    },
    {
      label: ".",
      sets: ["A", "B", "D"],
      size: 300,
      desc:
        "LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE",
      items: generateItemsForGroup(["A", "B", "D"]),
    },
    {
      label: ".",
      sets: ["A", "C", "D"],
      size: 300,
      desc:
        "LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE",
      items: generateItemsForGroup(["A", "C", "D"]),
    },
    {
      label: ".",
      sets: ["B", "C", "D"],
      size: 300,
      desc:
        "LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE",
      items: generateItemsForGroup(["B", "C", "D"]),
    },
  ];

  const [sets, setSets] = useState(defaultSets);

  const draw = () => {
    // draw venn diagram
    const div = d3.select("#ikigai");
    div
      .datum(sets)
      .call(
        venn
          .VennDiagram()
          .useViewBox()
          .width(window.innerWidth)
          .height(window.innerHeight)
      );

    d3.selectAll("#ikigai .venn-circle path")
      .style("stroke", "white")
      .style("fill", "rgba(0,0,0,0)")
      .style("cursor", "pointer");
    d3.selectAll("#ikigai .venn-circle")
      .select("text")
      .style("font-size", "1rem")
      .style("fill", "rgba(128, 128, 0, 1)");
    d3.selectAll("#ikigai .venn-intersection")
      .style("cursor", "pointer")
      .select("text")
      .style("font-size", "1.4rem")
      .style("fill", "rgba(255, 255, 255, 1)");

    // add a tooltip
    let tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "ikigai-tooltip")
      .attr("id", "ikigai-tooltip");

    // add listeners to all the groups to display tooltip on mouseover
    div
      .selectAll("g")
      .on("mouseover", function (d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", 1);
        tooltip.text(d.desc || null);

        // highlight the current path
        let selection = d3.select(this).transition("tooltip").duration(400);

        selection
          .select("path")
          .style("stroke-width", 3)
          .style("fill", "rgba(128, 128, 0, 0.6)")
          .style("fill-opacity", 1)
          // .style("fill-opacity", d.sets.length == 1 ? 0.4 : 0.1)
          .style("stroke-opacity", 1);
      })

      .on("mousemove", function () {
        tooltip
          .style("left", d3.event.pageX + 20 - window.scrollX + "px")
          .style("top", d3.event.pageY + 30 - window.scrollY + "px");
      })

      .on("mouseout", function (d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection
          .select("path")
          .style("stroke-width", 0)
          .style("fill-opacity", 0);
        // // .style("fill-opacity", d.sets.length == 1 ? 0.25 : 0.0)
        // // .style("stroke-opacity", 0);
      })

      .on("click", function (d, i) {
        setGroupForEdit(d);
      });

    // const insertClipPath = function (d, i) {
    //   const path = d3.select(this).node().childNodes[0];
    //   const g = path.parentElement;

    //   // const clipPath = document.createElementNS(
    //   //   "http://www.w3.org/2000/svg",
    //   //   "clipPath"
    //   // );
    //   // clipPath.id = `cp${path.parentElement
    //   //   .getAttribute("data-venn-sets")
    //   //   .split("_")
    //   //   .join("")}`;
    //   // const innerPath = document.createElement("path");
    //   // innerPath.id = `pathFor-${path.parentElement.getAttribute(
    //   //   "data-venn-sets"
    //   // )}`;
    //   // innerPath.setAttribute("d", path.getAttribute("d"));
    //   // bigClipPath.appendChild(innerPath);
    //   // clipPath.appendChild(innerPath);

    //   // svg.node().firstChild.appendChild(clipPath);

    //   g.setAttribute("clip-path", `url(#test)`);

    //   // svg.node().childNodes();
    // };

    const insertItems = function (d, i) {
      // if (d.label === "gucci") {
      const path = d3.select(this);
      // const text = path.node().childNodes[1]
      // console.log(path.node().childNodes[1]);

      let items = "";

      const pathDimensions = path.node().childNodes[1].getBoundingClientRect();

      if (d.items) {
        d.items.forEach((item) => {
          items += `<div class="item">${item}</div>`;
        });
      }

      path
        .append("foreignObject")
        .attr(
          "x",
          `${Math.round(
            pathDimensions.left + window.scrollX + pathDimensions.width / 2
          )}`
        ) //- 300)
        .attr(
          "y",
          `${Math.round(
            pathDimensions.top + window.scrollY + pathDimensions.height / 2
          )}`
        ) // - 300)
        // .attr("height", `${Math.round(pathDimensions.height)}`)
        // .attr("width", `${Math.round(pathDimensions.width)}`)
        .attr("style", `max-width: ${Math.round(pathDimensions.width)}px;`)
        .attr("class", "items-wrapper")
        .append("xhtml:div")
        .attr("class", "items")
        // .attr(
        //   "style",
        //   `width: ${Math.round(pathDimensions.width)}px; height:${Math.round(
        //     pathDimensions.height
        //   )}px`
        // )
        .append("xhtml:div")
        .attr("class", "inner-wrapper")
        .style("color", "#fff")
        .html(items);
      // }
    };

    const circles = d3.selectAll("#ikigai .venn-circle");
    const intersections = d3.selectAll("#ikigai .venn-intersection");

    circles.each(insertItems);
    intersections.each(insertItems);

    // setTimeout(() => {
    //   document.getElementById("mask").remove();
    // }, 1500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    resetSets();
    // delete tooltip
    return () => document.getElementById("ikigai-tooltip").remove();
  }, []);

  useEffect(() => draw(), [sets]);

  const resetSets = () =>
    setSets([
      {
        sets: ["A", "B", "C", "D"],
        size: 300,
        label: "IKIGAI",
        desc: "IKIGAI",
        items: generateItemsForGroup(["A", "B", "C", "D"]),
      },
      {
        sets: ["D"],
        size: 1000,
        label: "WHAT YOU ARE GOOD AT",
        desc: "WHAT YOU ARE GOOD AT",
        items: generateItemsForGroup(["D"]),
      },
      {
        sets: ["B"],
        size: 1000,
        label: "WHAT THE WORLD NEEDS",
        desc: "WHAT THE WORLD NEEDS",
        items: generateItemsForGroup(["B"]),
      },
      {
        sets: ["A"],
        size: 1000,
        label: "WHAT YOU LOVE",
        desc: "WHAT YOU LOVE",
        items: generateItemsForGroup(["A"]),
      },
      {
        sets: ["C"],
        size: 1000,
        label: "WHAT CAN YOU BE PAID FOR",
        desc: "WHAT CAN YOU BE PAID FOR",
        items: generateItemsForGroup(["C"]),
      },
      {
        sets: ["A", "B"],
        size: 300,
        label: "MISSION",
        desc: "MISSION",
        items: generateItemsForGroup(["A", "B"]),
      },
      {
        sets: ["B", "C"],
        size: 300,
        label: "VOCATION",
        desc: "VOCATION",
        items: generateItemsForGroup(["B", "C"]),
      },
      {
        sets: ["C", "D"],
        size: 300,
        label: "PROFESSION",
        desc: "PROFESSION",
        items: generateItemsForGroup(["C", "D"]),
      },
      {
        sets: ["A", "D"],
        size: 300,
        label: "PASSION",
        desc: "PASSION",
        items: generateItemsForGroup(["A", "D"]),
      },
      {
        sets: ["A", "B", "C"],
        size: 300,
        desc:
          "LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE",
        items: generateItemsForGroup(["A", "B", "C"]),
      },
      {
        sets: ["A", "B", "D"],
        size: 300,
        desc:
          "LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE",
        items: generateItemsForGroup(["A", "B", "D"]),
      },
      {
        sets: ["A", "C", "D"],
        size: 300,
        desc:
          "LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE",
        items: generateItemsForGroup(["A", "C", "D"]),
      },
      {
        sets: ["B", "C", "D"],
        size: 300,
        desc:
          "LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE LOREM IPSUM IS A PLACEHOLDER TEXT COMMONLY USED TO DEMONSTRATE",
        items: generateItemsForGroup(["B", "C", "D"]),
      },
    ]);

  const updateItems = (items, setsForUpdate) => {
    document.getElementById("ikigai").innerHTML = null;
    setsForUpdate.forEach((setName) => {
      const itemsGroup = JSON.parse(sessionStorage.getItem(`step_${setName}`));
      items.forEach((item) => {
        if (itemsGroup.indexOf(item) > -1) {
          itemsGroup.push(item);
        }
      });
      sessionStorage.setItem(`step_${setName}`, JSON.stringify(itemsGroup));
    });
    resetSets();
  };

  return (
    <>
      <div className="outer-wrapper">
        <div id="mask" className="mask"></div>
        <div
          className="chart-wrapper"
          id="ikigai"
          style={{ textAlign: "center" }}
        ></div>
      </div>
      <ItemsModal
        closeFn={() => setGroupForEdit({ items: [], sets: [] })}
        hidden={groupForEdit.sets.length === 0}
        group={groupForEdit}
        updateItems={updateItems}
      />
    </>
  );
};

export default IkigaiChart;
