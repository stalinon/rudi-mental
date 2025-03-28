export function renderSvg(exercise) {
    const myGrooveUtils = new window.GrooveUtils();
    const grooveData = myGrooveUtils.getGrooveDataFromUrlString(exercise);
    const abcNotation = myGrooveUtils.createABCFromGrooveData(grooveData, 300);
    const svgReturn = myGrooveUtils.renderABCtoSVG(abcNotation);

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgReturn.svg, "text/html");
    const svgElements = doc.querySelectorAll("svg");

    const svgs = Array.from(svgElements).map(svgEl => {
        // Удаляем размеры тактов
        const groups = svgEl.querySelectorAll('g[style*="font:bold 16px serif"]');
        groups.forEach(g => g.remove());

        // Удаляем размер svg
        svgEl.removeAttribute("width");
        svgEl.removeAttribute("height");

        const svgString = new XMLSerializer().serializeToString(svgEl);
        return svgString;
    });

    return svgs;
}