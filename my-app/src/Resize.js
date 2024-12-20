
window.addEventListener('resize', function() 
{
    imgResize("backGround", "totalFrame")
});

window.onload = function() {
    console.log('Load Page Finished.')
    setTimeout(() => {
        imgResize("backGround", "totalFrame")
    }, 5);
};

export function imgResize(mainFrameId, insideElementID)
{
    var mainframe = document.getElementById(mainFrameId)
    mainframe.style.height = window.innerHeight + "px"
    mainframe.style.width = window.innerWidth + "px"
    var mainframe_width  = mainframe.offsetWidth
    var mainframe_height = mainframe.offsetHeight
    mainframe_width = mainframe_width
    
    var insideElement = document.getElementById(insideElementID)
    var insideElement_width  = insideElement.offsetWidth
    var insideElement_height = insideElement.offsetHeight

    var insideElement_scale = insideElement_width/insideElement_height
    var mainframe_scale = mainframe_width/mainframe_height

    var myScale = 0
    if(mainframe_scale > insideElement_scale)
        myScale = mainframe_height/insideElement_height
    else
        myScale = mainframe_width/insideElement_width
    
    
    // insideElement.style.scale = myScale
    var insideElement_topOffset
    var insideElement_leftOffset
    insideElement_height = insideElement_height * myScale
    insideElement_width = insideElement_width * myScale
    if(insideElement_height < mainframe_height)
    {
        insideElement_topOffset = (mainframe_height/2) - (insideElement_height/2)
    }
    else
    {
        insideElement_topOffset = 0
    }


    if(insideElement_width < mainframe_width)
    {
        insideElement_leftOffset = (mainframe_width/2) - (insideElement_width/2)
    }
    else
    {
        insideElement_leftOffset = 0
    }
    insideElement.style.scale = myScale
    insideElement.style.top   = insideElement_topOffset+"px"
    insideElement.style.left  = insideElement_leftOffset+"px"
}

