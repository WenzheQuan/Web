var mydata = ["hey there ","more stufff", "even more","..."]; 


d3.json("project.json").then(function(dataJson){
	    console.log(dataJson);
 	    mydata = dataJson.data;
 	    console.log(mydata);
    
    
	const data = mydata;
        // Set styles related to rectangles and fonts
	const rect = {height: 20, marginV: 10, marginH: 10, marginT: 40};
	const font = {height: 20, margin: 200};
	const svg = d3.select("svg").append("g");
	const scale = d3.scaleLinear().domain([0, 12]).range([0, 480]);
       // From https://zhuanlan.zhihu.com/p/47544097. I change svg size.I reset the scale ratio. 
        // Take out one element at a time, sort entities according to the numerical value
	let index = 0;
	let dataEntry = data[index];
	let dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);

        // The maximum length, which is the bottom y value of the last rectangle
	const maxHeight = (rect.marginV + rect.height) * (dataValue.length-1) + rect.marginT
        // Month in the bottom right corner
	let comment = svg.append("text").attr("x", 600).attr("y", maxHeight)
					.attr("fill", "grey").text(dataEntry.month).style("font-size", "20");
	//Bind data
	const groups = svg
				.selectAll("g")
				.data(dataValue).enter()
				.append("g")
				;
	let labels =  groups.append("text").text( d=>d.Course)
							.attr("x", rect.marginH)
							.style("font-size", `${font.height}px`)
							;
	let rects = groups.append("rect")
							.attr("x", rect.marginH + font.margin)
							.attr("height", rect.height)
							.attr("fill", d => d.Course == "Web" ? "red" : "grey");


svg.append("g").attr("transform", `translate(${rect.marginH*21}, ${maxHeight + rect.height + rect.marginV})`).call(d3.axisBottom(scale));
	function updateElements(){
		labels.data(dataValue, d=>d.Course).transition().duration(600)
			.attr("y", (_, i) => (rect.marginV + rect.height) * i + rect.marginT + rect.height / 2);
		rects.data(dataValue, d=>d.Course).transition().duration(600)
			.attr("y", (_, i) => (rect.marginV + rect.height) * i + rect.marginT )
			.attr("width", d => scale(d.value))
	}
	updateElements()
	function update(i){
		dataEntry = data[i];
		dataValue = dataEntry["entities"].sort((x, y) => y.value - x.value);
	    comment.text(dataEntry.month);
	    updateElements()
	}
	setInterval(()=> update((++index) % data.length), 700);
    //I reset the position of each section in this svg. I put this svg in the middle of the page. 
})



