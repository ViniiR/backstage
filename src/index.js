"use strict";

const anchors = document.querySelectorAll('main a');

const sections = {
    section: document.querySelectorAll(".book"),
    colors: [
        "#ff608c",
        "#ffffff",
        "#00c1b5",
        "#ff6519",
        "#ffbe00",
        "#1d3fbb",
        "#E30512",
    ],
};

const setAnchorColors = (anchors) => {
    const color = document.body.style.backgroundColor === 'rgb(255, 255, 255)' ? "#ff608c" : "#ffffff";
    anchors.forEach(anchor => {
        anchor.style.color = color;
    });
}

const getClosestSection = (line, sections) => {
    let closestValue = sections[0];
    let minDifference = Math.abs(sections[0] - line);
    for (let i = 0; i < sections.length; i++) {
        let difference = Math.abs(sections[i] - line);
        if (difference < minDifference) {
            minDifference = difference;
            closestValue = sections[i];
        }
    }
    return closestValue;
};

const setBackgroundColor = (sectionPositions, colors, currentSection) => {
    let currentSectionPosition = currentSection;
    for (let i = 0; i < sectionPositions.length; i++) {
        if (currentSection == sectionPositions[i])
        currentSectionPosition = i
    }
    return colors[currentSectionPosition];
};

window.addEventListener("scroll", function () {
    const positions = [];
    const line = this.document.querySelector("#line");
    const linePosition = line.getBoundingClientRect().top;
    for (const section of sections.section) {
        positions.push(section.getBoundingClientRect().top);
    }
    const closestSection = getClosestSection(linePosition, positions);
    document.body.style.backgroundColor = setBackgroundColor(positions, sections.colors, closestSection)
    setAnchorColors(anchors);
});
