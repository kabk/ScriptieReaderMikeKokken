var h = window.innerHeight;
var w = window.innerWidth;
var output = "";

function randomFrames()
{	
	var a = []; // array to store the width of each element
	var maxW = 512;
	var maxH = 512;

	$(".draagbaar").each(function () 
    {
        a.push($(this)); 
    });

	for (var i = 1; i < a.length + 1; i++)
	{	
		console.log(i);
		$("#frame" + i).css({
			"top": getRandomRange(60, h - 400) + "px", 
			"left": getRandomRange(0, w - 400) + "px",
			//"background-color": "rgb(" + getRandomRange(0, 255) + "," + getRandomRange(0, 255) + "," + getRandomRange(0, 255) + ")"
			
		});
	}
}

function getRandomRange(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectFrame(element, stack)
{
	var a = [];

	$(stack).each(function ()
	{
		a.push($(this).css("z-index"))
	});

	console.log(a[0], a[1], a[2]);

	var maxZ = Array.max(a);
	console.log(maxZ);

	$(element).css({"z-index": maxZ + 1})

};

Array.max = function( array )
{
    return Math.max.apply( Math, array );
}