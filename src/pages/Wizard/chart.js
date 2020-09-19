/* eslint-disable react-hooks/exhaustive-deps */
/* 
step_B: [{"label":"Skateboarding","value":"Skateboarding"},{"label":"Skateboarding","value":"Skateboarding"},{"label":"Jump","value":"Jump","__isNew__":true},{"label":"Drawing","value":"Drawing"},{"label":"Travelling","value":"Travelling"},{"label":"Something","value":"Something","__isNew__":true},{"label":"Bla","value":"Bla","__isNew__":true}]
step_D: [{"label":"Skateboarding","value":"Skateboarding"},{"label":"Design","value":"Design"},{"label":"Drawing","value":"Drawing"},{"label":"Travelling","value":"Travelling"},{"label":"Jump","value":"Jump","__isNew__":true},{"label":"Flash","value":"Flash","__isNew__":true},{"label":"Bla","value":"Bla","__isNew__":true}]
step_A: [{"label":"Skateboarding","value":"Skateboarding"},{"label":"Flash","value":"Flash"},{"label":"Design","value":"Design"},{"label":"Hiking","value":"Hiking","__isNew__":true},{"label":"Travelling","value":"Travelling"},{"label":"Jump","value":"Jump","__isNew__":true}]
step_C: [{"label":"Skateboarding","value":"Skateboarding"},{"label":"Travelling","value":"Travelling"},{"label":"Jump","value":"Jump","__isNew__":true},{"label":"Flash","value":"Flash","__isNew__":true},{"label":"Hiking","value":"Hiking","__isNew__":true}]
*/
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import * as venn from "@upsetjs/venn.js";
import { intersection, difference, uniq, union, without } from "underscore";
import { MapInteractionCSS } from "react-map-interaction";

import ItemsModal from "./itemsModal";
import { useHistory } from "react-router-dom";
import Select from "../../components/form/Select";
import { Form } from "react-final-form";

const ItemsEdit = ({ sets, items = [], onClose, posX, posY, saveFn }) => {
  const handleSubmit = (values, initialValues) => {
    document.getElementById("ikigai").innerHTML = null;

    sets.forEach((setName) => {
      const itemsGroup = JSON.parse(
        sessionStorage.getItem(`step_${setName}`)
      ).reduce((acc, item) => {
        acc.push(item.label);
        return acc;
      }, []);

      const itemsOptions =
        values.options && values.options.length > 0
          ? values.options.reduce((acc, item) => {
              acc.push(item.label);
              return acc;
            }, [])
          : [];

      const removedValues = difference(
        initialValues.reduce((acc, item) => {
          acc.push(item.label);
          return acc;
        }, []),
        itemsOptions
      );

      console.log(removedValues);

      const newArr = uniq(
        uniq([
          ...itemsOptions,
          ...without(
            itemsGroup,
            ...removedValues
            // intersection(itemsGroup, itemsOptions)
          ),
        ]).reduce((acc, item) => {
          acc.push({ label: item, value: item });
          return acc;
        }, [])
      );

      console.log(newArr);

      sessionStorage.setItem(`step_${setName}`, JSON.stringify(newArr));
    });
    saveFn();
  };
  return (
    <div
      className="items-popup"
      style={{
        left: posX + "px",
        top: posY + "px",
      }}
    >
      <Form
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.options || values.options.length < 3) {
        //     errors.options = "Required";
        //   }
        //   return errors;
        // }}
        onSubmit={(values) =>
          handleSubmit(
            values,
            items.map((item) => ({ label: item, value: item }))
          )
        }
        initialValues={{
          options: items.map((item) => ({ label: item, value: item })),
        }}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Select
                name="options"
                isMulti
                value={props.initialValues.options}
                autoFocus
              />
              <button type="submit">save</button>
            </form>
          );
        }}
      </Form>
      <span onClick={onClose}>close</span>
    </div>
  );
};

const IkigaiChart = () => {
  const history = useHistory();
  const [groupForEdit, setGroupForEdit] = useState({ items: [], sets: [] });
  const [zoomMode, setZoomMode] = useState(false);
  const defaultZoomValue = {
    scale: 1,
    translation: { x: 0, y: 0 },
  };
  const [zoomValue, setZoomValue] = useState(defaultZoomValue);

  const [itemsForEdit, setItemsForEdit] = useState(null);

  const reduceItems = (items) => {
    if (
      !JSON.parse(sessionStorage.getItem("step_A")) ||
      !JSON.parse(sessionStorage.getItem("step_B")) ||
      !JSON.parse(sessionStorage.getItem("step_C")) ||
      !JSON.parse(sessionStorage.getItem("step_D"))
    ) {
      return history.push("/");
    }
    return items.reduce((acc, item) => {
      acc.push(item.value);
      return acc;
    }, []);
  };

  const generateItemsForGroup = (group = ["A", "B", "C", "D"]) => {
    const items = [];
    const allItems = {
      A: JSON.parse(sessionStorage.getItem("step_A")),
      B: JSON.parse(sessionStorage.getItem("step_B")),
      C: JSON.parse(sessionStorage.getItem("step_C")),
      D: JSON.parse(sessionStorage.getItem("step_D")),
    }; //location.state;
    group.forEach((g) => items.push(reduceItems(allItems[g])));

    // if (group.length === 4) {
    //   return intersection(...items);
    // }
    return intersection(...items);
  };

  const removeDuplicates = (sets) => {
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

    /////
    // setsForSend["ABD"].items = setsForSend["ABD"].items.filter(
    //   (i) =>
    //     setsForSend["A"].items.includes(i) &&
    //     setsForSend["B"].items.includes(i) &&
    //     setsForSend["D"].items.includes(i)
    // );

    // setsForSend["ABC"].items = setsForSend["ABC"].items.filter(
    //   (i) =>
    //     setsForSend["A"].items.includes(i) &&
    //     setsForSend["B"].items.includes(i) &&
    //     setsForSend["C"].items.includes(i)
    // );

    // setsForSend["BCD"].items = setsForSend["BCD"].items.filter(
    //   (i) =>
    //     setsForSend["B"].items.includes(i) &&
    //     setsForSend["C"].items.includes(i) &&
    //     setsForSend["D"].items.includes(i)
    // );

    // setsForSend["ACD"].items = setsForSend["ACD"].items.filter(
    //   (i) =>
    //     setsForSend["A"].items.includes(i) &&
    //     setsForSend["C"].items.includes(i) &&
    //     setsForSend["D"].items.includes(i)
    // );
    ///////

    //////
    // setsForSend["AD"].items = setsForSend["AD"].items.filter(
    //   (i) => !setsForSend["CD"].items.includes(i)
    // );

    // setsForSend["C"].items = setsForSend["C"].items.filter(
    //   (i) =>
    //     setsForSend["A"].items.includes(i) &&
    //     setsForSend["B"].items.includes(i) &&
    //     setsForSend["D"].items.includes(i)
    // );

    // setsForSend["B"].items = setsForSend["B"].items.filter(
    //   (i) =>
    //     setsForSend["A"].items.includes(i) &&
    //     setsForSend["C"].items.includes(i) &&
    //     setsForSend["D"].items.includes(i)
    // );

    // setsForSend["A"].items = setsForSend["A"].items.filter(
    //   (i) =>
    //     setsForSend["B"].items.includes(i) &&
    //     setsForSend["C"].items.includes(i) &&
    //     setsForSend["D"].items.includes(i)
    // );

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
        itemsParams: {
          x: -60,
          y: 400,
          width: 120,
          height: 130,
        },
      },
      {
        sets: ["D"],
        size: 1000,
        label: "D WHAT YOU ARE GOOD AT",
        desc: "WHAT YOU ARE GOOD AT",
        items: generateItemsForGroup(["D"]),
        type: "circle",
        rotate: "left",
        posLabelX: "50%",
        posLabelY: "5%",
        itemsParams: {
          x: -190,
          y: 290,
          width: 100,
          height: 344,
        },
      },
      {
        sets: ["B"],
        size: 1000,
        label: "B WHAT THE WORLD NEEDS",
        desc: "WHAT THE WORLD NEEDS",
        items: generateItemsForGroup(["B"]),
        type: "circle",
        rotate: "right",
        posLabelX: "50%",
        posLabelY: "5%",
        itemsParams: {
          x: 90,
          y: 290,
          width: 100,
          height: 344,
        },
      },
      {
        sets: ["A"],
        size: 1000,
        label: "A WHAT YOU LOVE",
        desc: "WHAT YOU LOVE",
        items: generateItemsForGroup(["A"]),
        type: "circle",
        posLabelX: "50%",
        posLabelY: 35,
        itemsParams: {
          x: -100,
          y: 45,
          width: 220,
          height: 160,
        },
      },
      {
        sets: ["C"],
        size: 1000,
        label: "C WHAT CAN YOU BE PAID FOR",
        desc: "WHAT CAN YOU BE PAID FOR",
        items: generateItemsForGroup(["C"]),
        type: "circle",
        posLabelX: "50%",
        posLabelY: "95%",
        itemsParams: {
          x: -120,
          y: 730,
          width: 230,
          height: 140,
        },
      },
      {
        sets: ["A", "B"],
        size: 300,
        // label: "AB",
        desc: "MISSION",
        items: generateItemsForGroup(["A", "B"]),
        type: "intersection",
        itemsParams: {
          x: -20,
          y: 230,
          width: 160,
          height: 160,
        },
      },
      {
        sets: ["B", "C"],
        size: 300,
        // label: "BC",
        desc: "VOCATION",
        items: generateItemsForGroup(["B", "C"]),
        type: "intersection",
        itemsParams: {
          x: -20,
          y: 540,
          width: 160,
          height: 160,
        },
      },
      {
        sets: ["C", "D"],
        size: 300,
        // label: "CD",
        desc: "PROFESSION",
        items: generateItemsForGroup(["C", "D"]),
        type: "intersection",
        itemsParams: {
          x: -140,
          y: 540,
          width: 160,
          height: 160,
        },
      },
      {
        sets: ["A", "D"],
        size: 300,
        // label: "AD",
        desc: "PASSION",
        items: generateItemsForGroup(["A", "D"]),
        type: "intersection",
        itemsParams: {
          x: -140,
          y: 230,
          width: 160,
          height: 160,
        },
      },
      {
        // label: "ABC",
        sets: ["A", "B", "C"],
        size: 300,
        desc: "ABC",
        items: generateItemsForGroup(["A", "B", "C"]),
        type: "intersection",
        itemsParams: {
          x: 30,
          y: 430,
          width: 50,
          height: 70,
        },
      },
      {
        // label: "ABD",
        sets: ["A", "B", "D"],
        size: 300,
        desc: "ABD",
        items: generateItemsForGroup(["A", "B", "D"]),
        type: "intersection",
        itemsParams: {
          x: -25,
          y: 310,
          width: 50,
          height: 70,
        },
      },
      {
        // label: "ACD",
        sets: ["A", "C", "D"],
        size: 300,
        desc: "ACD",
        items: generateItemsForGroup(["A", "C", "D"]),
        type: "intersection",
        itemsParams: {
          x: -80,
          y: 430,
          width: 50,
          height: 70,
        },
      },
      {
        // label: "BCD",
        sets: ["B", "C", "D"],
        size: 300,
        desc: "BCD",
        items: generateItemsForGroup(["B", "C", "D"]),
        type: "intersection",
        itemsParams: {
          x: -25,
          y: 550,
          width: 50,
          height: 70,
        },
      },
    ]);

  const [sets, setSets] = useState(defaultSets());

  const draw = () => {
    // draw venn diagram
    document.getElementById("ikigai").innerHTML = "";
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
      .style("font-size", "0.85rem")
      .style("fill", "rgba(128, 128, 0, 1)");
    d3.selectAll("#ikigai .venn-intersection")
      .style("cursor", "pointer")
      .select("text")
      .style("font-size", "1.4rem")
      .style("fill", "rgba(255, 255, 255, 1)");

    // add a tooltip
    let tooltip = d3
      .select("#chart-ikigai")
      .append("div")
      .attr("class", `ikigai-tooltip ${itemsForEdit ? "hidden" : ""}`)
      .attr("id", "ikigai-tooltip");

    // add listeners to all the groups to display tooltip on mouseover
    div
      .selectAll("g")
      .on("click", function (d, i) {
        d3.select(this)
          .node()
          .parentElement.querySelectorAll(".active")
          .forEach((el) => el.classList.remove("active"));
        d3.select(this).node().classList.add("active");

        setItemsForEdit({
          sets: d.sets,
          items: d.items,
          posX: d3.mouse(this)[0] + 30,
          posY: d3.mouse(this)[1] - 30,
        });
      })
      .on("mouseover", function (d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", 1);
        tooltip.text(d.desc || null);

        // highlight the current path
        let selection = d3.select(this).transition("tooltip").duration(400);
        // console.log(d3.select(this).node().childNodes[0]);
        // d3.select(this).node().childNodes[0].style = "stroke-width: 3";
        selection
          .select("path")
          // .style("stroke-width", 3)
          .style("fill", "rgba(128, 128, 0, 0")
          .style("fill-opacity", 1);
        //   // .style("fill-opacity", d.sets.length == 1 ? 0.4 : 0.1)
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
      });

    // .on("click", function (d, i) {
    //   setGroupForEdit(d);
    // });

    const circles = d3.selectAll("#ikigai .venn-circle");
    const intersections = d3.selectAll("#ikigai .venn-intersection");

    circles.each(insertItems);
    intersections.each(insertItems);
  };

  const insertItems = function (d, i) {
    // if (d.label === "gucci") {
    const path = d3.select(this);
    // const text = path.node().childNodes[1]
    // console.log(path.node().childNodes[1]);

    let items = "";
    let labelText = path.node().childNodes[1].childNodes[0];

    const pathDimensions = path.node().getBoundingClientRect();
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
          }90deg); transform-origin: center; fill: rgb(128, 128, 0); font-size: 0.85rem`
        );
    }
    if (d.type === "circle") {
      // labelText.setAttribute("x", 0);
      // labelText.setAttribute("y", 0);
      // labelText.childNodes[0].setAttribute("x", 0);
      // console.log(labelText.childNodes[0].setAttribute("x", 0));
    }
    // const pathDimensions = path.node().getBoundingClientRect();

    if (d.items) {
      d.items.forEach((item) => {
        items += `<div class="item">${item}</div>`;
      });
    }

    // console.log(path.node());

    path
      .append("foreignObject")
      .attr("x", pathDimensions.x + pathDimensions.width / 2 + d.itemsParams.x)
      .attr("y", d.itemsParams.y)
      .attr(
        "style",
        `width: ${d.itemsParams.width}px; height: ${d.itemsParams.height}px;`
      )
      // .attr("class", "items-wrapper")
      // .append("xhtml:div")
      .append("xhtml:div")
      .attr("class", "items")
      // .attr("class", "inner-wrapper")
      // .style("color", "#fff")
      .html(items);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // resetSets();
    draw();
    // delete tooltip
    // return () => document.getElementById("ikigai-tooltip").remove();
  }, []);

  useEffect(() => draw(), [sets]);

  const resetSets = () => {
    setSets(removeDuplicates(defaultSets()));
  };

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
      <div
        id="chart-ikigai"
        className={`outer-wrapper${!zoomMode ? " viewMode" : ""} ${
          itemsForEdit ? "hide-tooltip" : ""
        }`}
      >
        {/* <div className="controls">
          <span
            onClick={() => {
              if (!zoomMode) {
                setZoomValue(defaultZoomValue);
              }
              setZoomMode(!zoomMode);
            }}
          >
            Change mode
          </span>
          <br />
          <span>Mode: {zoomMode ? "Zoom" : "Description"}</span>
        </div> */}
        {/* {!zoomMode && <div className="mask"></div>} */}
        <MapInteractionCSS
          // value={!zoomMode ? defaultZoomValue : zoomValue}
          showControls
          maxScale={5}
          minScale={1}
          // onChange={(value) => {
          //   setZoomMode(value);
          //   // setZoomValue(zoomMode ? value : defaultZoomValue);
          // }}
        >
          {/* {zoomMode && <div className="mask"></div>} */}
          <div
            className="chart-wrapper"
            id="ikigai"
            style={{ textAlign: "center" }}
          ></div>
        </MapInteractionCSS>
      </div>
      {itemsForEdit && (
        <ItemsEdit
          items={itemsForEdit.items}
          posX={itemsForEdit.posX}
          posY={itemsForEdit.posY}
          sets={itemsForEdit.sets}
          saveFn={() => {
            resetSets();
            setItemsForEdit(null);
          }}
          onClose={() => {
            document
              .querySelectorAll(".venn-area")
              .forEach((e) => e.classList.remove("active"));
            setItemsForEdit(null);
          }}
        />
      )}

      {/* <ItemsModal
        closeFn={() => setGroupForEdit({ items: [], sets: [] })}
        hidden={groupForEdit.sets.length === 0}
        group={groupForEdit}
        updateItems={updateItems}
      /> */}
    </>
  );
};

export default IkigaiChart;
